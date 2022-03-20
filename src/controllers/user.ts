import { body, check, validationResult } from "express-validator";
import passport from "passport";
import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import "../config/passport";
import { User, UserDocument } from "../models/User";
import { IVerifyOptions } from "passport-local";
import mongoose from "mongoose";
import { ROLES } from "../util/roles";

/**
 * Sign in using email and password.
 * @route POST /login
 */
export const postLogin = async (
    req: Request,
    res: Response
): Promise<Response> => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank")
        .isLength({ min: 1 })
        .run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(401);
        return res.json({
            success: false,
            error: errors.array(),
        });
    }

    passport.authenticate(
        "local",
        (err: Error, user: UserDocument, info: IVerifyOptions) => {
            if (err) {
                res.status(401);
                return res.json({
                    success: false,
                    error: "Login failed",
                });
            }
            if (!user) {
                res.status(401);
                return res.json({
                    success: false,
                    error: info.message,
                });
            }
            req.logIn(user, () => {
                res.status(200);
                return res.json({ success: true, user });
            });
        }
    )(req, res);
};

/**
 * Create a new local account.
 * @route POST /signup
 */
export const postSignup = async (
    req: Request,
    res: Response
): Promise<Response> => {
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password must be at least 4 characters long")
        .isLength({ min: 4 })
        .run(req);
    await check("confirmPassword", "Passwords do not match")
        .equals(req.body.password)
        .run(req);

    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(401);
        return res.json({
            success: false,
            error: errors.array(),
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashPassword,
        username: req.body.username,
        phone: req.body.phone,
        role: ROLES.Submitter,
    });

    User.findOne(
        { email: req.body.email },
        (err: mongoose.NativeError, existingUser: UserDocument) => {
            if (err) {
                res.status(401);
                return res.json({
                    success: false,
                    error: "Signup Failed",
                });
            }
            if (existingUser) {
                res.status(401);
                return res.json({
                    success: false,
                    error: "Account with that email address already exists.",
                });
            }
            user.save((err) => {
                if (err) {
                    res.status(401);
                    return res.json({
                        success: false,
                        error: "Signup Failed",
                    });
                }
                req.logIn(user, (err) => {
                    if (err) {
                        res.status(401);
                        return res.json({
                            success: false,
                            error: "Signup Failed",
                        });
                    }
                    res.status(200);
                    return res.json({ success: true, user });
                });
            });
        }
    );
};
