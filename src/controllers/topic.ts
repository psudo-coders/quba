import { Request, Response, Router } from "express";
import { Topic } from "../models/Topic"
import { logActivity } from "./activityLog";
import { handleError } from "./util";

import { isAuthorized } from "../config/passport";
import { ROLES } from "../util/roles";

async function create(req: Request, res: Response) {
    const topic = new Topic(req.body);
    await topic.save();
    res.json({ id: topic._id });
}

async function list(_req: Request, res: Response) {
    const topics = await Topic.find().exec();
    res.json(topics);
}

async function update(req: Request, res: Response) {
    const id = req.body.id;
    delete req.body.id;
    const old = await Topic.findByIdAndUpdate(id, req.body).exec();
    await logActivity({
        kind: "topic",
        action: "update",
        data: old,
        changes: req.body,
    });
    res.sendStatus(200);
}

async function remove(req: Request, res: Response) {
    // TODO: check if topic is used by any other resource
    const id = req.body.id;
    const topic = await Topic.findByIdAndDelete(id).exec();
    await logActivity({
        kind: "topic",
        action: "delete",
        data: topic,
    });
    res.sendStatus(200);
}

export default Router()
    .post("/create", handleError(create))
    .get("/list", handleError(list))
    .post("/update", isAuthorized(ROLES.Admin), handleError(update))
    .post("/remove", isAuthorized(ROLES.Admin), handleError(remove));

