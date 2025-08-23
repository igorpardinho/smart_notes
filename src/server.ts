import dotenv from "dotenv";
dotenv.config(); 

import app from "./app";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  await connectDB();
});