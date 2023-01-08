import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connectDB = async(url) => {
    try {
      const conn = await mongoose.connect(url)
      console.log(`MongoDB Connected...`)
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1)
    }
}

export default connectDB;