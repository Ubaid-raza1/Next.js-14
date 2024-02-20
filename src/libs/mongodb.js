import mongoose from "mongoose";

const mongodb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/crud");
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

export default mongodb;
