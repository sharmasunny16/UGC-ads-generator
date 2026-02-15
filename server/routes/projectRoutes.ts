import express from 'express';
import { createProject, createVideo, deleteProject, getAllPublishedProjects } from '../controllers/projectController.js';
import { protech } from '../middlewares/auth.js';
import upload from '../configs/multer.js';

const projectRouter = express.Router()

projectRouter.post('/create',protech,upload.array('images',2),createProject)
projectRouter.post('/video',protech,createVideo)
projectRouter.get('/published',getAllPublishedProjects)
projectRouter.delete('/:projectId',protech,deleteProject)

export default projectRouter