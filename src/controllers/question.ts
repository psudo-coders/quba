import { Request, Response, Router } from "express";
import { Question, QuestionDocument } from "../models/Question";
import { handleError } from "./util";
import { logActivity } from "./activityLog";
import { UserDocument } from "../models/User";
import { isAuthorized } from "../config/passport";
import { ROLES } from "../util/roles";
import mongoose from "mongoose";
import { Subject } from "../models/Subject";
import { Topic } from "../models/Topic";

async function create(req: Request, res: Response) {
    // TODO: handle attachments
    const user = req.user as UserDocument;
    req.body.subject = new mongoose.Types.ObjectId(req.body.subject);
    req.body.topic = new mongoose.Types.ObjectId(req.body.topic);
    const question = new Question({
        status: "pending",
        ...req.body,
        author: user._id,
    });
    await question.save();
    await logActivity(
        {
            kind: "question",
            action: "create",
            data: question,
        },
        req
    );
    res.json({ id: question._id });
}

async function info(req: Request, res: Response) {
    // TODO: handle non admin access
    const id = req.query.id;
    const question = await Question.findById(id).exec();
    res.json(question);
}

async function list(req: Request, res: Response) {
    if ((req.user as UserDocument).role === ROLES.Admin) {
        const questions = await Question.find().exec();
        res.json(
            await Promise.all(
                questions.map((x) => preprocessQuestion(x.toObject()))
            )
        );
    } else {
        // find questions of the user
        const questions = await Question.find({
            user: (req.user as UserDocument)._id,
        }).exec();
        res.json(
            await Promise.all(
                questions.map((x) => preprocessQuestion(x.toObject()))
            )
        );
    }
}

async function update(req: Request, res: Response) {
    let id = req.body.id;
    delete req.body.id;
    const oldQuestion = await Question.findByIdAndUpdate(id, req.body).exec();
    await logActivity(
        {
            kind: "question",
            action: "update",
            data: oldQuestion,
            changes: req.body,
        },
        req
    );

    res.status(200).json({ id });
}

async function remove(req: Request, res: Response) {
    let id = req.body.id;
    let question = await Question.findByIdAndDelete(id).exec();
    await logActivity(
        {
            kind: "question",
            action: "delete",
            data: question,
        },
        req
    );
    res.status(200).json({ id });
}

// TODO: types go brr
export async function preprocessQuestion(question: any): Promise<any> {
    const { subject, topic } = question;

    try {
        const subject_val = await Subject.findById(subject);
        const topic_val = await Topic.findById(topic);
        return {
            ...question,
            subject: subject_val.name,
            topic: topic_val.name,
        };
    } catch (e) {
        return {
            ...question,
            subject: "invalid subject",
            topic: "invalid topic",
        };
    }
}

async function toReview(_req: Request, res: Response) {
    const questions = await Question.find({ status: "pending" }).sort({
        createdAt: 1,
    });
    // TODO: try avoid more than one review per question collision
    res.json(
        await Promise.all(
            questions.map((x) => preprocessQuestion(x.toObject()))
        )
    );
}

export default Router()
    .post("/create", handleError(create))
    .get("/info", handleError(info))
    .get("/list", handleError(list))
    .post(
        "/update",
        isAuthorized(ROLES.Admin, ROLES.Reviewer),
        handleError(update)
    )
    .post(
        "/remove",
        isAuthorized(ROLES.Admin, ROLES.Reviewer),
        handleError(remove)
    )
    // Question for you to review
    .get(
        "/toReview",
        isAuthorized(ROLES.Admin, ROLES.Reviewer),
        handleError(toReview)
    );
