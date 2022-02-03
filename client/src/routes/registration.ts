import express from 'express';
import { Request, Response } from 'express';
import QueryGraph from '../lib/graphql';

import config from '../../../config.json'

const network = config['default_network'];

const subgraph_endpoint = config['network'][network]['subgraph_endpoint'];

const registrationRouter = express.Router();
const graphclient = new QueryGraph(subgraph_endpoint);

registrationRouter.get('/', (req: Request, res: Response) => {
    res.send(`This function is not supported, please use /registry/{publickey}`);
});

registrationRouter.get('/:publickey', (req: Request, res: Response) => {
    graphclient.getRegistration(req.params.publickey).then((_registration_status) => {
        res.json({ "Registered": _registration_status.registrationEntities[0] });
    });
});

export default registrationRouter