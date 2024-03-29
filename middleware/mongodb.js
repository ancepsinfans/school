import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        authSource: 'admin',
        ssl: true,
        dbName: 'school'
    })
    return handler(req, res)
}

export default connectDB
