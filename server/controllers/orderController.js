import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from 'stripe'
import User from "../models/User.js";
import cors from "cors";

//place order COD :/api/order/cod
export const placeOrderCOD = async (req,res)=>{
    try{
         const userId = req.userId;   
        const { items, address } = req.body;
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
        //calculate Amount using items
        let  amount = await items.reduce(async (acc,item)=>{
            const product = await Product.findById(item.product);
            return (await acc)+product.offerPrice * item.quantity;

        },0)

        // Add tax (2%)
        amount+= Math.floor(amount*0.02);

        await Order.create({userId,items,amount,address,paymentType:"COD",});
        return res.json({success: true, message: "order placed successfully"})

    }
    catch(error){
return res.json({success: false, message: error.message})
    }
}

//place order stripe :/api/order/stripe

export const placeOrderStripe = async (req,res)=>{
    try{
       const userId = req.userId;   
        const { items, address } = req.body;
//const {origin} = req.headers;
const origin = "http://localhost:5173";

        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
let product_data =[];

        //calculate Amount using items
        let  amount = await items.reduce(async (acc,item)=>{
            const product = await Product.findById(item.product);
            product_data.push({
                name:product.name,
                price:product.offerPrice,
                quantity:item.quantity,
            });
            return (await acc)+product.offerPrice * item.quantity;

        },0)

        // Add tax (2%)
        amount+= Math.floor(amount*0.02);

    const order =    await Order.create({userId,items,amount,address,paymentType:"Online",});


const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

const line_items = product_data.map((item) => ({
  price_data: {
    currency: "eur",
    product_data: {   
      name: item.name,
    },
            unit_amount:Math.floor(item.price + item.price* 0.02) * 100
        },quantity: item.quantity,
    }
))

//create session
const session = await stripeInstance.checkout.sessions.create({line_items,mode: "payment" ,
    //success_url: `${origin}/loader?next=my-orders` , 
    success_url: `${origin}/loader?session_id={CHECKOUT_SESSION_ID}&next=my-orders`,
    cancel_url:`${origin}/cart`,
metadata: {
    orderId: order._id.toString(),
    userId,
}})
/*const session = await stripeInstance.checkout.sessions.create({
  line_items,
  mode: "payment",
  success_url: `${origin}/loader?session_id={CHECKOUT_SESSION_ID}&next=my-orders`,
  cancel_url: `${origin}/cart`,
  metadata: {
    orderId: order._id.toString(),
    userId,
  },
});
*/




        return res.json({success: true, url: session.url})

    }
    catch(error){
return res.json({success: false, message: error.message})
    }
}

//stripe webhook to verify payment Action:/stripe
/*export const stripeWebhooks = async (request,response)=>{

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try{
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
            //process.env.STRIPE_SECRET_KEY
        );
    }catch(error){
       return response.status(400).send(`Webhook Error: ${error.message}`)
    }

//handle  the event 
switch(event.type){           */
    /*
        case "checkout.session.completed":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

           //getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
payment_intent: paymentIntentId,
            });
            const {orderId,userId} = session.data[0].metadata;
            //mark payment as paid
          const updated =  await Order.findByIdAndUpdate(orderId,{isPaid: true}, { new: true })
          console.log(updated);
            //clear  user cart
            await User.findByIdAndUpdate(userId,{cartItems: {}})
            
            break;
        }
*/
/*
case "checkout.session.completed": {
  const session = event.data.object;

  const { orderId, userId } = session.metadata;

  //  mark payment as paid
  await Order.findByIdAndUpdate(orderId, { isPaid: true });

  //  clear cart
  await User.findByIdAndUpdate(userId, { cartItems: {} });

  break;
}

        case  "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session metadata
            const session = await stripeInstance.checkout.sessions.list({
payment_intent: paymentIntentId,
            });
            const {orderId} = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
        default:
            console.error(`Unhandled event type ${event.type}`)
            break;

    }
    response.json({received: true});

}
*/


const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const verifyPaymentAndClearCart = async (req, res) => {
  try {
    const { session_id } = req.query;

    const session = await stripeInstance.checkout.sessions.retrieve(session_id);

    // ✅ DEBUG (keep this for now)
    console.log("STATUS:", session.status);
    console.log("PAYMENT STATUS:", session.payment_status);

    // ✅ FIX HERE
    if (session.status !== "complete") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    const { orderId, userId } = session.metadata;

    // ✅ mark order paid
    await Order.findByIdAndUpdate(orderId, { isPaid: true });

    // ✅ clear cart
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    res.json({ success: true, message: "Payment verified, cart cleared" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



//Get Order by user Id: api/order/user
export const getUserOrders = async(req,res)=>{
try{

const userId = req.userId;
const orders = await Order.find({
    userId,
    $or:[{paymentType: "COD"},{isPaid: true}]
}).populate("items.product address").sort({createdAt: -1});
res.json({success: true, orders})

}catch(error){

res.json({success: false, message: error.message})
    }
}

// get all Orders(for seller/Admin): /api/order/seller
export const getAllOrders = async(req,res)=>{
try{


const orders = await Order.find({
  $or: [{ paymentType: "COD" }, { isPaid: true }]
})
.populate("items.product")
.sort({ createdAt: -1 });
res.json({success: true, orders})

}catch(error){

res.json({success: false, message: error.message})
    }}