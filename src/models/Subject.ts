import mongoose from "mongoose";

export type SubjectDocument = mongoose.Document & {
    _id : string
    name  : string
}

const subjectSchema = new mongoose.Schema<SubjectDocument>({
    name  : {
        type : String,
        required : true
    }
})

export const Subject = mongoose.model<SubjectDocument>("subject", subjectSchema);