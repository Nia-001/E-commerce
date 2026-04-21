import User from "../models/User.js"

//update user cartData : /api/cart/update

// import User from "../models/User"

export const updateCart = async (req,res)=>{
    try{
const userId = req.userId;

const { cartItems } = req.body;
await User.findByIdAndUpdate(userId,{cartItems})
res.json({
    success: true, message: "cart updated"
})

    }catch(error){
console.log(error.message)
res.json({success: false, message: error.message})
    }
}



export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    await User.findByIdAndUpdate(userId, { cartItems: {} });

    res.json({
      success: true,
      message: "Cart cleared",
    });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
