import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL;

connectdb().then(() => {
    console.log('DB connect..');
}).catch((err) => {
    console.log('error in connectdb..', err);
});

async function connectdb() {

    await mongoose.connect(DB_URL);

}

export default connectdb;