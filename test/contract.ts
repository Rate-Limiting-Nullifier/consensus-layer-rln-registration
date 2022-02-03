import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { ethers } from 'hardhat'

import type { Registry as RegistryContractType } from '../typechain-types'

chai.use(solidity)
chai.use(chaiAsPromised)
const { expect } = chai

const randomBytes = ethers.utils.randomBytes

describe("RegistryContract", function () {
    let registryContract: RegistryContractType
    let registryFactory

    before(async function () {
        registryFactory = await ethers.getContractFactory('Registry')
    });

    beforeEach(async () => {
        registryContract = await registryFactory.deploy()
        await registryContract.deployed()
    });

    it("Contract should have an address", async () => {
        expect(registryContract.address).to.properAddress
    })

    // Creates a new registry entry with random values
    let pubkey = randomBytes(48)
    let idCommitment = randomBytes(32)
    let signature = randomBytes(96)

    describe("Register with the correct length random bytes", () => {
        it("should initialize the random values with the correct length", async () => {
            // This is just to verify that the input values are correct, that way if you want to pass in test values, it will check that they are correct
            expect(pubkey.length).to.equal(48);
            expect(idCommitment.length).to.equal(32);
            expect(signature.length).to.equal(96);
        })

        it("should emit a single event when the register function is called", async () => {
            let registration_tx = await registryContract.register(pubkey, idCommitment, signature)
            let events = await registryContract.queryFilter(registryContract.filters.Registered())
            await expect(registration_tx).to.emit(registryContract, "Registered")
            await expect(events.length == 1).to.be.true
        })

        it("should emit an event with the correct data", async () => {
            await registryContract.register(pubkey, idCommitment, signature)
            let events = await registryContract.queryFilter(registryContract.filters.Registered())
            let event = events[0]
            expect(event.args.pubkey).to.equal(ethers.utils.hexlify(pubkey))
            expect(event.args.idCommitment).to.equal(ethers.utils.hexlify(idCommitment))
            expect(event.args.signature).to.equal(ethers.utils.hexlify(signature))
        })
    })

    describe("Register with the wrong length random bytes", () => {
        it("should throw an error if the pubkey is not the correct length", async () => {
            let pubkey = randomBytes(47)
            await expect(registryContract.register(pubkey, idCommitment, signature)).to.be.revertedWith("Registration Error: pubkey length should be 48 bytes")
        })

        it("should throw an error if the idCommitment is not the correct length", async () => {
            let idCommitment = randomBytes(31)
            await expect(registryContract.register(pubkey, idCommitment, signature)).to.be.revertedWith("Registration Error: idCommitment length should be 32 bytes")
        })

        it("should throw an error if the signature is not the correct length", async () => {
            let signature = randomBytes(95)
            await expect(registryContract.register(pubkey, idCommitment, signature)).to.be.revertedWith("Registration Error: signature length should be 96 bytes")
        })
    })
});