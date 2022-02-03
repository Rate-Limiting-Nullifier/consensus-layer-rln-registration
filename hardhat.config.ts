import { HardhatUserConfig } from "hardhat/types";

import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-etherscan"
import "solidity-coverage"
import "hardhat-deploy"
import { config as dotEnvConfig } from "dotenv"

const _defaultPrivateKey = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"
const _hardhatBalance = "100000000000000000000"

dotEnvConfig()

const INFURA_API_KEY = (process.env.INFURA_API_KEY) ? process.env.INFURA_API_KEY : "";
const ETHERSCAN_API_KEY = (process.env.ETHERSCAN_API_KEY) ? process.env.ETHERSCAN_API_KEY : "";

const TESTNET_PRIVATE_KEY = (process.env.TESTNET_PRIVATE_KEY) ? process.env.TESTNET_PRIVATE_KEY : _defaultPrivateKey;

const HARDHAT_ACCOUNT = (process.env.HARDHAT_ACCOUNT) ? process.env.HARDHAT_ACCOUNT : TESTNET_PRIVATE_KEY;

const RINKEBY_PRIVATE_KEY = (process.env.RINKEBY_PRIVATE_KEY) ? process.env.RINKEBY_PRIVATE_KEY : TESTNET_PRIVATE_KEY;

const ROPSTEN_PRIVATE_KEY = (process.env.ROPSTEN_PRIVATE_KEY) ? process.env.ROPSTEN_PRIVATE_KEY : TESTNET_PRIVATE_KEY;


const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: 0
    },
    solidity: {
        compilers: [{
            version: "0.8.11", settings: {
                optimizer: {
                    enabled: true,
                    runs: 2000,
                },
            }
        }],
    },
    networks: {
        hardhat: {
            accounts: [{ "privateKey": HARDHAT_ACCOUNT, "balance": _hardhatBalance }],
            live: false,
            saveDeployments: true,
            tags: ["test", "local"]
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`${RINKEBY_PRIVATE_KEY}`],
            live: true,
            saveDeployments: true,
            tags: ["staging"]
        },
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`${ROPSTEN_PRIVATE_KEY}`],
            live: true,
            saveDeployments: true,
            tags: ["test", "live"]
        },
        coverage: {
            url: "http://127.0.0.1:8555",
        },
        localhost: {
            live: false,
            saveDeployments: true,
            tags: ["local"]
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    paths: {
        deploy: 'deploy',
        deployments: 'deployments',
    },
    mocha: {
        timeout: 100000,
    },
};

export default config;