import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-etherscan"
import "solidity-coverage"
import { HardhatUserConfig } from "hardhat/types"
import { config as dotEnvConfig } from "dotenv"


dotEnvConfig()

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const RINKEBY_PRIVATE_KEY =
    process.env.RINKEBY_PRIVATE_KEY! || process.env.ETHEREUM_PRIVATE_KEY ||
    "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [{ version: "0.8.11", settings: {} }],
    },
    networks: {
        hardhat: {},
        localhost: {},
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [RINKEBY_PRIVATE_KEY],
        },
        coverage: {
            url: "http://127.0.0.1:8555",
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;