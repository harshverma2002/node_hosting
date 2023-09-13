import mongoose from "mongoose"

const schema =new mongoose.Schema({
    title:{
        type:"String",
        required:true
    },
    description:{
        type:"String",
        unique:true,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // this is same as model of mongodb in user.js
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const Task = mongoose.model("Task",schema)