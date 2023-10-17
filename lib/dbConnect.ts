import mongoose from "mongoose";

const connectMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.log("Error connecting to Database", error);
  }
};

export default connectMongoDB;
