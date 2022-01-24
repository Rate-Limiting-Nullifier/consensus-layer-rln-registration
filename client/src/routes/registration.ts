import express from 'express';
import { Request, Response } from 'express';

const registrationRouter = express.Router();


registrationRouter.get('/', (req: Request, res: Response) => {
    res.send(`This function is not yet supported, please use /registry/:publickey`);
});

registrationRouter.get('/:publickey', (req: Request, res: Response) => {
    let publickey = req.params.publickey;
    res.json({ Registry_Pubkey: publickey });
});

export default registrationRouter