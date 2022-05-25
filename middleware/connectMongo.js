import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI, { dbName: 'school' });

export default connectMongo;