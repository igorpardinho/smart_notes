import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import flashCardRoutes from "./modules/flashcards/flashcard.routes"
const app = express();

app.use(express.json());

app.use("/flashcards",flashCardRoutes)
app.use(errorHandler);
export default app;
