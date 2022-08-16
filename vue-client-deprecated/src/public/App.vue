<script lang="ts">
import { defineComponent, markRaw } from "vue";
import { ethers } from 'ethers';
import { ZkIdentity } from "@zk-kit/identity"
import { init } from "@chainsafe/bls";
import { bls } from "@chainsafe/bls/browser";
import * as RegistryContract from '../../../artifacts/contracts/RLN_Registry.sol/Registry.json'

// Setups the registry contract address for each network
import hardhat_deployment from '../../../deployments/localhost/Registry.json'
import rinkeby_deployment from '../../../deployments/rinkeby/Registry.json'

// !TODO This is a placeholder until the contract is deployed to mainnet
const mainnet_deployment = { "address": null }

const randomBytes = ethers.utils.randomBytes;
const hexlify = ethers.utils.hexlify;

// This just declares that the "ethereum" object may exist
// on the window interface and has "any" type
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Creates the app component and sets up the store with
export default defineComponent({
  name: "App",
  components: {
  },
  created() {
    // Generates a Zero Knowledge Identity
    this.identity = new ZkIdentity();

    // Initializes the BLS library
    (async () => {
      console.log("Initializing BLS");
      await init("herumi");
      console.log("BLS initialized");
      this.bls = bls
    })();
    this.generate_idCommitment();
  },
  data() {
    return {
      bls: <any>null,
      provider: <any>null,
      network: <any>null,
      network_name: <string>null,
      signer: <any>null,
      signerAddress: <string>null,
      contractAddress: <string>null,
      contract: <any>null,
      identity: <any>null,
      secretkey: <any>null,
      privkey: <any>null,
      pubkey: <any>null,
      idCommitment: <any>null,
      signature: <any>null,
      registration: <any>null,
      pubkey_query: <any>null,
      verified: [],
    }
  },
  methods: {
    async connect() {
      // connect to Metamask
      this.provider = markRaw(new ethers.providers.Web3Provider(window.ethereum, "any"));

      this.provider.on("network", (newNetwork: string, oldNetwork: string) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network
        if (oldNetwork) {
          console.log(newNetwork);
          window.location.reload();
        }
      });

      // Get the network ID
      this.provider.getNetwork().then(network => {
        this.network = network.chainId;
        this.network_name = network.name;

        // This assigns the correct Contract address for the network
        switch (this.network) {
          case 1: {
            this.contractAddress = mainnet_deployment.address;
            break;
          }
          case 4: {
            this.contractAddress = rinkeby_deployment.address;
            break;
          }
          case 31337: {
            this.contractAddress = hardhat_deployment.address;
            this.network_name = "Hardhat";
            break;
          }
          default: {
            this.contractAddress = null;
            break;
          }
        }

        // Saves a reference to the Registry contract
        if (this.contractAddress) {
          this.contract = markRaw(new ethers.Contract(this.contractAddress, RegistryContract.abi, this.provider.getSigner()));
        }
        else {
          window.alert("UNABLE TO FIND CONTRACT ADDRESS, please run 'npm run contract:node' in a terminal and 'npm run contract:deploy' in another terminal to deploy the contract");
        }

        console.log("Contract Address set to: " + this.contractAddress);
      });

      // Establishes the signer and signerAddress
      this.provider.send("eth_requestAccounts", []).then(() => {
        this.signer = this.provider.getSigner()
        this.signer.getAddress().then((address: string) => {
          this.signerAddress = address;
        });
      });
    },
    register() {
      console.log("Registering with:");
      console.log(`  Public Key    :  ${this.pubkey} Bytes: ${(this.pubkey.length - 2) / 2}`);
      console.log(`  ID Commitment :  ${this.idCommitment} Bytes: ${(this.idCommitment.length - 2) / 2}`);
      console.log(`  Signature     :  ${this.signature} Bytes: ${(this.signature.length - 2) / 2}`);

      this.contract.register(this.pubkey, this.idCommitment, this.signature).then((tx: any) => {
        console.log("REGISTRATION TRANSACTION: " + tx.hash);
        this.registration = tx.hash;
      });
    },
    generate_random_key() {
      this.secretkey = this.bls.SecretKey.fromKeygen();
      this.privkey = hexlify(this.secretkey.toBytes());
    },
    generate_from_key() {
      this.secretkey = this.bls.SecretKey.fromHex(this.privkey);
    },
    generate_pubkey_and_sign() {
      if (this.secretkey) {
        console.log("Generating public key from secret key");
        this.pubkey = hexlify(this.secretkey.toPublicKey().toBytes());
        console.log("Generating signature from secret key and id commitment");
        this.signature = hexlify(this.secretkey.sign(hexlify(this.idCommitment)).toBytes());
      }
      else if (this.privkey) {
        try {
          console.log("Generating secretkey from private key");
          this.generate_from_key();
          console.log("Generating public key from private key");
          this.pubkey = hexlify(this.secretkey.toPublicKey().toBytes());

          console.log("Generating signature from secret key and id commitment");
          this.signature = hexlify(this.secretkey.sign(hexlify(this.idCommitment)).toBytes());
        }
        catch (e) {
          this.pubkey = "Couldn't generate keys from BLS Private Key, see console for error";
          console.log(e);
        }
      }
      else {
        this.pubkey = "couldn't generate pubkey without a private key being set";
      }
    },
    query_registration() {
      fetch('/api/v1/getRegistration/' + this.pubkey_query).then(response => response.json()).then(data => {
        this.verified[this.pubkey_query] = data;
      });
    },
    generate_idCommitment() {
      this.idCommitment = hexlify(this.identity.genIdentityCommitment())
    }
  },
  computed: {
    button_text(): string {
      if (this.signerAddress != null) {
        let txt = this.signerAddress.toString();
        return txt.split("").slice(0, 7).join("") + "...";
      } else {
        return "CONNECT";
      }
    },
    registration_disabled(): boolean {
      if (this.pubkey == null || this.idCommitment == null || this.signature == null) {
        return true;
      }
      else {
        return false;
      }
    },
    connected(): boolean {
      if (this.signerAddress != null) {
        return true;
      } else {
        return false;
      }
    },
  }
});

console.log("RLN Private Beacon Chain Validator Messaging App loaded");
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/images/eth-diamond-rainbow.png" height="24" alt="ETH2" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
        </ul>
        <span class="badge rounded-pill bg-secondary me-3">{{ network_name }}</span>
        <form class="d-flex">
          <button class="btn" @click.prevent="connect()">{{ button_text }}</button>
        </form>
      </div>
    </div>
  </nav>
  <main class="container-fluid main-container">
    <div class="top-section pt-5 pb-4 mb-5 text-center">
      <img class="d-block mx-auto mb-5" src="/images/eth-diamond-rainbow.png" height="120px" />
      <h2>Private message sharing for Beacon Chain Validators</h2>
      <p class="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
        maiores commodi voluptatem minus similique necessitatibus quis
        perferendis quisquam a provident debitis at magni esse illo aliquid.
        Atque repellat ratione et?
      </p>
    </div>

    <div class="row">
      <div class="left-col col-md-6">
        <h4 class="mb-3">Register</h4>
        <hr class="my-3" />
        <form>
          <div class="col-12 mb-3" id="privkey-wrapper">
            <label for="pubkey" class="form-label">
              BLS Private Key
              <span
                class="btn btn-sm ms-2"
                @click.prevent="generate_random_key"
                v-if="bls != null"
              >Generate Random Private Key</span>
              <span
                class="btn btn-sm ms-2"
                @click.prevent="generate_pubkey_and_sign"
                v-if="bls != null"
              >Generate Public Key & Signature</span>
            </label>
            <textarea
              type="text"
              class="form-control"
              id="privkey"
              placeholder="0x..."
              v-model="privkey"
            />
            <small>BLS private key of the ETH2 validator (32 bytes)</small>
          </div>

          <div class="col-12 mb-3" id="pubkey-wrapper">
            <label for="pubkey" class="form-label">Please Verify Your Public Key</label>
            <textarea
              type="text"
              class="form-control"
              id="pubkey"
              placeholder="0x..."
              maxlength="48"
              v-model="pubkey"
              disabled
            />
            <small>BLS public key of the ETH2 validator (48 bytes)</small>
          </div>

          <div class="col-12 mb-3" id="idCommitment-wrapper">
            <label for="idCommitment" class="form-label">Generated Identity Commitment</label>
            <textarea
              type="text"
              class="form-control"
              id="idCommitment"
              placeholder="0x..."
              maxlength="32"
              v-model="idCommitment"
              disabled
            />
            <small>Identity commitment of the ETH2 validator (32 bytes)</small>
          </div>

          <div class="col-12 mb-3" id="signature-wrapper">
            <label for="sig" class="form-label">Signature</label>
            <textarea
              type="text"
              class="form-control"
              id="signature"
              placeholder="0x..."
              maxlength="96"
              v-model="signature"
              disabled
            />
            <small>
              BLS signature of the Identity Commitment generated by the BLS
              private key (96 bytes)
            </small>
          </div>

          <button
            v-if="connected"
            class="w-100 btn btn-lg"
            :disabled="registration_disabled"
            @click.prevent="register()"
          >Register</button>
          <button v-else class="w-100 btn btn-lg" @click.prevent="connect">Connect to Metamask</button>
        </form>
        <div v-if="registration" class="registration">Registration Submitted @ tx {{ registration }}</div>
      </div>

      <div class="right-col col-md-6">
        <h4 class="mb-3">Query Registration Status</h4>
        <hr class="my-3" />
        <form>
          <div class="col-12 mb-3">
            <label for="pubkey" class="form-label">Public Key</label>
            <textarea
              type="text"
              class="form-control"
              id="pubkey_query"
              placeholder="0x..."
              maxlength="48"
              v-model="pubkey_query"
            />
            <div class="invalid-feedback">Please enter a valid public key.</div>
            <small>BLS public key of the ETH2 validator (48 bytes)</small>
          </div>

          <button class="w-100 btn btn-lg" @click.prevent="query_registration">Search</button>
        </form>
        <ul>
          <li v-for="(status, index) in verified">
            <span>{{ status }}</span>
          </li>
        </ul>
      </div>
    </div>
  </main>

  <footer class="my-5 pt-2 text-muted text-center text-small">
    <p class="mb-1">© 2022 AtHeartEngineer on behalf of The Ethereum Foundation</p>
    <ul class="list-inline">
      <li class="list-inline-item">
        <a href="https://github.com/AtHeartEngineering/rln-validator-messaging">Github</a>
      </li>
      <li class="list-inline-item">
        <a href="https://github.com/AtHeartEngineering/rln-validator-messaging/issues">Issues</a>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
main {
  max-width: min(80rem, 100%);
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-section {
  border-bottom: 2px solid var(--divider);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.description {
  max-width: min(50rem, 100%);
  margin: 1.5rem auto 1rem;
  font-size: 1.25rem;
  font-weight: 400;
}
.left-col,
.right-col {
  --bs-gutter-x: 4.5rem;
  padding-block: 0.5rem;
}

.row {
  width: 100%;
}

.left-col {
  border-right: 1px solid var(--divider);
}

.right-col {
  border-left: 1px solid var(--divider);
}

.bg-dark {
  --bs-bg-opacity: 0 !important;
}
.navbar .container-fluid {
  --bs-gutter-x: 2rem;
}

.registration {
  word-wrap: anywhere;
  font-size: 0.9rem;
  padding: 1rem;
  color: white;
}
</style>


<style>
/* Global Styles */

/* Global Variables */
:root {
  --gray: rgb(34, 34, 34);
  --gray-light: rgba(242, 242, 242, 0.6);
  --white: rgb(242, 242, 242);
  --green: #88d848;
  --green-light: #bdff88;
  --blue: #5a9ded;
  --blue-light: #53d3e0;
  --blue-very-light: #a7f6ff;
  --violet: #9198e5;
  --violet-light: #b4bbff;
  --mauve: #cc71c2;
  --pink: #e66465;
  --pink-light: #ff9c92;
  --sunset: #ff7575;
  --sunset-light: #ffb585;
  --yellow: #ffe94d;
  --yellow-light: #fff397;
  --divider: #ff7575cc;

  --btnbg: rgba(0, 0, 0, 0)
    linear-gradient(
      49.21deg,
      rgba(127, 127, 213, 0.3) 19.87%,
      rgba(134, 168, 231, 0.3) 58.46%,
      rgba(145, 234, 228, 0.3) 97.05%
    )
    repeat scroll 0% 0%;
  --btnbg-hover: rgba(0, 0, 0, 0)
    linear-gradient(
      49.21deg,
      rgba(127, 127, 213, 0.5) 19.87%,
      rgba(134, 168, 231, 0.5) 58.46%,
      rgba(145, 234, 228, 0.5) 97.05%
    )
    repeat scroll 0% 0%;
}

body,
html {
  background-color: var(--gray) !important;
  color: var(--white) !important;
  font-family: "Roboto", sans-serif;
}

small {
  color: var(--gray-light);
}

a {
  color: var(--sunset-light) !important;
  text-decoration: none !important;
}

a:hover {
  color: var(--pink-light) !important;
  text-decoration: underline;
}

h1,
h2,
h3,
h4 {
  color: var(--blue-very-light);
  text-transform: capitalize;
  letter-spacing: 0.125rem;
}

hr {
  color: var(--white) !important;
}

label {
  text-transform: capitalize;
}

.btn {
  color: var(--white) !important;
  text-shadow: 0px 0px 16px black;
  font-weight: 500 !important;
  letter-spacing: 0.25rem;
  background: var(--btnbg);
  border: 2px solid rgba(134, 168, 231, 0.2) !important;
}
.btn:hover {
  background: var(--btnbg-hover);
}

.btn-sm {
  font-size: 0.75rem;
  letter-spacing: 0;
}
</style>