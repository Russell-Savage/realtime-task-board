import { Router } from 'express';
import { getBoards, createBoard } from '../controllers/boardController';

const router = Router();

router.get('/', getBoards);
router.post('/', createBoard);

module.exports = router;
export default router;
