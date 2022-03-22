import { Request, Response } from 'express';

const Imgur: any = require("imgur-anonymous-uploader");

const uploader = new Imgur(process.env.IMGUR_CLIENT_ID);
export default async function (req: Request, res: Response) {
    const image = (req.files as any).image;
    const result = await uploader.upload(image.path);
    res.send(result.url);
}
