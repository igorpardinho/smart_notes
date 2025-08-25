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
 *     tags: [FlashCards]
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
 *     tags: [FlashCards]
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

/**
 * @swagger
 * /flashcards/generate:
 *   post:
 *     summary: Gera um flashcard a partir de um texto usando IA
 *     tags: [FlashCards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Texto do qual a IA vai gerar o flashcard
 *                 example: "Explique o que é Node.js e como funciona."
 *     responses:
 *       201:
 *         description: Flashcard gerado e salvo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlashCard'
 *       400:
 *         description: Texto inválido ou faltando
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/generate", flashController.generate);

export default router;
