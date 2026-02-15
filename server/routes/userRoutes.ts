import  express  from "express";
import { getAllProjects, getProjectById, getUserCredits, toggleProjectPublic } from "../controllers/userController.js";
import { protech } from "../middlewares/auth.js";


const userRouter = express.Router();

userRouter.get('/credits',protech, getUserCredits)
userRouter.get('/projects',protech, getAllProjects)
userRouter.get('/projects/:projectId',protech, getProjectById)
userRouter.get('/publish/:projectId',protech, toggleProjectPublic)

export default userRouter