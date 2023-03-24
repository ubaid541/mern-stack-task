import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()
import routes from "./routes/index.js"
import { QAFormController } from './controller/QAFormController.js'


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

// middlwares
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/",routes)

// error handling middlware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong."
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack : err.stack
    })
})


const PORT = process.env.PORT || 9000

app.listen(PORT,()=>{
    connect()
    console.log(`Server connected to port ${PORT}`);
})