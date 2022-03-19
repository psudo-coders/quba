import mongoose from "mongoose";

export type QuestionDocument = mongoose.Document & {
    subject: mongoose.Schema.Types.ObjectId;
    topic: mongoose.Schema.Types.ObjectId;
    statement: { problem: string; diagram: [string] };
    options: { id: number; choice: string; diagram: string };
    correctAnswer: number;
    solution: { text: string; diagram: [string] };
    status: string;
};

const QuestionSchema = new mongoose.Schema<QuestionDocument>({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
    },
    statement: {
        problem: { type: String, required: true },
        diagram: [String],
    },
    options: {
        id: { type: Number, required: true },
        choice: String,
        diagram: String,
    },
    correctAnswer: { type: Number, required: true },
    solution: {
        text: String,
        diagram: [String],
    },
    status: { type: String, required: true },
});

export const Question = mongoose.model<QuestionDocument>(
    "question",
    QuestionSchema
);
