import { Router } from "express";
import * as flashController from "./flashcard.controller";

const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     FlashCard:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: string
 *           description: ID do flashcard
 *         question:
 *           type: string
 *           description: Pergunta do flashcard
 *         answer:
 *           type: string
 *           description: Resposta do flashcard
 *       example:
 *         id: "64f0c123abc"
 *         question: "O que é Node.js?"
 *         answer: "Um runtime JavaScript baseado no V8"
 */

/**
 * @swagger
 * /flashcards:
 *   get:
 *     summary: Lista todos os flashcards
 *     tags: [Flashcards]
 *     responses:
 *       200:
 *         description: Lista de flashcards
 */
router.get("/", flashController.findAll);

/**
 * @swagger
 * /flashcards:
 *   post:
 *     summary: Cria um novo flashcard
 *     tags: [Flashcards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlashCard'
 *     responses:
 *       201:
 *         description: Flashcard criado
 */
router.post("/", flashController.createFlashCard);

/**
 * @swagger
 * /flashcards/{id}:
 *   get:
 *     summary: Busca um flashcard pelo ID
 *     tags: [FlashCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do flashcard
 *     responses:
 *       200:
 *         description: Flashcard encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlashCard'
 *       404:
 *         description: Flashcard não encontrado
 */
router.get("/:id", flashController.findById);

/**
 * @swagger
 * /flashcards/{id}:
 *   put:
 *     summary: Atualiza um flashcard
 *     tags: [FlashCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do flashcard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FlashCard'
 *     responses:
 *       200:
 *         description: Flashcard atualizado
 *       404:
 *         description: Flashcard não encontrado
 */
router.put("/:id", flashController.update);

/**
 * @swagger
 * /flashcards/{id}:
 *   delete:
 *     summary: Remove um flashcard
 *     tags: [FlashCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do flashcard
 *     responses:
 *       200:
 *         description: Flashcard removido
 *       404:
 *         description: Flashcard não encontrado
 */
router.delete("/:id", flashController.deleteById);

export default router;
