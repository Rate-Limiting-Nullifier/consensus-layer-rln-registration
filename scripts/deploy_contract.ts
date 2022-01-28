import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

const contract_address_filepath = path.join(__dirname, '../artifacts/contract_address.json')

async function main() {
    const factory = await ethers.getContractFactory("Registry");

    // If we had constructor arguments, they would be passed into deploy()
    let contract = await factory.deploy();

    // The address the newly deployed contract will have
    console.log(
        `The address the Contract WILL have once mined: ${contract.address}`
    );

    let addresses_json = new Object;

    // Reads the `contract_address.json` file and parses it into a JSON object so if any other network addresses are stored there, they won't be overwritten
    // TODO need to read contract_address.json in and parse it into a JSON object


    // Adds the newly deployed contract's address to the JSON object
    addresses_json = {
        ...addresses_json, ...{ "hardhat": contract.address }
    };

    // Writes the JSON object of contract address(es) to the `contract_address.json` file
    fs.writeFileSync(contract_address_filepath, JSON.stringify(addresses_json))

    console.log(
        `The transaction that was sent to the network to deploy the Contract: ${contract.deployTransaction.hash
        }`
    );

    console.log(
        'Waiting for transaction to complete...'
    );
    await contract.deployed();
    console.log('Contract fully deployed!');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });