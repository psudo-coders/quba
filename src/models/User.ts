import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    username : String;
    password : String,
    role : number;
    email : string;
    phone : string;
}

const UserShema = new mongoose.Schema<UserDocument>({
    username : {type : String, required : true, unique : true},
    password : {type : String, requred : true, minlength : 3},
    role : {type : Number, required : true},
    email : {type : String, required : true, unique : true},
    phone : String
})

export const User = mongoose.model<UserDocument>('user', UserShema);