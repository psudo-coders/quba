import mongoose from "mongoose";

export type QuestionLogDocument = mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId;
    question : mongoose.Schema.Types.ObjectId;
    author :mongoose.Schema.Types.ObjectId;
    oldStatus : String;
    newStatus : String;
    remarks : String
}

const QuestionLogShema = new mongoose.Schema<QuestionLogDocument>({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    question : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'question'
    },
    oldStatus : String,
    newStatus: String,
    remarks :String
})


export const QuestionLog = mongoose.model<QuestionLogDocument>('questionLog', QuestionLogShema);