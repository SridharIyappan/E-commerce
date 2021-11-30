import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test", {
          useNewUrlParser: true,
          //   useCreateIndex: true,
          //   useFindAndModify: false,
          useUnifiedTopology: true,
        });
        console.log('DB connected');
    } catch (err) {
        console.error(err.message);
        console.log(process.env.LOCAL_DB)
    }
}