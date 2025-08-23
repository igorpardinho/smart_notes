import { Request, Response } from "express";
import * as flashService from "./flashcard.service";
import { createFlashCardSchema } from "./flashcard.schema";

export const findAll = async (req: Request, res: Response) => {
  const flashCards = await flashService.findAll();
  return res.status(200).json(flashCards);
};

export const createFlashCard = async (req: Request, res: Response) => {
  const data = createFlashCardSchema.parse(req.body);

  const flashCard = await flashService.createFlashCard(data);
  return res.status(201).json(flashCard);
};

export const findById = async (req: Request, res: Response) => {
  const flashCard = await flashService.findById(req.params.id);
  return res.status(200).json(flashCard);
};

export const update = async (req: Request, res: Response) => {
  const data = createFlashCardSchema.parse(req.body);
  const flashCard = await flashService.update(req.params.id, data);
  return res.status(200).json(flashCard);
};

export const deleteById = async (req: Request, res: Response) => {
  await flashService.deleteById(req.params.id);
  return res.status(204).send();
};
