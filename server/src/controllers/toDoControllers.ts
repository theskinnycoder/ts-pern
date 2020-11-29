import asyncHandler from 'express-async-handler';

import { Request, Response } from 'express';
import ToDo from '../entities/ToDo';

// POST    /api/toDos/
export const createToDo = asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;
  const createdToDo = await ToDo.create({ text }).save();
  return res.status(201).json({
    success: true,
    message: 'ToDo Created!',
    data: createdToDo
  });
});

// GET    /api/toDos/
export const getToDos = asyncHandler(async (_req: Request, res: Response) => {
  const allToDos = await ToDo.find();
  res.status(200).json({
    success: true,
    data: allToDos
  });
});

// GET    /api/toDos/:id/
export const getToDo = asyncHandler(async (req: Request, res: Response) => {
  const requiredToDo = await ToDo.findOne(req.params.id);
  if (requiredToDo) {
    res.status(200).json({
      success: true,
      data: requiredToDo
    });
  } else {
    res.status(404);
    throw new Error('ToDo not found!');
  }
});

// PATCH    /api/toDos/:id/
export const updateToDo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const toDo = await ToDo.findOne(id);
  if (toDo) {
    toDo.isCompleted = !toDo.isCompleted;
    await toDo.save();
    return res.status(200).json({
      success: true,
      message: 'ToDo Updated!',
      data: id
    });
  } else {
    res.status(404);
    throw new Error('ToDo not found!');
  }
});

// DELETE    /api/toDos/:id/
export const deleteToDo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const requiredToDo = await ToDo.findOne(id);
  if (requiredToDo) {
    await requiredToDo.remove();
    return res.status(200).json({
      success: true,
      msg: 'ToDo Deleted!',
      data: id
    });
  } else {
    res.status(404);
    throw new Error('ToDo not found!');
  }
});
