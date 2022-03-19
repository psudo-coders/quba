import mongoose from "mongoose";

export type Markup = {
    text: string,
    images?: string[],
}

export type QuestionStatus = "freeze" | "pending" | "duplicate" | "removed";

export type QuestionDocument = mongoose.Document & {
    subject: mongoose.Schema.Types.ObjectId;
    topic: mongoose.Schema.Types.ObjectId;
    statement: Markup,
    options: ({ id: number } & Markup)[];
    correctAnswer: number;
    solution?: Markup;
    status: QuestionStatus;
};

const MarkupSchema = {
    text: { type: String, required: true },
    images: [String],
}

const QuestionSchema = new mongoose.Schema<QuestionDocument>({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
    },
    statement: MarkupSchema,
    options: [{
        id: { type: Number, required: true },
        ...MarkupSchema,
    }],
    correctAnswer: { type: Number, required: true },
    solution: { type: MarkupSchema, required: false },
    status: { type: String, required: true },
});

export const Question = mongoose.model<QuestionDocument>(
    "question",
    QuestionSchema
);
