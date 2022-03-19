import { Request, Response, Router } from "express";
import { Subject } from "../models/Subject"
import { handleError } from "./util";

async function create(req: Request, res: Response) {
    const subject = new Subject(req.body);
    await subject.save();
    res.json({ id: subject._id });
}

async function list(_req: Request, res: Response) {
    const subjects = await Subject.find().exec();
    res.json(subjects);
}

export default Router()
    .post("/create", handleError(create))
    .get("/list", handleError(list))

