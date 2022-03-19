import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

export type UserDocument = mongoose.Document & {
    username: string;
    password: string;
    role: number;
    email: string;
    phone: string;

    comparePassword: comparePasswordFunction;
};

const userSchema = new mongoose.Schema<UserDocument>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3 },
    role: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
});

type comparePasswordFunction = (
    candidatePassword: string,
    cb: (err: any, isMatch: any) => void
) => void;

const comparePassword: comparePasswordFunction = function (inputPassword, cb) {
    bcrypt.compare(
        inputPassword,
        this.password,
        (err: Error, isMatch: boolean) => {
            cb(err, isMatch);
        }
    );
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("user", userSchema);
