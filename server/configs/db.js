import mongoose from "mongoose";


const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    
    mongoose.connection.on('connected', () => 
      console.log("Database Connected")
    );

    
    mongoose.connect("mongodb://127.0.0.1:27017/ecomm");

  } catch (error) {
    console.error("DB ERROR:", error.message);
  }
};

export default connectDB;
