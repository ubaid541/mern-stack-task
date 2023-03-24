import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()
import routes from "./routes/index.js"


// database connection
const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Database connected.");
    } catch (error) {
        console.log(error.message);
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("Database disconnected.");
})


const app = express()

app.use("/",routes)


app.listen(9000,()=>{
    connect()
    console.log("Server connected to port 9000");
})