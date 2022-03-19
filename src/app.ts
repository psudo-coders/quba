import express, { Request, Response } from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import passport from "passport";
import mongoose from "mongoose";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import questions from "./controllers/question"
import subject from "./controllers/subject"
import topic from "./controllers/topic"
import test from "./controllers/test"

import { isAuthenticated, isAuthorized } from "./config/passport";
import { ROLES } from "./util/roles";

// Create express app
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.static(path.join(__dirname, "../client/build"), {
        maxAge: 31557600000,
    })
);

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "SESSION_SECRET",
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
const mongoUrl = "mongodb://127.0.0.1:27017/quba";

mongoose
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch((err) => {
        console.log(
            `MongoDB connection error. Please make sure MongoDB is running. ${err}`
        );
        // process.exit();
    });

/**
 * Primary app routes
 */
app.get("/", isAuthenticated, isAuthorized(ROLES.Admin), homeController.index);
app.post("/login", userController.postLogin);
app.use("/api/question", questions)
app.use("/api/subject", subject)
app.use("/api/topic", topic)
app.use("/api/test", test)


// All other GET requests not handled before will return our React app
app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

export default app;
