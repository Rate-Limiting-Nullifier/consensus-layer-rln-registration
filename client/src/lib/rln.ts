
enum ValidatorStatus {
    NOT_REGISTERED,
    REGISTERED,
    BANNEDa
}

export interface pubkey { }

class RlnRegistrationEntry {
    pubkey: string;
    idCommitment: string;
    signature: string;
    validated: boolean;

    constructor(pubkey: string, idCommitment: string, signature: string) {
        if (pubkey.length == 48 && idCommitment.length == 32 && signature.length == 96) {
            this.pubkey = pubkey;
            this.idCommitment = idCommitment;
            this.signature = signature;
            this.validated = false;
        }
        else {
            throw new Error("Invalid registration entry");
        }
        this.validate();
        return this;
    }

    validate(): void {
        throw new Error("Not implemented");

        this.validated = true;
    }

}

export default RlnRegistrationEntry;