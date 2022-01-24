import express from 'express';
import { Request, Response } from 'express';

const slashedRouter = express.Router();


slashedRouter.get('/', (req: Request, res: Response) => {
    res.send(`This function is not yet supported`);
});

slashedRouter.get('/:publickey', (req: Request, res: Response) => {
    let publickey = req.params.publickey;
    res.json({ Registry_Pubkey: publickey });
});

export default slashedRouter