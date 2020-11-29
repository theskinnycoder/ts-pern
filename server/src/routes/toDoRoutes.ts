import { Router } from 'express';
import {
  createToDo,
  deleteToDo,
  getToDo,
  getToDos,
  updateToDo
} from '../controllers/toDoControllers';

const router = Router();

router.route('/').get(getToDos).post(createToDo);

router.route('/:id/').get(getToDo).patch(updateToDo).delete(deleteToDo);

export default router;
