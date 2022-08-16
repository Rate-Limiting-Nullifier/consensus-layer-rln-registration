# Private message sharing for ETH2 validators using the [RLN Construct](https://medium.com/privacy-scaling-explorations/rate-limiting-nullifier-a-spam-protection-mechanism-for-anonymous-environments-bbe4006a57d)

# Overview

This project is broken down into multiple components:

- Contract (`./contracts`): the code that runs on the Ethereum blockchain.
  - The deployment script(s) (`./deploy`): the scripts that deploy the contract to the Ethereum blockchain.
  - Building and deploying the contract will also generate several files in the following directories:
    - Building (Compiling):
      - `./artifacts`
      - `./typechain-types`
      - `./cache`
    - Coverage (Testing): `./coverage`
    - Deploying: `./deployments`
- Client (`./registry-client`): serves as the RLN client and handles multiple tasks:
  - Serves the frontend UI accessible at `http://localhost:2601/` which allows a user to register their identity commitment, and allows the user to verify other users' identity commitments.
  - Serves the Rest API `http://localhost:2601/api/v1/getRegistration/{public_key}` which queries the subgraph for the registration of a public key
- Subgraph (`./subgraph`): the code that runs on The Graph and indexes the blockchain for RLN registrations.

This project also contains some infrustructure:

- Graph Node (`./graph-node`): runs a local graph node where the subgraph can be deployed and tested.
- Docker Compose (`./docker-compose.yml`): builds and runs the client in a docker container.

# Using this Project

## Run the client in docker

`docker-compose up` will build and run the client in a docker container for you.

## Build and run the client on your local machine

`npm run client:build` will clean the build directory and build the client using webpack and put the build in the `./client/dist/` directory.

`npm run client:run` will run the client.

# Setup for development

1. Clone this repository `git clone https://github.com/AtHeartEngineering/rln-validator-messaging`
2. install the dependencies with `npm install`
3. Build with `npm run build`.

### Contract

#### Build the contract

`npm run contract:build` will clean the build directory and build the contract.

#### Run Contract Tests

In one terminal run `npx hardhat node --no-deploy`

Then in another run `npm run contract:test`

Notes:

- The gas usage table may be incomplete (the gas report currently needs to run with the `--network localhost` flag; see below).

- When running with this `localhost` option, you get a gas report but may not get good callstacks
- See [here](https://github.com/cgewecke/eth-gas-reporter#installation-and-config) for how to configure the gas usage report.

#### Run Coverage Report for Tests

`npm run contract:coverage`

Notes:

- running a coverage report currently deletes artifacts, so after each coverage run you will then need to run `npx hardhat clean` followed by `npm run build` before re-running tests
- the current coverage is 100% for the contract

### Build Deploy to a local hardhat node for development

`npm run contract:node` will build the contract, start a local hardhat node, and deploy the contract to the node.

### Deploy to the Ethereum Rinkeby test network

Create/modify network config in `hardhat.config.ts` and add API key and private key, then run:

`npx hardhat deploy --network rinkeby`

## Client Development

`npm run client:devserver` will serve `./client/dist/server.js` using node and reload the server on changes

`npm run client:watch` will watch for changes in the `./client/src/` directory and rebuild the client. If there is a non-recoverable error, this will sometimes break and needs to be restarted.

## Subgraph / Graph Node Development

I would recommend reading The Graph's developer quick-start guide before changing anything in the `./subgraph` directory.

https://thegraph.com/docs/en/developer/quick-start/

### Build the subgraph

**Every command should be executed in the `./subgraph` directory.**

`npm run codegen` will generate the schema and resolvers for the subgraph.

`npm run build` will build the subgraph.

### Deploy the subgraph to the TheGraph

`npm run deploy` will deploy the subgraph to the Graph Node.

### Deploy the subgraph to a local Graph Node

`npm run create-local` allocates the local subgraph name

`npm run deploy-local` will deploy the subgraph to the local Graph Node.
