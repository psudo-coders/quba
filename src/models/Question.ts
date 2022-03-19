import mongoose from "mongoose";

export type QuestionDocument = mongoose.Document & {
    subject: mongoose.Schema.Types.ObjectId;
    topic : mongoose.Schema.Types.ObjectId;
    statement : {problem : String, diagram : [String]};
    options : {id : Number, choice : String, diagram : String};
    correctAnswer : number;
    solution : {text : String , diagram : [String]}
    status : string
}

const QuestionShema = new mongoose.Schema<QuestionDocument>({
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subject'
    },
    topic : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'topic'
    },
    statement : {
        problem : {type : String, required : true},
        diagram : [String]
    },
    options  :{
        id : {type : Number, required  :true},
        choice : String,
        diagram : String
    },
    correctAnswer : {type : Number, required : true},
    solution : {
        text :String,
        diagram : [String]
    },
    status : {type : String , required : true}
})



export const Question = mongoose.model<QuestionDocument>('question', QuestionShema);