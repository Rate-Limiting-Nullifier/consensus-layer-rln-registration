import { ethers } from 'ethers'

import * as RegistryContract from '../../../artifacts/contracts/RLN_Registry.sol/Registry.json'

import ContractAddress from '../../../artifacts/contract_address.json'

const registryContract = new ethers.Contract(ContractAddress['hardhat'], RegistryContract.abi, new ethers.providers.JsonRpcProvider())

export default registryContract