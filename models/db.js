import mongoose from "mongoose";
import dotenv from 'dotenv';
const URI = process.env.MONGO_URI;
dotenv.config();
const dbConnection = ()=>{


    mongoose.connect("mongodb+srv://singhdhas9559604443a:Computer@cluster0.zbxhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log('Db connected....');
    })
    .catch((err)=>{
        console.log('Db not connected....',err);
    })  
}

export default dbConnection;