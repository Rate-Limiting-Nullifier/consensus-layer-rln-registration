import express from 'express';
import { Request, Response } from 'express';
import RlnRegistrationEntry from '../lib/rln';

const registerRouter = express.Router();



registerRouter.get('/', (req: Request, res: Response) => {
    res.send(`Am I registered?`);
});

registerRouter.post('/', (req: Request, res: Response) => {
    const pubkey = req.query.pubkey
    const idCommitment = req.query.idCommitment
    const signature = req.query.signature

    if (pubkey && idCommitment && signature) {
        if (pubkey.length == 48 && idCommitment.length == 32 && signature.length == 96) {
            let newRegistration = new RlnRegistrationEntry(
                pubkey as string,
                idCommitment as string,
                signature as string,
            )
            res.json(newRegistration)
        }
    }
});

export default registerRouter