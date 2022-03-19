import mongoose from "mongoose";

export type TopicDocument = mongoose.Document & {
    name: string;
    subject: mongoose.Schema.Types.ObjectId;
};

const topicSchema = new mongoose.Schema<TopicDocument>({
    name: String,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
    },
});

export const Topic = mongoose.model<TopicDocument>("topic", topicSchema);
