import { Request, Response, Router } from "express";
import { Topic } from "../models/Topic"
import { handleError } from "./util";

async function create(req: Request, res: Response) {
    const topic = new Topic(req.body);
    await topic.save();
    res.json({ id: topic._id });
}

async function list(_req: Request, res: Response) {
    const topics = await Topic.find().exec();
    res.json(topics);
}

export default Router()
    .post("/create", handleError(create))
    .get("/list", handleError(list))

