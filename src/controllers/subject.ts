import { Request, Response, Router } from "express";
import { Subject, SubjectDocument } from "../models/Subject"
import { logActivity } from "./activityLog";
import { handleError } from "./util";
import { isAuthorized } from "../config/passport";
import { ROLES } from "../util/roles";

async function create(req: Request, res: Response) {
    const subject = new Subject(req.body);
    await subject.save();
    await logActivity({
        kind: "subject",
        action: "create",
        data: subject,
    });
    res.json({ id: subject._id });
}

async function list(_req: Request, res: Response) {
    const subjects = await Subject.find().exec();
    res.json(subjects);
}

async function update(req: Request, res: Response) {
    const id = req.body.id;
    delete req.body.id;
    const old = await Subject.findByIdAndUpdate(id, req.body).exec();
    await logActivity({
        kind: "subject",
        action: "update",
        data: old,
        changes: req.body,
    });
    res.json({ id });
}

async function remove(req: Request, res: Response) {
    const id = req.body.id;
    const subject = await Subject.findByIdAndDelete(id).exec();
    await logActivity({
        kind: "subject",
        action: "delete",
        data: subject,
    });
    res.json({ id });
}

export default Router()
    // HACK: allowing reviewer to create subjects
    .post("/create", isAuthorized(ROLES.Reviewer), handleError(create))
    .get("/list", handleError(list))
    .post("/update", isAuthorized(ROLES.Admin), handleError(update))
    .post("/remove", isAuthorized(ROLES.Admin), handleError(remove));

