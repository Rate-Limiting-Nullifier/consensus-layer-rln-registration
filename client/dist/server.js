/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/index.ts":
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const root_1 = __importDefault(__webpack_require__(/*! ./routes/root */ "./client/src/routes/root.ts"));
const registration_1 = __importDefault(__webpack_require__(/*! ./routes/registration */ "./client/src/routes/registration.ts"));
const register_1 = __importDefault(__webpack_require__(/*! ./routes/register */ "./client/src/routes/register.ts"));
const slashed_1 = __importDefault(__webpack_require__(/*! ./routes/slashed */ "./client/src/routes/slashed.ts"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const registration_2 = __importDefault(__webpack_require__(/*! ./lib/registration */ "./client/src/lib/registration.ts"));
/**
 * @description The client uses Express for the REST API and for the frontend.
 * @author AtHeartEngineer
 * @since 2021-01-01
 */
const app = (0, express_1.default)();
const PORT = 8000;
// CORS Options for use in Express
const allowedOrigins = [`http://localhost:{PORT}`];
const options = {
    origin: allowedOrigins
};
// Initializing middleware to enable CORS and json
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
// Serves static files out of public folder
app.use(express_1.default.static(path_1.default.join(__dirname, 'public/')));
// Routes
app.use('/', root_1.default);
app.use('/api/v1/register', register_1.default);
app.use('/api/v1/getRegistration', registration_1.default);
app.use('/api/v1/getSlashedMembers', slashed_1.default);
console.log(registration_2.default);
registration_2.default.on('Registered', (pubkey, idCommitment, signature) => {
    console.log("Registered Public Key: " + pubkey);
    console.log("Registered ID Commitment: " + idCommitment);
    console.log("Registered Signature: " + signature);
});
// Start server
app.listen(PORT, () => {
    console.log(`⚡️Server is running at https://localhost:${PORT}`);
});


/***/ }),

/***/ "./client/src/lib/registration.ts":
/*!****************************************!*\
  !*** ./client/src/lib/registration.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ethers_1 = __webpack_require__(/*! ethers */ "ethers");
const RegistryContract = __importStar(__webpack_require__(/*! ../../../artifacts/contracts/RLN_Registry.sol/Registry.json */ "./artifacts/contracts/RLN_Registry.sol/Registry.json"));
const contract_address_json_1 = __importDefault(__webpack_require__(/*! ../../../artifacts/contract_address.json */ "./artifacts/contract_address.json"));
const registryContract = new ethers_1.ethers.Contract(contract_address_json_1.default['hardhat'], RegistryContract.abi, new ethers_1.ethers.providers.JsonRpcProvider());
exports["default"] = registryContract;


/***/ }),

/***/ "./client/src/lib/rln.ts":
/*!*******************************!*\
  !*** ./client/src/lib/rln.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var ValidatorStatus;
(function (ValidatorStatus) {
    ValidatorStatus[ValidatorStatus["NOT_REGISTERED"] = 0] = "NOT_REGISTERED";
    ValidatorStatus[ValidatorStatus["REGISTERED"] = 1] = "REGISTERED";
    ValidatorStatus[ValidatorStatus["BANNED"] = 2] = "BANNED";
})(ValidatorStatus || (ValidatorStatus = {}));
class RlnRegistrationEntry {
    constructor(pubkey, idCommitment, signature) {
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
    validate() {
        throw new Error("Not implemented");
        this.validated = true;
    }
}
exports["default"] = RlnRegistrationEntry;


/***/ }),

/***/ "./client/src/routes/register.ts":
/*!***************************************!*\
  !*** ./client/src/routes/register.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const rln_1 = __importDefault(__webpack_require__(/*! ../lib/rln */ "./client/src/lib/rln.ts"));
const registerRouter = express_1.default.Router();
registerRouter.get('/', (req, res) => {
    res.send(`Am I registered?`);
});
registerRouter.post('/', (req, res) => {
    const pubkey = req.query.pubkey;
    const idCommitment = req.query.idCommitment;
    const signature = req.query.signature;
    if (pubkey && idCommitment && signature) {
        if (pubkey.length == 48 && idCommitment.length == 32 && signature.length == 96) {
            let newRegistration = new rln_1.default(pubkey, idCommitment, signature);
            res.json(newRegistration);
        }
    }
});
exports["default"] = registerRouter;


/***/ }),

/***/ "./client/src/routes/registration.ts":
/*!*******************************************!*\
  !*** ./client/src/routes/registration.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const registrationRouter = express_1.default.Router();
registrationRouter.get('/', (req, res) => {
    res.send(`This function is not yet supported, please use /registry/:publickey`);
});
registrationRouter.get('/:publickey', (req, res) => {
    let publickey = req.params.publickey;
    res.json({ Registry_Pubkey: publickey });
});
exports["default"] = registrationRouter;


/***/ }),

/***/ "./client/src/routes/root.ts":
/*!***********************************!*\
  !*** ./client/src/routes/root.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const rootRouter = express_1.default.Router();
rootRouter.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public/index.html'));
});
exports["default"] = rootRouter;


/***/ }),

/***/ "./client/src/routes/slashed.ts":
/*!**************************************!*\
  !*** ./client/src/routes/slashed.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const slashedRouter = express_1.default.Router();
slashedRouter.get('/', (req, res) => {
    res.send(`This function is not yet supported`);
});
slashedRouter.get('/:publickey', (req, res) => {
    let publickey = req.params.publickey;
    res.json({ Registry_Pubkey: publickey });
});
exports["default"] = slashedRouter;


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "ethers":
/*!*************************!*\
  !*** external "ethers" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("ethers");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "./artifacts/contract_address.json":
/*!*****************************************!*\
  !*** ./artifacts/contract_address.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"hardhat":"0xe59dB376105aB195F1C8Ba770BB735aEC1384c4f"}');

/***/ }),

/***/ "./artifacts/contracts/RLN_Registry.sol/Registry.json":
/*!************************************************************!*\
  !*** ./artifacts/contracts/RLN_Registry.sol/Registry.json ***!
  \************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"_format":"hh-sol-artifact-1","contractName":"Registry","sourceName":"contracts/RLN_Registry.sol","abi":[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"pubkey","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"idCommitment","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"signature","type":"bytes"}],"name":"Registered","type":"event"},{"inputs":[{"internalType":"bytes","name":"pubkey","type":"bytes"},{"internalType":"bytes","name":"idCommitment","type":"bytes"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"}],"bytecode":"0x608060405234801561001057600080fd5b50610537806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063d438035314610030575b600080fd5b61004a600480360381019061004591906101d6565b61004c565b005b60308686905014610092576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100899061030d565b60405180910390fd5b602084849050146100d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100cf9061039f565b60405180910390fd5b6060828290501461011e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161011590610431565b60405180910390fd5b7f26b563134db20ec50fefb93d7f1660d9d2ce36e56f04d6e9650fe5ae0668c935868686868686604051610157969594939291906104af565b60405180910390a1505050505050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f84011261019657610195610171565b5b8235905067ffffffffffffffff8111156101b3576101b2610176565b5b6020830191508360018202830111156101cf576101ce61017b565b5b9250929050565b600080600080600080606087890312156101f3576101f2610167565b5b600087013567ffffffffffffffff8111156102115761021061016c565b5b61021d89828a01610180565b9650965050602087013567ffffffffffffffff8111156102405761023f61016c565b5b61024c89828a01610180565b9450945050604087013567ffffffffffffffff81111561026f5761026e61016c565b5b61027b89828a01610180565b92509250509295509295509295565b600082825260208201905092915050565b7f526567697374726174696f6e204572726f723a207075626b6579206c656e677460008201527f682073686f756c64206265203438206279746573000000000000000000000000602082015250565b60006102f760348361028a565b91506103028261029b565b604082019050919050565b60006020820190508181036000830152610326816102ea565b9050919050565b7f526567697374726174696f6e204572726f723a206964436f6d6d69746d656e7460008201527f206c656e6774682073686f756c64206265203332206279746573000000000000602082015250565b6000610389603a8361028a565b91506103948261032d565b604082019050919050565b600060208201905081810360008301526103b88161037c565b9050919050565b7f526567697374726174696f6e204572726f723a207369676e6174757265206c6560008201527f6e6774682073686f756c64206265203936206279746573000000000000000000602082015250565b600061041b60378361028a565b9150610426826103bf565b604082019050919050565b6000602082019050818103600083015261044a8161040e565b9050919050565b600082825260208201905092915050565b82818337600083830152505050565b6000601f19601f8301169050919050565b600061048e8385610451565b935061049b838584610462565b6104a483610471565b840190509392505050565b600060608201905081810360008301526104ca81888a610482565b905081810360208301526104df818688610482565b905081810360408301526104f4818486610482565b905097965050505050505056fea26469706673582212200b1d4e584f3f9abc374ae4033143e2b25f8bbeaba1ca5cc86fd83bf967fc5df764736f6c634300080b0033","deployedBytecode":"0x608060405234801561001057600080fd5b506004361061002b5760003560e01c8063d438035314610030575b600080fd5b61004a600480360381019061004591906101d6565b61004c565b005b60308686905014610092576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100899061030d565b60405180910390fd5b602084849050146100d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100cf9061039f565b60405180910390fd5b6060828290501461011e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161011590610431565b60405180910390fd5b7f26b563134db20ec50fefb93d7f1660d9d2ce36e56f04d6e9650fe5ae0668c935868686868686604051610157969594939291906104af565b60405180910390a1505050505050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f84011261019657610195610171565b5b8235905067ffffffffffffffff8111156101b3576101b2610176565b5b6020830191508360018202830111156101cf576101ce61017b565b5b9250929050565b600080600080600080606087890312156101f3576101f2610167565b5b600087013567ffffffffffffffff8111156102115761021061016c565b5b61021d89828a01610180565b9650965050602087013567ffffffffffffffff8111156102405761023f61016c565b5b61024c89828a01610180565b9450945050604087013567ffffffffffffffff81111561026f5761026e61016c565b5b61027b89828a01610180565b92509250509295509295509295565b600082825260208201905092915050565b7f526567697374726174696f6e204572726f723a207075626b6579206c656e677460008201527f682073686f756c64206265203438206279746573000000000000000000000000602082015250565b60006102f760348361028a565b91506103028261029b565b604082019050919050565b60006020820190508181036000830152610326816102ea565b9050919050565b7f526567697374726174696f6e204572726f723a206964436f6d6d69746d656e7460008201527f206c656e6774682073686f756c64206265203332206279746573000000000000602082015250565b6000610389603a8361028a565b91506103948261032d565b604082019050919050565b600060208201905081810360008301526103b88161037c565b9050919050565b7f526567697374726174696f6e204572726f723a207369676e6174757265206c6560008201527f6e6774682073686f756c64206265203936206279746573000000000000000000602082015250565b600061041b60378361028a565b9150610426826103bf565b604082019050919050565b6000602082019050818103600083015261044a8161040e565b9050919050565b600082825260208201905092915050565b82818337600083830152505050565b6000601f19601f8301169050919050565b600061048e8385610451565b935061049b838584610462565b6104a483610471565b840190509392505050565b600060608201905081810360008301526104ca81888a610482565b905081810360208301526104df818688610482565b905081810360408301526104f4818486610482565b905097965050505050505056fea26469706673582212200b1d4e584f3f9abc374ae4033143e2b25f8bbeaba1ca5cc86fd83bf967fc5df764736f6c634300080b0033","linkReferences":{},"deployedLinkReferences":{}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./client/src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLE1BQU0sRUFBRSxDQUFDO0FBR3ZDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ25ELEdBQUcsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUMsQ0FBQztBQUVILGFBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzdELElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMsQ0FBQztBQUVILHFCQUFlLGFBQWE7Ozs7Ozs7Ozs7O0FDZjVCOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9jbGllbnQvc3JjL2xpYi9yZWdpc3RyYXRpb24udHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9jbGllbnQvc3JjL2xpYi9ybG4udHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9jbGllbnQvc3JjL3JvdXRlcy9yZWdpc3Rlci50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3JlZ2lzdHJhdGlvbi50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3Jvb3QudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9jbGllbnQvc3JjL3JvdXRlcy9zbGFzaGVkLnRzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL2V4dGVybmFsIGNvbW1vbmpzIFwiY29yc1wiIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL2V4dGVybmFsIGNvbW1vbmpzIFwiZXRoZXJzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgcm9vdFJvdXRlciBmcm9tICcuL3JvdXRlcy9yb290JztcbmltcG9ydCByZWdpc3RyYXRpb25Sb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcmVnaXN0cmF0aW9uJztcbmltcG9ydCByZWdpc3RlclJvdXRlciBmcm9tICcuL3JvdXRlcy9yZWdpc3Rlcic7XG5pbXBvcnQgc2xhc2hlZFJvdXRlciBmcm9tICcuL3JvdXRlcy9zbGFzaGVkJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHJlZ2lzdHJ5Q29udHJhY3QgZnJvbSAnLi9saWIvcmVnaXN0cmF0aW9uJztcblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGUgY2xpZW50IHVzZXMgRXhwcmVzcyBmb3IgdGhlIFJFU1QgQVBJIGFuZCBmb3IgdGhlIGZyb250ZW5kLlxuICogQGF1dGhvciBBdEhlYXJ0RW5naW5lZXJcbiAqIEBzaW5jZSAyMDIxLTAxLTAxXG4gKi9cblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgUE9SVCA9IDgwMDA7XG5cbi8vIENPUlMgT3B0aW9ucyBmb3IgdXNlIGluIEV4cHJlc3NcbmNvbnN0IGFsbG93ZWRPcmlnaW5zID0gW2BodHRwOi8vbG9jYWxob3N0OntQT1JUfWBdO1xuY29uc3Qgb3B0aW9uczogY29ycy5Db3JzT3B0aW9ucyA9IHtcbiAgICBvcmlnaW46IGFsbG93ZWRPcmlnaW5zXG59O1xuXG4vLyBJbml0aWFsaXppbmcgbWlkZGxld2FyZSB0byBlbmFibGUgQ09SUyBhbmQganNvblxuYXBwLnVzZShjb3JzKG9wdGlvbnMpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuXG4vLyBTZXJ2ZXMgc3RhdGljIGZpbGVzIG91dCBvZiBwdWJsaWMgZm9sZGVyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMvJykpKTtcblxuLy8gUm91dGVzXG5hcHAudXNlKCcvJywgcm9vdFJvdXRlcik7XG5hcHAudXNlKCcvYXBpL3YxL3JlZ2lzdGVyJywgcmVnaXN0ZXJSb3V0ZXIpO1xuYXBwLnVzZSgnL2FwaS92MS9nZXRSZWdpc3RyYXRpb24nLCByZWdpc3RyYXRpb25Sb3V0ZXIpO1xuYXBwLnVzZSgnL2FwaS92MS9nZXRTbGFzaGVkTWVtYmVycycsIHNsYXNoZWRSb3V0ZXIpO1xuXG5jb25zb2xlLmxvZyhyZWdpc3RyeUNvbnRyYWN0KTtcblxucmVnaXN0cnlDb250cmFjdC5vbignUmVnaXN0ZXJlZCcsIChwdWJrZXksIGlkQ29tbWl0bWVudCwgc2lnbmF0dXJlKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJSZWdpc3RlcmVkIFB1YmxpYyBLZXk6IFwiICsgcHVia2V5KTtcbiAgICBjb25zb2xlLmxvZyhcIlJlZ2lzdGVyZWQgSUQgQ29tbWl0bWVudDogXCIgKyBpZENvbW1pdG1lbnQpO1xuICAgIGNvbnNvbGUubG9nKFwiUmVnaXN0ZXJlZCBTaWduYXR1cmU6IFwiICsgc2lnbmF0dXJlKTtcbn0pO1xuXG4vLyBTdGFydCBzZXJ2ZXJcbmFwcC5saXN0ZW4oUE9SVCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGDimqHvuI9TZXJ2ZXIgaXMgcnVubmluZyBhdCBodHRwczovL2xvY2FsaG9zdDoke1BPUlR9YCk7XG59KTsiLCJpbXBvcnQgeyBldGhlcnMgfSBmcm9tICdldGhlcnMnXG5cbmltcG9ydCAqIGFzIFJlZ2lzdHJ5Q29udHJhY3QgZnJvbSAnLi4vLi4vLi4vYXJ0aWZhY3RzL2NvbnRyYWN0cy9STE5fUmVnaXN0cnkuc29sL1JlZ2lzdHJ5Lmpzb24nXG5cbmltcG9ydCBDb250cmFjdEFkZHJlc3MgZnJvbSAnLi4vLi4vLi4vYXJ0aWZhY3RzL2NvbnRyYWN0X2FkZHJlc3MuanNvbidcblxuY29uc3QgcmVnaXN0cnlDb250cmFjdCA9IG5ldyBldGhlcnMuQ29udHJhY3QoQ29udHJhY3RBZGRyZXNzWydoYXJkaGF0J10sIFJlZ2lzdHJ5Q29udHJhY3QuYWJpLCBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIoKSlcblxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0cnlDb250cmFjdCIsImltcG9ydCB7IFJMTiB9IGZyb20gXCJAemsta2l0L3Byb3RvY29sc1wiO1xuXG5lbnVtIFZhbGlkYXRvclN0YXR1cyB7XG4gICAgTk9UX1JFR0lTVEVSRUQsXG4gICAgUkVHSVNURVJFRCxcbiAgICBCQU5ORURcbn1cblxuZXhwb3J0IGludGVyZmFjZSBwdWJrZXkgeyB9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJsblJlZ2lzdHJhdGlvbkVudHJ5IHtcbiAgICBwdWJrZXk6IHN0cmluZztcbiAgICBpZENvbW1pdG1lbnQ6IHN0cmluZztcbiAgICBzaWduYXR1cmU6IHN0cmluZztcbiAgICB2YWxpZGF0ZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJrZXk6IHN0cmluZywgaWRDb21taXRtZW50OiBzdHJpbmcsIHNpZ25hdHVyZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChwdWJrZXkubGVuZ3RoID09IDQ4ICYmIGlkQ29tbWl0bWVudC5sZW5ndGggPT0gMzIgJiYgc2lnbmF0dXJlLmxlbmd0aCA9PSA5Nikge1xuICAgICAgICAgICAgdGhpcy5wdWJrZXkgPSBwdWJrZXk7XG4gICAgICAgICAgICB0aGlzLmlkQ29tbWl0bWVudCA9IGlkQ29tbWl0bWVudDtcbiAgICAgICAgICAgIHRoaXMuc2lnbmF0dXJlID0gc2lnbmF0dXJlO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmVnaXN0cmF0aW9uIGVudHJ5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuXG59IiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IFJsblJlZ2lzdHJhdGlvbkVudHJ5IGZyb20gJy4uL2xpYi9ybG4nO1xuXG5jb25zdCByZWdpc3RlclJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cblxuXG5yZWdpc3RlclJvdXRlci5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzLnNlbmQoYEFtIEkgcmVnaXN0ZXJlZD9gKTtcbn0pO1xuXG5yZWdpc3RlclJvdXRlci5wb3N0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHB1YmtleSA9IHJlcS5xdWVyeS5wdWJrZXlcbiAgICBjb25zdCBpZENvbW1pdG1lbnQgPSByZXEucXVlcnkuaWRDb21taXRtZW50XG4gICAgY29uc3Qgc2lnbmF0dXJlID0gcmVxLnF1ZXJ5LnNpZ25hdHVyZVxuXG4gICAgaWYgKHB1YmtleSAmJiBpZENvbW1pdG1lbnQgJiYgc2lnbmF0dXJlKSB7XG4gICAgICAgIGlmIChwdWJrZXkubGVuZ3RoID09IDQ4ICYmIGlkQ29tbWl0bWVudC5sZW5ndGggPT0gMzIgJiYgc2lnbmF0dXJlLmxlbmd0aCA9PSA5Nikge1xuICAgICAgICAgICAgbGV0IG5ld1JlZ2lzdHJhdGlvbiA9IG5ldyBSbG5SZWdpc3RyYXRpb25FbnRyeShcbiAgICAgICAgICAgICAgICBwdWJrZXkgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIGlkQ29tbWl0bWVudCBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgc2lnbmF0dXJlIGFzIHN0cmluZyxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJlcy5qc29uKG5ld1JlZ2lzdHJhdGlvbilcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByZWdpc3RlclJvdXRlciIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuY29uc3QgcmVnaXN0cmF0aW9uUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuXG5yZWdpc3RyYXRpb25Sb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHJlcy5zZW5kKGBUaGlzIGZ1bmN0aW9uIGlzIG5vdCB5ZXQgc3VwcG9ydGVkLCBwbGVhc2UgdXNlIC9yZWdpc3RyeS86cHVibGlja2V5YCk7XG59KTtcblxucmVnaXN0cmF0aW9uUm91dGVyLmdldCgnLzpwdWJsaWNrZXknLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHB1YmxpY2tleSA9IHJlcS5wYXJhbXMucHVibGlja2V5O1xuICAgIHJlcy5qc29uKHsgUmVnaXN0cnlfUHVia2V5OiBwdWJsaWNrZXkgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0cmF0aW9uUm91dGVyIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IHJvb3RSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb290Um91dGVyLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYy9pbmRleC5odG1sJykpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSb3V0ZXIiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmNvbnN0IHNsYXNoZWRSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbnNsYXNoZWRSb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHJlcy5zZW5kKGBUaGlzIGZ1bmN0aW9uIGlzIG5vdCB5ZXQgc3VwcG9ydGVkYCk7XG59KTtcblxuc2xhc2hlZFJvdXRlci5nZXQoJy86cHVibGlja2V5JywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGxldCBwdWJsaWNrZXkgPSByZXEucGFyYW1zLnB1YmxpY2tleTtcbiAgICByZXMuanNvbih7IFJlZ2lzdHJ5X1B1YmtleTogcHVibGlja2V5IH0pO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNsYXNoZWRSb3V0ZXIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV0aGVyc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY2xpZW50L3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==