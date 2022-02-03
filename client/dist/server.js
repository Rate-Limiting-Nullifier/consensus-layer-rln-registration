/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/lib/graphql.ts":
/*!***********************************!*\
  !*** ./client/src/lib/graphql.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const graphql_request_1 = __webpack_require__(/*! graphql-request */ "graphql-request");
class QueryGraph {
    constructor(endpoint) {
        this.client = new graphql_request_1.GraphQLClient(endpoint, {});
    }
    async getRegistration(pubkey) {
        let query = (0, graphql_request_1.gql) `
            {
                registrationEntities(where: {pubkey_contains: "${pubkey}"}) {
                    id
                    pubkey
                    idCommitment
                    signature
                }
            }
        `;
        return await this.client.request(query);
    }
    async getAllRegistrations() {
        let query = (0, graphql_request_1.gql) `
        {
            registrationEntities(first: 5) {
              id
              pubkey
              idCommitment
              signature
            }
          }
        `;
        return await this.client.request(query);
    }
}
exports["default"] = QueryGraph;


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
const graphql_1 = __importDefault(__webpack_require__(/*! ../lib/graphql */ "./client/src/lib/graphql.ts"));
const config_json_1 = __importDefault(__webpack_require__(/*! ../../../config.json */ "./config.json"));
const network = config_json_1.default['default_network'];
const subgraph_endpoint = config_json_1.default['network'][network]['subgraph_endpoint'];
const registrationRouter = express_1.default.Router();
const graphclient = new graphql_1.default(subgraph_endpoint);
registrationRouter.get('/', (req, res) => {
    res.send(`This function is not supported, please use /registry/{publickey}`);
});
registrationRouter.get('/:publickey', (req, res) => {
    graphclient.getRegistration(req.params.publickey).then((_registration_status) => {
        res.json({ "Registered": _registration_status.registrationEntities[0] });
    });
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

/***/ "./client/src/server.ts":
/*!******************************!*\
  !*** ./client/src/server.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const root_1 = __importDefault(__webpack_require__(/*! ./routes/root */ "./client/src/routes/root.ts"));
const registration_1 = __importDefault(__webpack_require__(/*! ./routes/registration */ "./client/src/routes/registration.ts"));
const slashed_1 = __importDefault(__webpack_require__(/*! ./routes/slashed */ "./client/src/routes/slashed.ts"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
/**
 * @description The client uses Express for the REST API and to serve the frontend.
 * @author AtHeartEngineer
 * @since 2021-01-01
 */
const app = (0, express_1.default)();
const PORT = 2601;
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
// Route - Serves the frontend index.html
app.use('/', root_1.default);
// Route - Rest API to get a single registration by public key
app.use('/api/v1/getRegistration', registration_1.default);
// Route - Rest API to check if a registred public key is slashed, not yet implemented
app.use('/api/v1/getSlashedMembers', slashed_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`⚡️Server is running at https://localhost:${PORT}`);
});
// Export our app for testing purposes
exports["default"] = app;


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "graphql-request":
/*!**********************************!*\
  !*** external "graphql-request" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/***/ ((module) => {

module.exports = JSON.parse('{"network":{"4":{"name":"rinkeby","subgraph_endpoint":"https://api.studio.thegraph.com/query/20474/rln-registry/v0.0.1"},"31337":{"name":"hardhat","subgraph_endpoint":"http://localhost:8000"}},"default_network":"4"}');

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/src/server.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQyxDQUFDO0FBRUgsc0NBQXNDO0FBQ3RDLHFCQUFlLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7QUNoRG5COzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vY2xpZW50L3NyYy9saWIvZ3JhcGhxbC50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3JlZ2lzdHJhdGlvbi50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3Jvb3QudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9jbGllbnQvc3JjL3JvdXRlcy9zbGFzaGVkLnRzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vY2xpZW50L3NyYy9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJncmFwaHFsLXJlcXVlc3RcIiIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci9leHRlcm5hbCBjb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBHcmFwaFFMQ2xpZW50LCBncWwgfSBmcm9tICdncmFwaHFsLXJlcXVlc3QnXG5cbmNsYXNzIFF1ZXJ5R3JhcGgge1xuICAgIHByaXZhdGUgY2xpZW50OiBHcmFwaFFMQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3IoZW5kcG9pbnQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNsaWVudCA9IG5ldyBHcmFwaFFMQ2xpZW50KGVuZHBvaW50LCB7fSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UmVnaXN0cmF0aW9uKHB1YmtleTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZ3FsYFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbkVudGl0aWVzKHdoZXJlOiB7cHVia2V5X2NvbnRhaW5zOiBcIiR7cHVia2V5fVwifSkge1xuICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICBwdWJrZXlcbiAgICAgICAgICAgICAgICAgICAgaWRDb21taXRtZW50XG4gICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2xpZW50LnJlcXVlc3QocXVlcnkpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldEFsbFJlZ2lzdHJhdGlvbnMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZ3FsYFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdpc3RyYXRpb25FbnRpdGllcyhmaXJzdDogNSkge1xuICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICBwdWJrZXlcbiAgICAgICAgICAgICAgaWRDb21taXRtZW50XG4gICAgICAgICAgICAgIHNpZ25hdHVyZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgYDtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuY2xpZW50LnJlcXVlc3QocXVlcnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVlcnlHcmFwaCIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBRdWVyeUdyYXBoIGZyb20gJy4uL2xpYi9ncmFwaHFsJztcblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi9jb25maWcuanNvbidcblxuY29uc3QgbmV0d29yayA9IGNvbmZpZ1snZGVmYXVsdF9uZXR3b3JrJ107XG5cbmNvbnN0IHN1YmdyYXBoX2VuZHBvaW50ID0gY29uZmlnWyduZXR3b3JrJ11bbmV0d29ya11bJ3N1YmdyYXBoX2VuZHBvaW50J107XG5cbmNvbnN0IHJlZ2lzdHJhdGlvblJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5jb25zdCBncmFwaGNsaWVudCA9IG5ldyBRdWVyeUdyYXBoKHN1YmdyYXBoX2VuZHBvaW50KTtcblxucmVnaXN0cmF0aW9uUm91dGVyLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2VuZChgVGhpcyBmdW5jdGlvbiBpcyBub3Qgc3VwcG9ydGVkLCBwbGVhc2UgdXNlIC9yZWdpc3RyeS97cHVibGlja2V5fWApO1xufSk7XG5cbnJlZ2lzdHJhdGlvblJvdXRlci5nZXQoJy86cHVibGlja2V5JywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGdyYXBoY2xpZW50LmdldFJlZ2lzdHJhdGlvbihyZXEucGFyYW1zLnB1YmxpY2tleSkudGhlbigoX3JlZ2lzdHJhdGlvbl9zdGF0dXMpID0+IHtcbiAgICAgICAgcmVzLmpzb24oeyBcIlJlZ2lzdGVyZWRcIjogX3JlZ2lzdHJhdGlvbl9zdGF0dXMucmVnaXN0cmF0aW9uRW50aXRpZXNbMF0gfSk7XG4gICAgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0cmF0aW9uUm91dGVyIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IHJvb3RSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb290Um91dGVyLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYy9pbmRleC5odG1sJykpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSb3V0ZXIiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmNvbnN0IHNsYXNoZWRSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbnNsYXNoZWRSb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHJlcy5zZW5kKGBUaGlzIGZ1bmN0aW9uIGlzIG5vdCB5ZXQgc3VwcG9ydGVkYCk7XG59KTtcblxuc2xhc2hlZFJvdXRlci5nZXQoJy86cHVibGlja2V5JywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGxldCBwdWJsaWNrZXkgPSByZXEucGFyYW1zLnB1YmxpY2tleTtcbiAgICByZXMuanNvbih7IFJlZ2lzdHJ5X1B1YmtleTogcHVibGlja2V5IH0pO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNsYXNoZWRSb3V0ZXIiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IHJvb3RSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcm9vdCc7XG5pbXBvcnQgcmVnaXN0cmF0aW9uUm91dGVyIGZyb20gJy4vcm91dGVzL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgcmVnaXN0ZXJSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcmVnaXN0ZXInO1xuaW1wb3J0IHNsYXNoZWRSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvc2xhc2hlZCc7XG5cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFRoZSBjbGllbnQgdXNlcyBFeHByZXNzIGZvciB0aGUgUkVTVCBBUEkgYW5kIHRvIHNlcnZlIHRoZSBmcm9udGVuZC5cbiAqIEBhdXRob3IgQXRIZWFydEVuZ2luZWVyXG4gKiBAc2luY2UgMjAyMS0wMS0wMVxuICovXG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IFBPUlQgPSAyNjAxO1xuXG4vLyBDT1JTIE9wdGlvbnMgZm9yIHVzZSBpbiBFeHByZXNzXG5jb25zdCBhbGxvd2VkT3JpZ2lucyA9IFtgaHR0cDovL2xvY2FsaG9zdDp7UE9SVH1gXTtcbmNvbnN0IG9wdGlvbnM6IGNvcnMuQ29yc09wdGlvbnMgPSB7XG4gICAgb3JpZ2luOiBhbGxvd2VkT3JpZ2luc1xufTtcblxuLy8gSW5pdGlhbGl6aW5nIG1pZGRsZXdhcmUgdG8gZW5hYmxlIENPUlMgYW5kIGpzb25cbmFwcC51c2UoY29ycyhvcHRpb25zKSk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcblxuLy8gU2VydmVzIHN0YXRpYyBmaWxlcyBvdXQgb2YgcHVibGljIGZvbGRlclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljLycpKSk7XG5cblxuLy8gUm91dGUgLSBTZXJ2ZXMgdGhlIGZyb250ZW5kIGluZGV4Lmh0bWxcbmFwcC51c2UoJy8nLCByb290Um91dGVyKTtcblxuLy8gUm91dGUgLSBSZXN0IEFQSSB0byBnZXQgYSBzaW5nbGUgcmVnaXN0cmF0aW9uIGJ5IHB1YmxpYyBrZXlcbmFwcC51c2UoJy9hcGkvdjEvZ2V0UmVnaXN0cmF0aW9uJywgcmVnaXN0cmF0aW9uUm91dGVyKTtcblxuLy8gUm91dGUgLSBSZXN0IEFQSSB0byBjaGVjayBpZiBhIHJlZ2lzdHJlZCBwdWJsaWMga2V5IGlzIHNsYXNoZWQsIG5vdCB5ZXQgaW1wbGVtZW50ZWRcbmFwcC51c2UoJy9hcGkvdjEvZ2V0U2xhc2hlZE1lbWJlcnMnLCBzbGFzaGVkUm91dGVyKTtcblxuLy8gU3RhcnQgc2VydmVyXG5hcHAubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhg4pqh77iPU2VydmVyIGlzIHJ1bm5pbmcgYXQgaHR0cHM6Ly9sb2NhbGhvc3Q6JHtQT1JUfWApO1xufSk7XG5cbi8vIEV4cG9ydCBvdXIgYXBwIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG5leHBvcnQgZGVmYXVsdCBhcHA7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdyYXBocWwtcmVxdWVzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NsaWVudC9zcmMvc2VydmVyLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9