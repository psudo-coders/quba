import mongoose from "mongoose";

export type ActivityLogDocument = mongoose.Document & {
    type : String;
    data :{
        type : String;
        actiond  : String;
        oldName : String;
        typeReference : mongoose.Schema.Types.ObjectId;
        newName  :String
    }    
}

const activityLogSchema = new mongoose.Schema<ActivityLogDocument>({
    type : String,
    data : {
        type : String,
        action : String,
        oldName : String,
        typeReference : mongoose.Schema.Types.ObjectId,
        newName  : String
    }
})

export const ActivityLog = mongoose.model<ActivityLogDocument>("activityLog", activityLogSchema);