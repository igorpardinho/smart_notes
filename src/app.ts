import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import flashCardRoutes from "./modules/flashcards/flashcard.routes";
import { setupSwagger } from "./config/swagger";
const app = express();

app.use(express.json());

app.use("/flashcards", flashCardRoutes);
setupSwagger(app);
app.use(errorHandler);
export default app;
