import { Request, Response} from "express";

export function handleError(inner: (req: Request, res: Response) => Promise<void>) {
    return async (req: Request, res: Response) => {
        try {
            await inner(req, res);
        } catch (e) {
            // everything is bad request
            res.status(400).json(e);
        }
    }
}

