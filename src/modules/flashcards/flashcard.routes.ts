import { Router } from "express";
import * as flashController from "./flashcard.controller";

const router = Router();

router.get("/", flashController.findAll);
router.post("/", flashController.createFlashCard);
router.get("/:id", flashController.findById);
router.put("/:id", flashController.update);
router.delete("/:id", flashController.deleteById);

export default router;
