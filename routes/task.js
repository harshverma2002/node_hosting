import express from "express"
import { deleteTask, myTasks, newTask, updateTask } from "../controllers/task.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/new",isAuthenticated,newTask)
router.get("/mytasks",isAuthenticated,myTasks)
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router   