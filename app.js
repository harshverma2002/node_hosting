import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv" 
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middleware/error.js"
import cors from "cors"

export const app = express()

config({
    path:"./data/config.env"
})

app.use(express.json())//middleware to access form data
app.use(cookieParser())

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use("/api/v1/user",userRouter)// using routes
app.use("/api/v1/task",taskRouter)

app.get("/",(req,res)=>{
    res.send('homeeieee')
})

//error handler middleware
app.use(errorMiddleware)

