import ErrorHandler from "../middleware/error.js"
import { Task } from "../models/task.js"

export const newTask = async(req,res,next)=>{
    const {title,description} = req.body

    await Task.create({
        title,
        description,
        user:req.user
    })

    res
        .status(201)
        .json({
            success:true,
            message:"task created"
        })
}

export const myTasks = async(req,res,next)=>{
    const user_id = req.user._id
    const tasks = await Task.find({user:user_id})
    res.status(201).json({
        success:true,
        tasks
    })
}

export const updateTask = async(req,res,next)=>{
    
    const {id} = req.params
    const task = await Task.findById(id)

    if(!task)return next(new ErrorHandler())

    task.isCompleted = !task.isCompleted
    await task.save()

    res.status(201).json({
        success:true,
        message:"task updated"
    })
}

export const deleteTask = async(req,res,next)=>{

    try {
        const {id} = req.params
        const task = await Task.findById(id)

        if(!task)return next(new ErrorHandler("task not found",404))

        await task.deleteOne()
  
        res.status(201).json({
            success:true,
            message:"deleted"
        })
        
    } catch (error) {
        next(error)
    }
    
}