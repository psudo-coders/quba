import mongoose from "mongoose";

export type ActivityLogDocument = mongoose.Document & {
    type: string;
    data: {
        type: string;
        action: string;
        oldName: string;
        typeReference: mongoose.Schema.Types.ObjectId;
        newName: string;
    };
};

const activityLogSchema = new mongoose.Schema<ActivityLogDocument>({
    type: String,
    data: {
        type: String,
        action: String,
        oldName: String,
        typeReference: mongoose.Schema.Types.ObjectId,
        newName: String,
    },
});

export const ActivityLog = mongoose.model<ActivityLogDocument>(
    "activityLog",
    activityLogSchema
);
