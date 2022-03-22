import { Request, Response, Router } from "express";
import { Question } from "../models/Question"
import { handleError } from "./util";

async function generate(req: Request, res: Response) {
    // TODO: filter based on subject, topic, difficulty, etc.
    // TODO: randomize option
    // TODO: generate answer sheet
    const count = parseInt(req.query.count as string) || 10;
    const questions = await Question.aggregate([
        // FIXME: temporary hack change pending -> freeze once we have a proper solution
        { $match: { status: "pending" } },
        { $sample: { size: count } }
    ]).exec();
    res.json(questions);
}

export default Router()
    // TODO: add role check
    .get("/generate", handleError(generate))

