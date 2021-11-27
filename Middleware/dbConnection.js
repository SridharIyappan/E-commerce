import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
          useNewUrlParser: true,
        //   useCreateIndex: true,
        //   useFindAndModify: false,
          useUnifiedTopology: true,
        });
        console.log('DB connected');
    } catch (err) {
        console.error(err.message);
    }
}