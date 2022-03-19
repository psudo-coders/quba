import mongoose from "mongoose";

export type NotificationDocument = mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    message: string;
};

const notificationSchema = new mongoose.Schema<NotificationDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: String,
    message: String,
});

export const Notification = mongoose.model<NotificationDocument>(
    "notification",
    notificationSchema
);
