import OpenAI from "openai";
import { FlashCard, IFlashCard } from "./flashcard.model";
import { CreateFlashCardDto } from "./flashcard.schema";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const findAll = async (): Promise<IFlashCard[]> => {
  return await FlashCard.find().sort({ createdAt: -1 });
};

export const generateWithAI = async (content: string): Promise<IFlashCard> => {
  const prompt = `
    Gere um flashcard a partir do seguinte conteúdo.
Retorne no formato JSON:
{ "question": "...", "answer": "..." }

Conteúdo:
"""${content}"""
    `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = response.choices[0].message?.content;

  let aiData: Partial<CreateFlashCardDto> = { question: "", answer: "" };

  try {
    const match = text?.match(/\{[\s\S]*\}/);
    if (match) {
      aiData = JSON.parse(match[0]);
    } else {
      console.warn("Resposta da IA não contém JSON:", text);
    }
  } catch (err) {
    console.warn("Erro ao parsear JSON da IA:", err, text);
  }

  if (!aiData.question || !aiData.answer) {
    throw new Error("IA não retornou flashcard válido");
  }

  return await FlashCard.create(aiData);
};

export const createFlashCard = async (
  data: CreateFlashCardDto
): Promise<IFlashCard> => {
  const flashCard = new FlashCard(data);
  return await flashCard.save();
};

export const findById = async (id: string): Promise<IFlashCard | null> => {
  const flashCard = await FlashCard.findById(id);
  if (!flashCard) {
    throw new Error("Esse flashCard não existe");
  }
  return flashCard;
};

export const update = async (
  id: string,
  data: Partial<CreateFlashCardDto>
): Promise<IFlashCard | null> => {
  await findById(id);
  const updatedFlashCard = await FlashCard.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedFlashCard) {
    throw new Error("Erro ao atualizar flashcard");
  }
  return updatedFlashCard;
};

export const deleteById = async (id: string): Promise<void> => {
  await findById(id);
  await FlashCard.findByIdAndDelete(id);
};
