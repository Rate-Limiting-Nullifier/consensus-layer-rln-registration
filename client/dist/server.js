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
const slashed_1 = __importDefault(__webpack_require__(/*! ./routes/slashed */ "./client/src/routes/slashed.ts"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
/**
 * @description The client uses Express for the REST API and for the frontend.
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
// Routes
app.use('/', root_1.default);
app.use('/api/v1/getRegistration', registration_1.default);
app.use('/api/v1/getSlashedMembers', slashed_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`⚡️Server is running at https://localhost:${PORT}`);
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzdELElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMsQ0FBQztBQUVILHFCQUFlLGFBQWE7Ozs7Ozs7Ozs7O0FDZjVCOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vY2xpZW50L3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3JlZ2lzdHJhdGlvbi50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3Jvb3QudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9jbGllbnQvc3JjL3JvdXRlcy9zbGFzaGVkLnRzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL2V4dGVybmFsIGNvbW1vbmpzIFwiY29yc1wiIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL2V4dGVybmFsIGNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IHJvb3RSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcm9vdCc7XG5pbXBvcnQgcmVnaXN0cmF0aW9uUm91dGVyIGZyb20gJy4vcm91dGVzL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgcmVnaXN0ZXJSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcmVnaXN0ZXInO1xuaW1wb3J0IHNsYXNoZWRSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvc2xhc2hlZCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGUgY2xpZW50IHVzZXMgRXhwcmVzcyBmb3IgdGhlIFJFU1QgQVBJIGFuZCBmb3IgdGhlIGZyb250ZW5kLlxuICogQGF1dGhvciBBdEhlYXJ0RW5naW5lZXJcbiAqIEBzaW5jZSAyMDIxLTAxLTAxXG4gKi9cblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgUE9SVCA9IDI2MDE7XG5cbi8vIENPUlMgT3B0aW9ucyBmb3IgdXNlIGluIEV4cHJlc3NcbmNvbnN0IGFsbG93ZWRPcmlnaW5zID0gW2BodHRwOi8vbG9jYWxob3N0OntQT1JUfWBdO1xuY29uc3Qgb3B0aW9uczogY29ycy5Db3JzT3B0aW9ucyA9IHtcbiAgICBvcmlnaW46IGFsbG93ZWRPcmlnaW5zXG59O1xuXG4vLyBJbml0aWFsaXppbmcgbWlkZGxld2FyZSB0byBlbmFibGUgQ09SUyBhbmQganNvblxuYXBwLnVzZShjb3JzKG9wdGlvbnMpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuXG4vLyBTZXJ2ZXMgc3RhdGljIGZpbGVzIG91dCBvZiBwdWJsaWMgZm9sZGVyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMvJykpKTtcblxuLy8gUm91dGVzXG5hcHAudXNlKCcvJywgcm9vdFJvdXRlcik7XG5hcHAudXNlKCcvYXBpL3YxL2dldFJlZ2lzdHJhdGlvbicsIHJlZ2lzdHJhdGlvblJvdXRlcik7XG5hcHAudXNlKCcvYXBpL3YxL2dldFNsYXNoZWRNZW1iZXJzJywgc2xhc2hlZFJvdXRlcik7XG5cbi8vIFN0YXJ0IHNlcnZlclxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYOKaoe+4j1NlcnZlciBpcyBydW5uaW5nIGF0IGh0dHBzOi8vbG9jYWxob3N0OiR7UE9SVH1gKTtcbn0pOyIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuY29uc3QgcmVnaXN0cmF0aW9uUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuXG5yZWdpc3RyYXRpb25Sb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHJlcy5zZW5kKGBUaGlzIGZ1bmN0aW9uIGlzIG5vdCB5ZXQgc3VwcG9ydGVkLCBwbGVhc2UgdXNlIC9yZWdpc3RyeS86cHVibGlja2V5YCk7XG59KTtcblxucmVnaXN0cmF0aW9uUm91dGVyLmdldCgnLzpwdWJsaWNrZXknLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHB1YmxpY2tleSA9IHJlcS5wYXJhbXMucHVibGlja2V5O1xuICAgIHJlcy5qc29uKHsgUmVnaXN0cnlfUHVia2V5OiBwdWJsaWNrZXkgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0cmF0aW9uUm91dGVyIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IHJvb3RSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb290Um91dGVyLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYy9pbmRleC5odG1sJykpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSb3V0ZXIiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmNvbnN0IHNsYXNoZWRSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbnNsYXNoZWRSb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHJlcy5zZW5kKGBUaGlzIGZ1bmN0aW9uIGlzIG5vdCB5ZXQgc3VwcG9ydGVkYCk7XG59KTtcblxuc2xhc2hlZFJvdXRlci5nZXQoJy86cHVibGlja2V5JywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIGxldCBwdWJsaWNrZXkgPSByZXEucGFyYW1zLnB1YmxpY2tleTtcbiAgICByZXMuanNvbih7IFJlZ2lzdHJ5X1B1YmtleTogcHVibGlja2V5IH0pO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNsYXNoZWRSb3V0ZXIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jbGllbnQvc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9