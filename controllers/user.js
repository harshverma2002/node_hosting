import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendToken } from "../utils/feature.js"

export const registerUser = async(req,res)=>{
    const {name,email,password}  = req.body

    let user = await User.findOne({email})

    if(user){
        return res.status(404).json({
            success:false,
            message:"user already exists"
        })
    }
    
    const hashpassword = await bcrypt.hash(password,10)

    user = await User.create({name,email,password:hashpassword})

    sendToken(user,res,"register success",201)

}

export const loginUser = async(req,res,next)=>{

    const {email,password} = req.body

    let user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(404).json({
            success:false,
            message:"Invalid email"
        })
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(!passwordMatch){
        return res.status(404).json({
            success:false,
            message:"Invalid password"
        })
    }

    sendToken(user,res,`welcome back, ${user.name}`,200)
}

export const logoutUser = async(req,res) =>{
    res
    .status(200)
    .cookie("token","",{
        expires : new Date(Date.now()),
        sameSite: process.env.NODE_ENV==="Development"?"lax":'none',
        secure: process.env.NODE_ENV==="Development"?false:true
    })
    .json({
        success:true,  
        message:"logout success"
    })
}


export const userDetails = async(req,res)=>{

    res.status(200).json({
        success:true,  
        user:req.user,
    })
}
