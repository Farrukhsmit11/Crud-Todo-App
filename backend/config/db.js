import mongoose from "mongoose";

const mongoDBUri = process.env.MONGO_DB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUri)
        console.log("MongoDb Connected")
    } catch (error) {
        console.error("MongoDb connection failed", error)
    }
}

export default connectDB