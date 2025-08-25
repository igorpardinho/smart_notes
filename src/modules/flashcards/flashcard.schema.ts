import z from "zod";

export const createFlashCardSchema = z.object({
  question: z.string().min(3, "pergunta muito curta"),
  answer: z.string().min(1, "resposta não pode ser vazia"),
  tags: z.array(z.string()).optional(),
});

export const generateSchema = z.object({
  content: z.string().min(20, "no minimo 20 caracteres"),
});
export type CreateFlashCardDto = z.infer<typeof createFlashCardSchema>;
