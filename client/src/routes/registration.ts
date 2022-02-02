import express from 'express';
import { Request, Response } from 'express';
import QueryGraph from '../lib/graphql';

const url = "https://gateway.thegraph.com/api/<API_KEY>/subgraphs/id/QmUqfarx8ejgCTUegukNtf67N8FgLtfeCUpeaXftTiRAHe"

const registrationRouter = express.Router();
const graphclient = new QueryGraph('https://api.studio.thegraph.com/query/20474/rln-registry/v0.0.1')

registrationRouter.get('/', (req: Request, res: Response) => {
    res.send(`This function is not yet supported, please use /registry/{publickey}`);
});

registrationRouter.get('/:publickey', (req: Request, res: Response) => {
    graphclient.getRegistration(req.params.publickey).then((_registration_status) => {
        res.json({ "Registered": _registration_status });
    });

});

export default registrationRouter