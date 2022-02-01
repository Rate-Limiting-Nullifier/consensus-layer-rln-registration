// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "hardhat/console.sol";

/**
 * @title ETH2 Private messaging registry contract
 * @notice The registry contract used by ETH2 validators to register in the private chat
 */
contract Registry {
    event Registered(
        bytes indexed pubkey,
        bytes indexed idCommitment,
        bytes signature
    );

    /**
     * @notice Record the registration related parameters in the blockchain's logs and emit Registration event
     * @param pubkey A BLS12-381 public key of the ETH2 validator
     * @param idCommitment An identity commitment for the ETH2 validator for group membership
     * @param signature A BLS12-381 signature of the `idCommitment` signed by the ETH2 validator's
     * private key from which the `pubkey` is derived from
     */
    function register(
        bytes calldata pubkey,
        bytes calldata idCommitment,
        bytes calldata signature
    ) external {
        require(
            pubkey.length == 48,
            "Registration Error: pubkey length should be 48 bytes"
        );
        require(
            idCommitment.length == 32,
            "Registration Error: idCommitment length should be 32 bytes"
        );
        require(
            signature.length == 96,
            "Registration Error: signature length should be 96 bytes"
        );

        // Emit a registration event
        // The validity of the event to be processed offchain
        emit Registered(pubkey, idCommitment, signature);
    }
}
