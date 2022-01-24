/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/lib/rln.ts":
/*!*******************************!*\
  !*** ./client/src/lib/rln.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ValidatorStatus;
(function (ValidatorStatus) {
    ValidatorStatus[ValidatorStatus["NOT_REGISTERED"] = 0] = "NOT_REGISTERED";
    ValidatorStatus[ValidatorStatus["REGISTERED"] = 1] = "REGISTERED";
    ValidatorStatus[ValidatorStatus["BANNEDa"] = 2] = "BANNEDa";
})(ValidatorStatus || (ValidatorStatus = {}));
class RlnRegistrationEntry {
    pubkey;
    idCommitment;
    signature;
    validated;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RlnRegistrationEntry);


/***/ }),

/***/ "./client/src/routes/register.ts":
/*!***************************************!*\
  !*** ./client/src/routes/register.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_rln__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/rln */ "./client/src/lib/rln.ts");


const registerRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
registerRouter.get('/', (req, res) => {
    res.send(`Am I registered?`);
});
registerRouter.post('/', (req, res) => {
    const pubkey = req.query.pubkey;
    const idCommitment = req.query.idCommitment;
    const signature = req.query.signature;
    if (pubkey && idCommitment && signature) {
        if (pubkey.length == 48 && idCommitment.length == 32 && signature.length == 96) {
            let newRegistration = new _lib_rln__WEBPACK_IMPORTED_MODULE_1__["default"](pubkey, idCommitment, signature);
            res.json(newRegistration);
        }
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registerRouter);


/***/ }),

/***/ "./client/src/routes/registration.ts":
/*!*******************************************!*\
  !*** ./client/src/routes/registration.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);

const registrationRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
registrationRouter.get('/', (req, res) => {
    res.send(`This function is not yet supported, please use /registry/:publickey`);
});
registrationRouter.get('/:publickey', (req, res) => {
    let publickey = req.params.publickey;
    res.json({ Registry_Pubkey: publickey });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (registrationRouter);


/***/ }),

/***/ "./client/src/routes/root.ts":
/*!***********************************!*\
  !*** ./client/src/routes/root.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


const rootRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
rootRouter.get('/', (req, res) => {
    res.sendFile(path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, 'public/index.html'));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootRouter);


/***/ }),

/***/ "./client/src/routes/slashed.ts":
/*!**************************************!*\
  !*** ./client/src/routes/slashed.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);

const slashedRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
slashedRouter.get('/', (req, res) => {
    res.send(`This function is not yet supported`);
});
slashedRouter.get('/:publickey', (req, res) => {
    let publickey = req.params.publickey;
    res.json({ Registry_Pubkey: publickey });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slashedRouter);


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes_root__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/root */ "./client/src/routes/root.ts");
/* harmony import */ var _routes_registration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/registration */ "./client/src/routes/registration.ts");
/* harmony import */ var _routes_register__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/register */ "./client/src/routes/register.ts");
/* harmony import */ var _routes_slashed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/slashed */ "./client/src/routes/slashed.ts");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);







/**
 * @description The client uses Express for the REST API and for the frontend.
 * @author AtHeartEngineer
 * @since 2021-01-01
 */
const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
const PORT = 8000;
// CORS Options for use in Express
const allowedOrigins = [`http://localhost:{PORT}`];
const options = {
    origin: allowedOrigins
};
// Initializing middleware to enable CORS and json
app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()(options));
app.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());
// Serves static files out of public folder
app.use(express__WEBPACK_IMPORTED_MODULE_0___default()["static"](path__WEBPACK_IMPORTED_MODULE_6___default().join(__dirname, 'public/')));
// Routes
app.use('/', _routes_root__WEBPACK_IMPORTED_MODULE_2__["default"]);
app.use('/api/v1/register', _routes_register__WEBPACK_IMPORTED_MODULE_4__["default"]);
app.use('/api/v1/getRegistration', _routes_registration__WEBPACK_IMPORTED_MODULE_3__["default"]);
app.use('/api/v1/getSlashedMembers', _routes_slashed__WEBPACK_IMPORTED_MODULE_5__["default"]);
// Start server
app.listen(PORT, () => {
    console.log(`⚡️Server is running at https://localhost:${PORT}`);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDcEUsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvbGliL3Jsbi50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3JlZ2lzdGVyLnRzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vY2xpZW50L3NyYy9yb3V0ZXMvcmVnaXN0cmF0aW9uLnRzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vY2xpZW50L3NyYy9yb3V0ZXMvcm9vdC50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3NsYXNoZWQudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5lbnVtIFZhbGlkYXRvclN0YXR1cyB7XG4gICAgTk9UX1JFR0lTVEVSRUQsXG4gICAgUkVHSVNURVJFRCxcbiAgICBCQU5ORURhXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgcHVia2V5IHsgfVxuXG5jbGFzcyBSbG5SZWdpc3RyYXRpb25FbnRyeSB7XG4gICAgcHVia2V5OiBzdHJpbmc7XG4gICAgaWRDb21taXRtZW50OiBzdHJpbmc7XG4gICAgc2lnbmF0dXJlOiBzdHJpbmc7XG4gICAgdmFsaWRhdGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVia2V5OiBzdHJpbmcsIGlkQ29tbWl0bWVudDogc3RyaW5nLCBzaWduYXR1cmU6IHN0cmluZykge1xuICAgICAgICBpZiAocHVia2V5Lmxlbmd0aCA9PSA0OCAmJiBpZENvbW1pdG1lbnQubGVuZ3RoID09IDMyICYmIHNpZ25hdHVyZS5sZW5ndGggPT0gOTYpIHtcbiAgICAgICAgICAgIHRoaXMucHVia2V5ID0gcHVia2V5O1xuICAgICAgICAgICAgdGhpcy5pZENvbW1pdG1lbnQgPSBpZENvbW1pdG1lbnQ7XG4gICAgICAgICAgICB0aGlzLnNpZ25hdHVyZSA9IHNpZ25hdHVyZTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlZ2lzdHJhdGlvbiBlbnRyeVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKCk6IHZvaWQge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSbG5SZWdpc3RyYXRpb25FbnRyeTsiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgUmxuUmVnaXN0cmF0aW9uRW50cnkgZnJvbSAnLi4vbGliL3Jsbic7XG5cbmNvbnN0IHJlZ2lzdGVyUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuXG5cbnJlZ2lzdGVyUm91dGVyLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2VuZChgQW0gSSByZWdpc3RlcmVkP2ApO1xufSk7XG5cbnJlZ2lzdGVyUm91dGVyLnBvc3QoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgY29uc3QgcHVia2V5ID0gcmVxLnF1ZXJ5LnB1YmtleVxuICAgIGNvbnN0IGlkQ29tbWl0bWVudCA9IHJlcS5xdWVyeS5pZENvbW1pdG1lbnRcbiAgICBjb25zdCBzaWduYXR1cmUgPSByZXEucXVlcnkuc2lnbmF0dXJlXG5cbiAgICBpZiAocHVia2V5ICYmIGlkQ29tbWl0bWVudCAmJiBzaWduYXR1cmUpIHtcbiAgICAgICAgaWYgKHB1YmtleS5sZW5ndGggPT0gNDggJiYgaWRDb21taXRtZW50Lmxlbmd0aCA9PSAzMiAmJiBzaWduYXR1cmUubGVuZ3RoID09IDk2KSB7XG4gICAgICAgICAgICBsZXQgbmV3UmVnaXN0cmF0aW9uID0gbmV3IFJsblJlZ2lzdHJhdGlvbkVudHJ5KFxuICAgICAgICAgICAgICAgIHB1YmtleSBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgaWRDb21taXRtZW50IGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICBzaWduYXR1cmUgYXMgc3RyaW5nLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmVzLmpzb24obmV3UmVnaXN0cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyUm91dGVyIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5jb25zdCByZWdpc3RyYXRpb25Sb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5cbnJlZ2lzdHJhdGlvblJvdXRlci5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzLnNlbmQoYFRoaXMgZnVuY3Rpb24gaXMgbm90IHlldCBzdXBwb3J0ZWQsIHBsZWFzZSB1c2UgL3JlZ2lzdHJ5LzpwdWJsaWNrZXlgKTtcbn0pO1xuXG5yZWdpc3RyYXRpb25Sb3V0ZXIuZ2V0KCcvOnB1YmxpY2tleScsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICBsZXQgcHVibGlja2V5ID0gcmVxLnBhcmFtcy5wdWJsaWNrZXk7XG4gICAgcmVzLmpzb24oeyBSZWdpc3RyeV9QdWJrZXk6IHB1YmxpY2tleSB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByZWdpc3RyYXRpb25Sb3V0ZXIiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3Qgcm9vdFJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnJvb3RSb3V0ZXIuZ2V0KCcvJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xuICAgIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljL2luZGV4Lmh0bWwnKSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJvdXRlciIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcblxuY29uc3Qgc2xhc2hlZFJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cblxuc2xhc2hlZFJvdXRlci5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzLnNlbmQoYFRoaXMgZnVuY3Rpb24gaXMgbm90IHlldCBzdXBwb3J0ZWRgKTtcbn0pO1xuXG5zbGFzaGVkUm91dGVyLmdldCgnLzpwdWJsaWNrZXknLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgbGV0IHB1YmxpY2tleSA9IHJlcS5wYXJhbXMucHVibGlja2V5O1xuICAgIHJlcy5qc29uKHsgUmVnaXN0cnlfUHVia2V5OiBwdWJsaWNrZXkgfSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc2xhc2hlZFJvdXRlciIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IHJvb3RSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcm9vdCc7XG5pbXBvcnQgcmVnaXN0cmF0aW9uUm91dGVyIGZyb20gJy4vcm91dGVzL3JlZ2lzdHJhdGlvbic7XG5pbXBvcnQgcmVnaXN0ZXJSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcmVnaXN0ZXInO1xuaW1wb3J0IHNsYXNoZWRSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvc2xhc2hlZCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gVGhlIGNsaWVudCB1c2VzIEV4cHJlc3MgZm9yIHRoZSBSRVNUIEFQSSBhbmQgZm9yIHRoZSBmcm9udGVuZC5cbiAqIEBhdXRob3IgQXRIZWFydEVuZ2luZWVyXG4gKiBAc2luY2UgMjAyMS0wMS0wMVxuICovXG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IFBPUlQgPSA4MDAwO1xuXG4vLyBDT1JTIE9wdGlvbnMgZm9yIHVzZSBpbiBFeHByZXNzXG5jb25zdCBhbGxvd2VkT3JpZ2lucyA9IFtgaHR0cDovL2xvY2FsaG9zdDp7UE9SVH1gXTtcbmNvbnN0IG9wdGlvbnM6IGNvcnMuQ29yc09wdGlvbnMgPSB7XG4gICAgb3JpZ2luOiBhbGxvd2VkT3JpZ2luc1xufTtcblxuLy8gSW5pdGlhbGl6aW5nIG1pZGRsZXdhcmUgdG8gZW5hYmxlIENPUlMgYW5kIGpzb25cbmFwcC51c2UoY29ycyhvcHRpb25zKSk7XG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcblxuLy8gU2VydmVzIHN0YXRpYyBmaWxlcyBvdXQgb2YgcHVibGljIGZvbGRlclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljLycpKSk7XG5cbi8vIFJvdXRlc1xuYXBwLnVzZSgnLycsIHJvb3RSb3V0ZXIpO1xuYXBwLnVzZSgnL2FwaS92MS9yZWdpc3RlcicsIHJlZ2lzdGVyUm91dGVyKTtcbmFwcC51c2UoJy9hcGkvdjEvZ2V0UmVnaXN0cmF0aW9uJywgcmVnaXN0cmF0aW9uUm91dGVyKTtcbmFwcC51c2UoJy9hcGkvdjEvZ2V0U2xhc2hlZE1lbWJlcnMnLCBzbGFzaGVkUm91dGVyKTtcblxuLy8gU3RhcnQgc2VydmVyXG5hcHAubGlzdGVuKFBPUlQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhg4pqh77iPU2VydmVyIGlzIHJ1bm5pbmcgYXQgaHR0cHM6Ly9sb2NhbGhvc3Q6JHtQT1JUfWApO1xufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9