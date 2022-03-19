import mongoose from "mongoose";

export type TopicDocument = mongoose.Document & {
    name : String;
    subject : mongoose.Schema.Types.ObjectId
}

const topicShema = new mongoose.Schema<TopicDocument>({
    name : String,
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subject'
    }
})

export const Topic = mongoose.model<TopicDocument>('topic', topicShema);