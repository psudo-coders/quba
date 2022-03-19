import { Request, Response, Router } from "express";
import { Question } from "../models/Question"
import { handleError } from "./util";

async function generate(req: Request, res: Response) {
    const questions = await Question.aggregate([{ $sample: { size: count } }]).exec();
    const count = parseInt(req.query.count as string) || 10;
    res.json(questions);
}

export default Router()
    .get("/generate", handleError(generate))

