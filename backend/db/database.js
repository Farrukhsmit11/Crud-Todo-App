import mongoose from "mongoose"
const mongodbUri = "mongodb+srv://farrukh-admin123:e47Lu5E5IL37Ripe@clusterone.khrcakp.mongodb.net/?appName=ClusterOne"

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUri)
        console.log("Mongodb connected sucessfully")
    } catch (error) {
        console.error("mongoDb connection failed", error)
    }
}

connectDB();