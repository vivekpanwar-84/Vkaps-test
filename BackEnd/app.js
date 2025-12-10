import express from 'express';
import cors from 'cors';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js'
import connectdb from './config/mongodb.js';
const app = express();
const port = 3000;
connectdb();

app.use(cors());
app.use(express.json());

//api
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);


app.use('/', (req, res) => {
    res.send('server run');
});


app.listen(port, (req, res) => {
    console.log('server run...');
});
