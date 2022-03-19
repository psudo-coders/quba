import { Request, Response, Router } from "express";
import { Question } from "../models/Question"
import { handleError } from "./util";

async function generate(req: Request, res: Response) {
    const count = parseInt(req.params.count) || 10;
    const questions = await Question.aggregate([{ $sample: { size: count } }]).exec();
    res.json(questions);
}

export default Router()
    .get("/generate", handleError(generate))

