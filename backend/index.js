import { MONGODB_URI, PORT } from "./config.js";
import express, { response } from "express";
import mongoose from "mongoose";
import { Book } from "./models/book.model.js";
import booksRoute from './routes/book.route.js';
import cors from 'cors';

const app=express();
app.use(express.json())

//Middleware to resolve cors
app.use(cors())

//Middle ware to allow custom origin
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST','PUT','DELETE'],
//     allowedHeader:['Content-Type']
// }))

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome ');
})

app.use("/books",booksRoute)


mongoose
.connect(MONGODB_URI)
.then(()=>{
    console.log("connected to db");
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})
