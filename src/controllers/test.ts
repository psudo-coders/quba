import { Request, Response, Router } from "express";
import { Question } from "../models/Question"
import { handleError } from "./util";

async function generate(req: Request, res: Response) {
    const count = parseInt(req.query.count as string) || 10;
    const questions = await Question.aggregate([
        { $match: { status: "freeze" } },
        { $sample: { size: count } }
    ]).exec();
    res.json(questions);
}

export default Router()
    .get("/generate", handleError(generate))

