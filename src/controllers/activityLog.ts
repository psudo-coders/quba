import { Request, Response, Router } from "express";
import { UserDocument } from "../models/User";
import { ActivityLog, ActivityLogDocument } from "../models/activityLog"
import { handleError } from "./util"

import { ROLES } from "../util/roles";

async function list(req: Request, res: Response) {
    const user = req.user as UserDocument;
    if (user.role === ROLES.Admin) {
        const activityLogs = await ActivityLog.find().sort({ createdAt: -1 });
        res.json(activityLogs);
    } else {
        const activityLogs = await ActivityLog.find({
            $or: [
                { user: user._id },
                {
                    kind: "question", data: { author: user._id }
                },
            ]
        });
        res.json(activityLogs);
    }
}

export async function logActivity(activity: Partial<ActivityLogDocument>, req?: Request) {
    activity.user = activity.user || (req?.user as undefined | UserDocument)?._id;
    await new ActivityLog(activity).save();
}

export default Router()
    .get("/list", handleError(list))

