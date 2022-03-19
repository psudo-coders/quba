import mongoose from "mongoose";
import { QuestionDocument } from "./Question";
import { SubjectDocument } from "./Subject";
import { TopicDocument } from "./Topic";

type Changes<Kind, T> =
    | { kind: Kind, action: "create", data: T }
    | { kind: Kind, action: "update", data: T, changes: Partial<T> }
    | { kind: Kind, action: "delete", data: T };

export type ActivityLogDocument = mongoose.Document & { user: mongoose.ObjectId, remarks?: string } &
    (
        | Changes<"question", QuestionDocument>
        | Changes<"subject", SubjectDocument>
        | Changes<"topic", TopicDocument>
        | { kind: "questionPaper", action: "generated" }
    );

const activityLogSchema = new mongoose.Schema<ActivityLogDocument>({
    kind: String,
    action: String,
    data: mongoose.SchemaTypes.Mixed,
});

export const ActivityLog = mongoose.model<ActivityLogDocument>(
    "activityLog",
    activityLogSchema
);
