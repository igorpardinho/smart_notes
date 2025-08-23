import { FlashCard, IFlashCard } from "./flashcard.model";
import { CreateFlashCardDto } from "./flashcard.schema";

export const findAll = async (): Promise<IFlashCard[]> => {
  return await FlashCard.find().sort({ createdAt: -1 });
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
