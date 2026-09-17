import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, downloadUserResume, deleteUserResume } from "../controllers/user.controller.js"


const userRouter = express.Router()

userRouter.get("/current-user",isAuth,getCurrentUser)
userRouter.get("/resume",isAuth,downloadUserResume)
userRouter.delete("/resume",isAuth,deleteUserResume)

export default userRouter