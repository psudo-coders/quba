import { Request, Response, Router } from "express";
import { Question } from "../models/Question"
import { handleError } from "./util"

async function create(req: Request, res: Response) {
    // TODO: handle attachments
    const question = new Question({
        status: "pending",
        ...req.body,
    });
    await question.save();
    res.json({ id: question._id });
}

async function info(req: Request, res: Response) {
    // TODO: handle non admin access
    const id = req.query.id;
    const question = await Question.findById(id).exec();
    res.json(question);
}

async function list(req: Request, res: Response) {
    const questions = await Question.find().exec();
    res.json(questions);
}

async function update(req: Request, res: Response) {
    let id = req.body.id;
    delete req.body.id;
    await Question.findByIdAndUpdate(id, req.body).exec();
    res.sendStatus(200);
}

export default Router()
    .post("/create", handleError(create))
    .get("/info", handleError(info))
    .get("/list", handleError(list))
    .post("/update", handleError(update))
