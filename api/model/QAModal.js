import mongoose from "mongoose";

const Schema = mongoose.Schema

const qaSchema = new Schema({
    question : {type: String, required:true},
    answer : {
        type:[String],
        required:true
    }
})

export default mongoose.model('QA',qaSchema)