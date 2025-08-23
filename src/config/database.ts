import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Banco conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar no banco: ", error);
    process.exit(1);
  }
};
