import { Document, model, Schema } from "mongoose";

export interface IFlashCard extends Document {
  question: string;
  answer: string;
  createdAt: Date;
}

const flashCardSchema = new Schema<IFlashCard>({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const FlashCard = model<IFlashCard>("FlashCard", flashCardSchema);
