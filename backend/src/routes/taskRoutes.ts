import { Router } from 'express';
import { 
  getTasksByBoard, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController';

const router = Router();

router.get('/board/:boardId', getTasksByBoard);
router.post('/', createTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;
module.exports = router;