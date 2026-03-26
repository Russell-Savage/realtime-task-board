import { Router } from 'express';
import { getBoards, createBoard, deleteBoard, updateBoard } from '../controllers/boardController';

const router = Router();

router.get('/', getBoards);
router.post('/', createBoard);
router.delete('/:boardId', deleteBoard);
router.patch('/:boardId', updateBoard);


module.exports = router;
export default router;
