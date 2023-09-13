import mongoose from "mongoose"

export const connectDB = () =>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName: "backend",
    })
    .then(()=> console.log("database connected"))
    .catch((e)=> console.log(e))
}

