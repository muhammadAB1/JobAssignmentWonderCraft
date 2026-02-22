import express from 'express'
import { createTask, deleteTask, getTask, updateTaskPriority, updateTaskStatus } from './task.controller';


const router = express.Router();

router.get('/:status', getTask)
router.post('/', createTask)
router.patch('/status/:id/:status', updateTaskStatus)
router.patch('/priority/:id/:priority', updateTaskPriority)
router.delete('/:id', deleteTask)

export default router;