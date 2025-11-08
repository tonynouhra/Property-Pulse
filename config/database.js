import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);// To suppress deprecation warning
    // if the database is already connected, don't connect again
    if (connected) {
        console.log('Database already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database:', error);
        return;
    }
}

export default connectDB;