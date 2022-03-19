import { Request, Response, Router } from "express";
import { Question } from "../models/Question"

function handleError(inner: (req: Request, res: Response) => Promise<void>) {
    return async (req: Request, res: Response) => {
        try {
            await inner(req, res);
        } catch (e) {
            // everything is bad request
            res.status(400).json(e);
        }
    }
}

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
    const id = req.params.id;
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

async function updateStatus(req: Request, res: Response) {
    let id = req.body.id;
    await Question.findByIdAndUpdate(id, { status: req.body.status });
    res.sendStatus(200);
}

export default Router()
    .post("/create", handleError(create))
    .get("/info", handleError(info))
    .get("/list", handleError(list))
    .post("/update", handleError(update))
    .post("/update-status", handleError(updateStatus))