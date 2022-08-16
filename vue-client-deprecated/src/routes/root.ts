import express from 'express';
import { Request, Response } from 'express';
import path from 'path';

const rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

export default rootRouter