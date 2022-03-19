import { Request, Response, Router } from "express";
import { Question } from "../models/Question"
import { handleError } from "./util"
import { logActivity } from "./activityLog"
import { UserDocument } from "../models/User";
import { isAuthorized } from "../config/passport";
import { ROLES } from "../util/roles";


async function create(req: Request, res: Response) {
    // TODO: handle attachments
    const question = new Question({
        status: "pending",
        ...req.body,
    });
    await question.save();
    await logActivity({
        kind: "question",
        action: "create",
        data: question,
    }, req);
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
        res.json(questions);
    } else {
        // find questions of the user
        const questions = await Question.find({ user: (req.user as UserDocument)._id }).exec();
        res.json(questions);
    }
}

async function update(req: Request, res: Response) {
    let id = req.body.id;
    delete req.body.id;
    const oldQuestion = await Question.findByIdAndUpdate(id, req.body).exec();
    await logActivity({
        kind: "question",
        action: "update",
        data: oldQuestion,
        changes: req.body,
    }, req);

    res.sendStatus(200);
}

async function remove(req: Request, res: Response) {
    let id = req.body.id;
    let question = await Question.findByIdAndDelete(id).exec();
    await logActivity({
        kind: "question",
        action: "delete",
        data: question,
    }, req);
    res.sendStatus(200);
}

export default Router()
    .post("/create", isAuthorized(ROLES.Submitter, ROLES.Admin), handleError(create))
    .get("/info", handleError(info))
    .get("/list", handleError(list))
    .post("/update", isAuthorized(ROLES.Admin, ROLES.Reviewer), handleError(update))
    .post("/remove", isAuthorized(ROLES.Admin, ROLES.Reviewer), handleError(remove));
