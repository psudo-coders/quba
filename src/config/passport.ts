import passport from "passport";
import { NextFunction, Request, Response } from "express";
import passportLocal from "passport-local";
import { User, UserDocument } from "../models/User";
import { NativeError } from "mongoose";
import { ROLES } from "../util/roles";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) =>
        done(err, user)
    );
});

/**
 * Sign in using Email and Password.
 */
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne(
            { email: email.toLowerCase() },
            (err: NativeError, user: UserDocument) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(undefined, false, {
                        message: `Email ${email} not found.`,
                    });
                }
                user.comparePassword(
                    password,
                    (err: Error, isMatch: boolean) => {
                        if (err) {
                            return done(err);
                        }
                        if (isMatch) {
                            return done(undefined, user);
                        }
                        return done(undefined, false, {
                            message: "Invalid email or password.",
                        });
                    }
                );
            }
        );
    })
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401);
    return res.json({ success: false, error: "Unauthorized. Please login" });
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized =
    (...roles: ROLES[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as UserDocument;

        if (!user) {
            res.status(401);
            return res.json({
                success: false,
                error: "Unauthorized. Please login",
            });
        }

        const hasRole = roles.find((role) => user.role === role);
        if (!hasRole) {
            res.status(401);
            return res.json({
                success: false,
                error: "Unauthorized role access",
            });
        }

        return next();
    };
