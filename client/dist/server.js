/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/cross-fetch/dist/node-ponyfill.js":
/*!********************************************************!*\
  !*** ./node_modules/cross-fetch/dist/node-ponyfill.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {

const nodeFetch = __webpack_require__(/*! node-fetch */ "node-fetch")
const realFetch = nodeFetch.default || nodeFetch

const fetch = function (url, options) {
  // Support schemaless URIs on the server for parity with the browser.
  // Ex: //github.com/ -> https://github.com/
  if (/^\/\//.test(url)) {
    url = 'https:' + url
  }
  return realFetch.call(this, url, options)
}

fetch.ponyfill = true

module.exports = exports = fetch
exports.fetch = fetch
exports.Headers = nodeFetch.Headers
exports.Request = nodeFetch.Request
exports.Response = nodeFetch.Response

// Needed for TypeScript consumers without esModuleInterop.
exports["default"] = fetch


/***/ }),

/***/ "./node_modules/extract-files/public/ReactNativeFile.js":
/*!**************************************************************!*\
  !*** ./node_modules/extract-files/public/ReactNativeFile.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function ReactNativeFile(_ref) {
  var uri = _ref.uri,
    name = _ref.name,
    type = _ref.type;
  this.uri = uri;
  this.name = name;
  this.type = type;
};


/***/ }),

/***/ "./node_modules/extract-files/public/extractFiles.js":
/*!***********************************************************!*\
  !*** ./node_modules/extract-files/public/extractFiles.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var defaultIsExtractableFile = __webpack_require__(/*! ./isExtractableFile */ "./node_modules/extract-files/public/isExtractableFile.js");

module.exports = function extractFiles(value, path, isExtractableFile) {
  if (path === void 0) {
    path = '';
  }

  if (isExtractableFile === void 0) {
    isExtractableFile = defaultIsExtractableFile;
  }

  var clone;
  var files = new Map();

  function addFile(paths, file) {
    var storedPaths = files.get(file);
    if (storedPaths) storedPaths.push.apply(storedPaths, paths);
    else files.set(file, paths);
  }

  if (isExtractableFile(value)) {
    clone = null;
    addFile([path], value);
  } else {
    var prefix = path ? path + '.' : '';
    if (typeof FileList !== 'undefined' && value instanceof FileList)
      clone = Array.prototype.map.call(value, function (file, i) {
        addFile(['' + prefix + i], file);
        return null;
      });
    else if (Array.isArray(value))
      clone = value.map(function (child, i) {
        var result = extractFiles(child, '' + prefix + i, isExtractableFile);
        result.files.forEach(addFile);
        return result.clone;
      });
    else if (value && value.constructor === Object) {
      clone = {};

      for (var i in value) {
        var result = extractFiles(value[i], '' + prefix + i, isExtractableFile);
        result.files.forEach(addFile);
        clone[i] = result.clone;
      }
    } else clone = value;
  }

  return {
    clone: clone,
    files: files,
  };
};


/***/ }),

/***/ "./node_modules/extract-files/public/index.js":
/*!****************************************************!*\
  !*** ./node_modules/extract-files/public/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.ReactNativeFile = __webpack_require__(/*! ./ReactNativeFile */ "./node_modules/extract-files/public/ReactNativeFile.js");
exports.extractFiles = __webpack_require__(/*! ./extractFiles */ "./node_modules/extract-files/public/extractFiles.js");
exports.isExtractableFile = __webpack_require__(/*! ./isExtractableFile */ "./node_modules/extract-files/public/isExtractableFile.js");


/***/ }),

/***/ "./node_modules/extract-files/public/isExtractableFile.js":
/*!****************************************************************!*\
  !*** ./node_modules/extract-files/public/isExtractableFile.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ReactNativeFile = __webpack_require__(/*! ./ReactNativeFile */ "./node_modules/extract-files/public/ReactNativeFile.js");

module.exports = function isExtractableFile(value) {
  return (
    (typeof File !== 'undefined' && value instanceof File) ||
    (typeof Blob !== 'undefined' && value instanceof Blob) ||
    value instanceof ReactNativeFile
  );
};


/***/ }),

/***/ "./node_modules/graphql-request/dist/createRequestBody.js":
/*!****************************************************************!*\
  !*** ./node_modules/graphql-request/dist/createRequestBody.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var extract_files_1 = __webpack_require__(/*! extract-files */ "./node_modules/extract-files/public/index.js");
var form_data_1 = __importDefault(__webpack_require__(/*! form-data */ "form-data"));
/**
 * Duck type if NodeJS stream
 * https://github.com/sindresorhus/is-stream/blob/3750505b0727f6df54324784fe369365ef78841e/index.js#L3
 */
var isExtractableFileEnhanced = function (value) {
    return extract_files_1.isExtractableFile(value) ||
        (value !== null && typeof value === 'object' && typeof value.pipe === 'function');
};
/**
 * Returns Multipart Form if body contains files
 * (https://github.com/jaydenseric/graphql-multipart-request-spec)
 * Otherwise returns JSON
 */
function createRequestBody(query, variables, operationName) {
    var _a = extract_files_1.extractFiles({ query: query, variables: variables, operationName: operationName }, '', isExtractableFileEnhanced), clone = _a.clone, files = _a.files;
    if (files.size === 0) {
        if (!Array.isArray(query)) {
            return JSON.stringify(clone);
        }
        if (typeof variables !== 'undefined' && !Array.isArray(variables)) {
            throw new Error('Cannot create request body with given variable type, array expected');
        }
        // Batch support
        var payload = query.reduce(function (accu, currentQuery, index) {
            accu.push({ query: currentQuery, variables: variables ? variables[index] : undefined });
            return accu;
        }, []);
        return JSON.stringify(payload);
    }
    var Form = typeof FormData === 'undefined' ? form_data_1.default : FormData;
    var form = new Form();
    form.append('operations', JSON.stringify(clone));
    var map = {};
    var i = 0;
    files.forEach(function (paths) {
        map[++i] = paths;
    });
    form.append('map', JSON.stringify(map));
    i = 0;
    files.forEach(function (paths, file) {
        form.append("" + ++i, file);
    });
    return form;
}
exports["default"] = createRequestBody;
//# sourceMappingURL=createRequestBody.js.map

/***/ }),

/***/ "./node_modules/graphql-request/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/graphql-request/dist/index.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gql = exports.batchRequests = exports.request = exports.rawRequest = exports.GraphQLClient = exports.ClientError = void 0;
var cross_fetch_1 = __importStar(__webpack_require__(/*! cross-fetch */ "./node_modules/cross-fetch/dist/node-ponyfill.js")), CrossFetch = cross_fetch_1;
var printer_1 = __webpack_require__(/*! graphql/language/printer */ "graphql/language/printer");
var createRequestBody_1 = __importDefault(__webpack_require__(/*! ./createRequestBody */ "./node_modules/graphql-request/dist/createRequestBody.js"));
var parseArgs_1 = __webpack_require__(/*! ./parseArgs */ "./node_modules/graphql-request/dist/parseArgs.js");
var types_1 = __webpack_require__(/*! ./types */ "./node_modules/graphql-request/dist/types.js");
Object.defineProperty(exports, "ClientError", ({ enumerable: true, get: function () { return types_1.ClientError; } }));
/**
 * Convert the given headers configuration into a plain object.
 */
var resolveHeaders = function (headers) {
    var oHeaders = {};
    if (headers) {
        if ((typeof Headers !== 'undefined' && headers instanceof Headers) ||
            headers instanceof CrossFetch.Headers) {
            oHeaders = HeadersInstanceToPlainObject(headers);
        }
        else if (Array.isArray(headers)) {
            headers.forEach(function (_a) {
                var name = _a[0], value = _a[1];
                oHeaders[name] = value;
            });
        }
        else {
            oHeaders = headers;
        }
    }
    return oHeaders;
};
/**
 * Clean a GraphQL document to send it via a GET query
 *
 * @param {string} str GraphQL query
 * @returns {string} Cleaned query
 */
var queryCleanner = function (str) { return str.replace(/([\s,]|#[^\n\r]+)+/g, ' ').trim(); };
/**
 * Create query string for GraphQL request
 *
 * @param {object} param0 -
 *
 * @param {string|string[]} param0.query the GraphQL document or array of document if it's a batch request
 * @param {string|undefined} param0.operationName the GraphQL operation name
 * @param {any|any[]} param0.variables the GraphQL variables to use
 */
var buildGetQueryParams = function (_a) {
    var query = _a.query, variables = _a.variables, operationName = _a.operationName;
    if (!Array.isArray(query)) {
        var search = ["query=" + encodeURIComponent(queryCleanner(query))];
        if (variables) {
            search.push("variables=" + encodeURIComponent(JSON.stringify(variables)));
        }
        if (operationName) {
            search.push("operationName=" + encodeURIComponent(operationName));
        }
        return search.join('&');
    }
    if (typeof variables !== 'undefined' && !Array.isArray(variables)) {
        throw new Error('Cannot create query with given variable type, array expected');
    }
    // Batch support
    var payload = query.reduce(function (accu, currentQuery, index) {
        accu.push({
            query: queryCleanner(currentQuery),
            variables: variables ? JSON.stringify(variables[index]) : undefined,
        });
        return accu;
    }, []);
    return "query=" + encodeURIComponent(JSON.stringify(payload));
};
/**
 * Fetch data using POST method
 */
var post = function (_a) {
    var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions;
    return __awaiter(void 0, void 0, void 0, function () {
        var body;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = createRequestBody_1.default(query, variables, operationName);
                    return [4 /*yield*/, fetch(url, __assign({ method: 'POST', headers: __assign(__assign({}, (typeof body === 'string' ? { 'Content-Type': 'application/json' } : {})), headers), body: body }, fetchOptions))];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
/**
 * Fetch data using GET method
 */
var get = function (_a) {
    var url = _a.url, query = _a.query, variables = _a.variables, operationName = _a.operationName, headers = _a.headers, fetch = _a.fetch, fetchOptions = _a.fetchOptions;
    return __awaiter(void 0, void 0, void 0, function () {
        var queryParams;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queryParams = buildGetQueryParams({
                        query: query,
                        variables: variables,
                        operationName: operationName,
                    });
                    return [4 /*yield*/, fetch(url + "?" + queryParams, __assign({ method: 'GET', headers: headers }, fetchOptions))];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
/**
 * GraphQL Client.
 */
var GraphQLClient = /** @class */ (function () {
    function GraphQLClient(url, options) {
        this.url = url;
        this.options = options || {};
    }
    GraphQLClient.prototype.rawRequest = function (queryOrOptions, variables, requestHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var rawRequestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url;
            return __generator(this, function (_d) {
                rawRequestOptions = parseArgs_1.parseRawRequestArgs(queryOrOptions, variables, requestHeaders);
                _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                url = this.url;
                if (rawRequestOptions.signal !== undefined) {
                    fetchOptions.signal = rawRequestOptions.signal;
                }
                return [2 /*return*/, makeRequest({
                        url: url,
                        query: rawRequestOptions.query,
                        variables: rawRequestOptions.variables,
                        headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(rawRequestOptions.requestHeaders)),
                        operationName: undefined,
                        fetch: fetch,
                        method: method,
                        fetchOptions: fetchOptions,
                    })];
            });
        });
    };
    GraphQLClient.prototype.request = function (documentOrOptions, variables, requestHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url, _d, query, operationName, data;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        requestOptions = parseArgs_1.parseRequestArgs(documentOrOptions, variables, requestHeaders);
                        _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                        url = this.url;
                        if (requestOptions.signal !== undefined) {
                            fetchOptions.signal = requestOptions.signal;
                        }
                        _d = resolveRequestDocument(requestOptions.document), query = _d.query, operationName = _d.operationName;
                        return [4 /*yield*/, makeRequest({
                                url: url,
                                query: query,
                                variables: requestOptions.variables,
                                headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(requestOptions.requestHeaders)),
                                operationName: operationName,
                                fetch: fetch,
                                method: method,
                                fetchOptions: fetchOptions,
                            })];
                    case 1:
                        data = (_e.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GraphQLClient.prototype.batchRequests = function (documentsOrOptions, requestHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var batchRequestOptions, _a, headers, _b, fetch, _c, method, fetchOptions, url, queries, variables, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        batchRequestOptions = parseArgs_1.parseBatchRequestArgs(documentsOrOptions, requestHeaders);
                        _a = this.options, headers = _a.headers, _b = _a.fetch, fetch = _b === void 0 ? cross_fetch_1.default : _b, _c = _a.method, method = _c === void 0 ? 'POST' : _c, fetchOptions = __rest(_a, ["headers", "fetch", "method"]);
                        url = this.url;
                        if (batchRequestOptions.signal !== undefined) {
                            fetchOptions.signal = batchRequestOptions.signal;
                        }
                        queries = batchRequestOptions.documents.map(function (_a) {
                            var document = _a.document;
                            return resolveRequestDocument(document).query;
                        });
                        variables = batchRequestOptions.documents.map(function (_a) {
                            var variables = _a.variables;
                            return variables;
                        });
                        return [4 /*yield*/, makeRequest({
                                url: url,
                                query: queries,
                                variables: variables,
                                headers: __assign(__assign({}, resolveHeaders(headers)), resolveHeaders(batchRequestOptions.requestHeaders)),
                                operationName: undefined,
                                fetch: fetch,
                                method: method,
                                fetchOptions: fetchOptions,
                            })];
                    case 1:
                        data = (_d.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GraphQLClient.prototype.setHeaders = function (headers) {
        this.options.headers = headers;
        return this;
    };
    /**
     * Attach a header to the client. All subsequent requests will have this header.
     */
    GraphQLClient.prototype.setHeader = function (key, value) {
        var _a;
        var headers = this.options.headers;
        if (headers) {
            // todo what if headers is in nested array form... ?
            //@ts-ignore
            headers[key] = value;
        }
        else {
            this.options.headers = (_a = {}, _a[key] = value, _a);
        }
        return this;
    };
    /**
     * Change the client endpoint. All subsequent requests will send to this endpoint.
     */
    GraphQLClient.prototype.setEndpoint = function (value) {
        this.url = value;
        return this;
    };
    return GraphQLClient;
}());
exports.GraphQLClient = GraphQLClient;
function makeRequest(_a) {
    var url = _a.url, query = _a.query, variables = _a.variables, headers = _a.headers, operationName = _a.operationName, fetch = _a.fetch, _b = _a.method, method = _b === void 0 ? 'POST' : _b, fetchOptions = _a.fetchOptions;
    return __awaiter(this, void 0, void 0, function () {
        var fetcher, isBathchingQuery, response, result, successfullyReceivedData, headers_1, status_1, errorResult;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    fetcher = method.toUpperCase() === 'POST' ? post : get;
                    isBathchingQuery = Array.isArray(query);
                    return [4 /*yield*/, fetcher({
                            url: url,
                            query: query,
                            variables: variables,
                            operationName: operationName,
                            headers: headers,
                            fetch: fetch,
                            fetchOptions: fetchOptions,
                        })];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, getResult(response)];
                case 2:
                    result = _c.sent();
                    successfullyReceivedData = isBathchingQuery && Array.isArray(result) ? !result.some(function (_a) {
                        var data = _a.data;
                        return !data;
                    }) : !!result.data;
                    if (response.ok && !result.errors && successfullyReceivedData) {
                        headers_1 = response.headers, status_1 = response.status;
                        return [2 /*return*/, __assign(__assign({}, (isBathchingQuery ? { data: result } : result)), { headers: headers_1, status: status_1 })];
                    }
                    else {
                        errorResult = typeof result === 'string' ? { error: result } : result;
                        throw new types_1.ClientError(__assign(__assign({}, errorResult), { status: response.status, headers: response.headers }), { query: query, variables: variables });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function rawRequest(urlOrOptions, query, variables, requestHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var requestOptions, client;
        return __generator(this, function (_a) {
            requestOptions = parseArgs_1.parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders);
            client = new GraphQLClient(requestOptions.url);
            return [2 /*return*/, client.rawRequest(__assign({}, requestOptions))];
        });
    });
}
exports.rawRequest = rawRequest;
function request(urlOrOptions, document, variables, requestHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var requestOptions, client;
        return __generator(this, function (_a) {
            requestOptions = parseArgs_1.parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders);
            client = new GraphQLClient(requestOptions.url);
            return [2 /*return*/, client.request(__assign({}, requestOptions))];
        });
    });
}
exports.request = request;
function batchRequests(urlOrOptions, documents, requestHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var requestOptions, client;
        return __generator(this, function (_a) {
            requestOptions = parseArgs_1.parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders);
            client = new GraphQLClient(requestOptions.url);
            return [2 /*return*/, client.batchRequests(__assign({}, requestOptions))];
        });
    });
}
exports.batchRequests = batchRequests;
exports["default"] = request;
/**
 * todo
 */
function getResult(response) {
    var contentType = response.headers.get('Content-Type');
    if (contentType && contentType.startsWith('application/json')) {
        return response.json();
    }
    else {
        return response.text();
    }
}
/**
 * helpers
 */
function resolveRequestDocument(document) {
    var _a;
    if (typeof document === 'string')
        return { query: document };
    var operationName = undefined;
    var operationDefinitions = document.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; });
    if (operationDefinitions.length === 1) {
        operationName = (_a = operationDefinitions[0].name) === null || _a === void 0 ? void 0 : _a.value;
    }
    return { query: printer_1.print(document), operationName: operationName };
}
/**
 * Convenience passthrough template tag to get the benefits of tooling for the gql template tag. This does not actually parse the input into a GraphQL DocumentNode like graphql-tag package does. It just returns the string with any variables given interpolated. Can save you a bit of performance and having to install another package.
 *
 * @example
 *
 * import { gql } from 'graphql-request'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 *
 * @remarks
 *
 * Several tools in the Node GraphQL ecosystem are hardcoded to specially treat any template tag named "gql". For example see this prettier issue: https://github.com/prettier/prettier/issues/4360. Using this template tag has no runtime effect beyond variable interpolation.
 */
function gql(chunks) {
    var variables = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        variables[_i - 1] = arguments[_i];
    }
    return chunks.reduce(function (accumulator, chunk, index) { return "" + accumulator + chunk + (index in variables ? variables[index] : ''); }, '');
}
exports.gql = gql;
/**
 * Convert Headers instance into regular object
 */
function HeadersInstanceToPlainObject(headers) {
    var o = {};
    headers.forEach(function (v, k) {
        o[k] = v;
    });
    return o;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/graphql-request/dist/parseArgs.js":
/*!********************************************************!*\
  !*** ./node_modules/graphql-request/dist/parseArgs.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseBatchRequestsExtendedArgs = exports.parseRawRequestExtendedArgs = exports.parseRequestExtendedArgs = exports.parseBatchRequestArgs = exports.parseRawRequestArgs = exports.parseRequestArgs = void 0;
function parseRequestArgs(documentOrOptions, variables, requestHeaders) {
    return documentOrOptions.document
        ? documentOrOptions
        : {
            document: documentOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRequestArgs = parseRequestArgs;
function parseRawRequestArgs(queryOrOptions, variables, requestHeaders) {
    return queryOrOptions.query
        ? queryOrOptions
        : {
            query: queryOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRawRequestArgs = parseRawRequestArgs;
function parseBatchRequestArgs(documentsOrOptions, requestHeaders) {
    return documentsOrOptions.documents
        ? documentsOrOptions
        : {
            documents: documentsOrOptions,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseBatchRequestArgs = parseBatchRequestArgs;
function parseRequestExtendedArgs(urlOrOptions, document, variables, requestHeaders) {
    return urlOrOptions.document
        ? urlOrOptions
        : {
            url: urlOrOptions,
            document: document,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRequestExtendedArgs = parseRequestExtendedArgs;
function parseRawRequestExtendedArgs(urlOrOptions, query, variables, requestHeaders) {
    return urlOrOptions.query
        ? urlOrOptions
        : {
            url: urlOrOptions,
            query: query,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseRawRequestExtendedArgs = parseRawRequestExtendedArgs;
function parseBatchRequestsExtendedArgs(urlOrOptions, documents, requestHeaders) {
    return urlOrOptions.documents
        ? urlOrOptions
        : {
            url: urlOrOptions,
            documents: documents,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
}
exports.parseBatchRequestsExtendedArgs = parseBatchRequestsExtendedArgs;
//# sourceMappingURL=parseArgs.js.map

/***/ }),

/***/ "./node_modules/graphql-request/dist/types.js":
/*!****************************************************!*\
  !*** ./node_modules/graphql-request/dist/types.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientError = void 0;
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    function ClientError(response, request) {
        var _this = this;
        var message = ClientError.extractMessage(response) + ": " + JSON.stringify({
            response: response,
            request: request,
        });
        _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ClientError.prototype);
        _this.response = response;
        _this.request = request;
        // this is needed as Safari doesn't support .captureStackTrace
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, ClientError);
        }
        return _this;
    }
    ClientError.extractMessage = function (response) {
        try {
            return response.errors[0].message;
        }
        catch (e) {
            return "GraphQL Error (Code: " + response.status + ")";
        }
    };
    return ClientError;
}(Error));
exports.ClientError = ClientError;
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./client/src/index.ts":
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

/***/ "./client/src/lib/graphql.ts":
/*!***********************************!*\
  !*** ./client/src/lib/graphql.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const graphql_request_1 = __webpack_require__(/*! graphql-request */ "./node_modules/graphql-request/dist/index.js");
class QueryGraph {
    constructor(endpoint) {
        this.client = new graphql_request_1.GraphQLClient(endpoint, {});
    }
    async getRegistration(pubkey) {
        let query = (0, graphql_request_1.gql) `
            {
                registrationEntities(first: 1, where: {pubkey: "${pubkey}"}) {
                    id
                    pubkey
                    idCommitment
                    signature
                }
            }
        `;
        console.log(query);
        let result = await this.client.request(query);
        console.log(result);
        return result;
    }
    async getAllRegistrations() {
        let query = (0, graphql_request_1.gql) `
        { registrationEntities() {
            id
            pubkey
            idCommitment
            signature
        }}
        `;
        console.log(query);
        let result = await this.client.request(query);
        console.log(result);
        return result;
    }
}
exports["default"] = QueryGraph;


/***/ }),

/***/ "./client/src/routes/registration.ts":
/*!*******************************************!*\
  !*** ./client/src/routes/registration.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const graphql_1 = __importDefault(__webpack_require__(/*! ../lib/graphql */ "./client/src/lib/graphql.ts"));
const url = "https://gateway.thegraph.com/api/<API_KEY>/subgraphs/id/QmUqfarx8ejgCTUegukNtf67N8FgLtfeCUpeaXftTiRAHe";
const registrationRouter = express_1.default.Router();
const graphclient = new graphql_1.default('https://api.studio.thegraph.com/query/20474/rln-registry/v0.0.1');
registrationRouter.get('/', (req, res) => {
    res.send(`This function is not yet supported, please use /registry/{publickey}`);
});
registrationRouter.get('/:publickey', (req, res) => {
    graphclient.getRegistration(req.params.publickey).then((_registration_status) => {
        res.json({ "Registered": _registration_status });
    });
});
exports["default"] = registrationRouter;


/***/ }),

/***/ "./client/src/routes/root.ts":
/*!***********************************!*\
  !*** ./client/src/routes/root.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

"use strict";

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

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("form-data");

/***/ }),

/***/ "graphql/language/printer":
/*!*******************************************!*\
  !*** external "graphql/language/printer" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("graphql/language/printer");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node-fetch");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMsQ0FBQztBQUVILHFCQUFlLGFBQWE7Ozs7Ozs7Ozs7OztBQ2Y1Qjs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vbm9kZV9tb2R1bGVzL2Nyb3NzLWZldGNoL2Rpc3Qvbm9kZS1wb255ZmlsbC5qcyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL25vZGVfbW9kdWxlcy9leHRyYWN0LWZpbGVzL3B1YmxpYy9SZWFjdE5hdGl2ZUZpbGUuanMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9ub2RlX21vZHVsZXMvZXh0cmFjdC1maWxlcy9wdWJsaWMvZXh0cmFjdEZpbGVzLmpzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vbm9kZV9tb2R1bGVzL2V4dHJhY3QtZmlsZXMvcHVibGljL2luZGV4LmpzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vbm9kZV9tb2R1bGVzL2V4dHJhY3QtZmlsZXMvcHVibGljL2lzRXh0cmFjdGFibGVGaWxlLmpzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vbm9kZV9tb2R1bGVzL2dyYXBocWwtcmVxdWVzdC9kaXN0L2NyZWF0ZVJlcXVlc3RCb2R5LmpzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vbm9kZV9tb2R1bGVzL2dyYXBocWwtcmVxdWVzdC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vbm9kZV9tb2R1bGVzL2dyYXBocWwtcmVxdWVzdC9kaXN0L3BhcnNlQXJncy5qcyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL25vZGVfbW9kdWxlcy9ncmFwaHFsLXJlcXVlc3QvZGlzdC90eXBlcy5qcyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvLi9jbGllbnQvc3JjL2xpYi9ncmFwaHFsLnRzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vY2xpZW50L3NyYy9yb3V0ZXMvcmVnaXN0cmF0aW9uLnRzIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyLy4vY2xpZW50L3NyYy9yb3V0ZXMvcm9vdC50cyIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci8uL2NsaWVudC9zcmMvcm91dGVzL3NsYXNoZWQudHMiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvZXh0ZXJuYWwgY29tbW9uanMgXCJmb3JtLWRhdGFcIiIsIndlYnBhY2s6Ly92YWxpZGF0b3JfcmxuX21lc3Nlbmdlci9leHRlcm5hbCBjb21tb25qcyBcImdyYXBocWwvbGFuZ3VhZ2UvcHJpbnRlclwiIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL2V4dGVybmFsIGNvbW1vbmpzIFwibm9kZS1mZXRjaFwiIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL2V4dGVybmFsIGNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmFsaWRhdG9yX3Jsbl9tZXNzZW5nZXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3ZhbGlkYXRvcl9ybG5fbWVzc2VuZ2VyL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBub2RlRmV0Y2ggPSByZXF1aXJlKCdub2RlLWZldGNoJylcbmNvbnN0IHJlYWxGZXRjaCA9IG5vZGVGZXRjaC5kZWZhdWx0IHx8IG5vZGVGZXRjaFxuXG5jb25zdCBmZXRjaCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgLy8gU3VwcG9ydCBzY2hlbWFsZXNzIFVSSXMgb24gdGhlIHNlcnZlciBmb3IgcGFyaXR5IHdpdGggdGhlIGJyb3dzZXIuXG4gIC8vIEV4OiAvL2dpdGh1Yi5jb20vIC0+IGh0dHBzOi8vZ2l0aHViLmNvbS9cbiAgaWYgKC9eXFwvXFwvLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSAnaHR0cHM6JyArIHVybFxuICB9XG4gIHJldHVybiByZWFsRmV0Y2guY2FsbCh0aGlzLCB1cmwsIG9wdGlvbnMpXG59XG5cbmZldGNoLnBvbnlmaWxsID0gdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmZXRjaFxuZXhwb3J0cy5mZXRjaCA9IGZldGNoXG5leHBvcnRzLkhlYWRlcnMgPSBub2RlRmV0Y2guSGVhZGVyc1xuZXhwb3J0cy5SZXF1ZXN0ID0gbm9kZUZldGNoLlJlcXVlc3RcbmV4cG9ydHMuUmVzcG9uc2UgPSBub2RlRmV0Y2guUmVzcG9uc2VcblxuLy8gTmVlZGVkIGZvciBUeXBlU2NyaXB0IGNvbnN1bWVycyB3aXRob3V0IGVzTW9kdWxlSW50ZXJvcC5cbmV4cG9ydHMuZGVmYXVsdCA9IGZldGNoXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gUmVhY3ROYXRpdmVGaWxlKF9yZWYpIHtcbiAgdmFyIHVyaSA9IF9yZWYudXJpLFxuICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgdHlwZSA9IF9yZWYudHlwZTtcbiAgdGhpcy51cmkgPSB1cmk7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdElzRXh0cmFjdGFibGVGaWxlID0gcmVxdWlyZSgnLi9pc0V4dHJhY3RhYmxlRmlsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dHJhY3RGaWxlcyh2YWx1ZSwgcGF0aCwgaXNFeHRyYWN0YWJsZUZpbGUpIHtcbiAgaWYgKHBhdGggPT09IHZvaWQgMCkge1xuICAgIHBhdGggPSAnJztcbiAgfVxuXG4gIGlmIChpc0V4dHJhY3RhYmxlRmlsZSA9PT0gdm9pZCAwKSB7XG4gICAgaXNFeHRyYWN0YWJsZUZpbGUgPSBkZWZhdWx0SXNFeHRyYWN0YWJsZUZpbGU7XG4gIH1cblxuICB2YXIgY2xvbmU7XG4gIHZhciBmaWxlcyA9IG5ldyBNYXAoKTtcblxuICBmdW5jdGlvbiBhZGRGaWxlKHBhdGhzLCBmaWxlKSB7XG4gICAgdmFyIHN0b3JlZFBhdGhzID0gZmlsZXMuZ2V0KGZpbGUpO1xuICAgIGlmIChzdG9yZWRQYXRocykgc3RvcmVkUGF0aHMucHVzaC5hcHBseShzdG9yZWRQYXRocywgcGF0aHMpO1xuICAgIGVsc2UgZmlsZXMuc2V0KGZpbGUsIHBhdGhzKTtcbiAgfVxuXG4gIGlmIChpc0V4dHJhY3RhYmxlRmlsZSh2YWx1ZSkpIHtcbiAgICBjbG9uZSA9IG51bGw7XG4gICAgYWRkRmlsZShbcGF0aF0sIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcHJlZml4ID0gcGF0aCA/IHBhdGggKyAnLicgOiAnJztcbiAgICBpZiAodHlwZW9mIEZpbGVMaXN0ICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGVMaXN0KVxuICAgICAgY2xvbmUgPSBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwodmFsdWUsIGZ1bmN0aW9uIChmaWxlLCBpKSB7XG4gICAgICAgIGFkZEZpbGUoWycnICsgcHJlZml4ICsgaV0sIGZpbGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pO1xuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgY2xvbmUgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKGNoaWxkLCBpKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBleHRyYWN0RmlsZXMoY2hpbGQsICcnICsgcHJlZml4ICsgaSwgaXNFeHRyYWN0YWJsZUZpbGUpO1xuICAgICAgICByZXN1bHQuZmlsZXMuZm9yRWFjaChhZGRGaWxlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jbG9uZTtcbiAgICAgIH0pO1xuICAgIGVsc2UgaWYgKHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgIGNsb25lID0ge307XG5cbiAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGV4dHJhY3RGaWxlcyh2YWx1ZVtpXSwgJycgKyBwcmVmaXggKyBpLCBpc0V4dHJhY3RhYmxlRmlsZSk7XG4gICAgICAgIHJlc3VsdC5maWxlcy5mb3JFYWNoKGFkZEZpbGUpO1xuICAgICAgICBjbG9uZVtpXSA9IHJlc3VsdC5jbG9uZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgY2xvbmUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2xvbmU6IGNsb25lLFxuICAgIGZpbGVzOiBmaWxlcyxcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuUmVhY3ROYXRpdmVGaWxlID0gcmVxdWlyZSgnLi9SZWFjdE5hdGl2ZUZpbGUnKTtcbmV4cG9ydHMuZXh0cmFjdEZpbGVzID0gcmVxdWlyZSgnLi9leHRyYWN0RmlsZXMnKTtcbmV4cG9ydHMuaXNFeHRyYWN0YWJsZUZpbGUgPSByZXF1aXJlKCcuL2lzRXh0cmFjdGFibGVGaWxlJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdE5hdGl2ZUZpbGUgPSByZXF1aXJlKCcuL1JlYWN0TmF0aXZlRmlsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzRXh0cmFjdGFibGVGaWxlKHZhbHVlKSB7XG4gIHJldHVybiAoXG4gICAgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHx8XG4gICAgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgdmFsdWUgaW5zdGFuY2VvZiBSZWFjdE5hdGl2ZUZpbGVcbiAgKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBleHRyYWN0X2ZpbGVzXzEgPSByZXF1aXJlKFwiZXh0cmFjdC1maWxlc1wiKTtcbnZhciBmb3JtX2RhdGFfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZm9ybS1kYXRhXCIpKTtcbi8qKlxuICogRHVjayB0eXBlIGlmIE5vZGVKUyBzdHJlYW1cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvaXMtc3RyZWFtL2Jsb2IvMzc1MDUwNWIwNzI3ZjZkZjU0MzI0Nzg0ZmUzNjkzNjVlZjc4ODQxZS9pbmRleC5qcyNMM1xuICovXG52YXIgaXNFeHRyYWN0YWJsZUZpbGVFbmhhbmNlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBleHRyYWN0X2ZpbGVzXzEuaXNFeHRyYWN0YWJsZUZpbGUodmFsdWUpIHx8XG4gICAgICAgICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZS5waXBlID09PSAnZnVuY3Rpb24nKTtcbn07XG4vKipcbiAqIFJldHVybnMgTXVsdGlwYXJ0IEZvcm0gaWYgYm9keSBjb250YWlucyBmaWxlc1xuICogKGh0dHBzOi8vZ2l0aHViLmNvbS9qYXlkZW5zZXJpYy9ncmFwaHFsLW11bHRpcGFydC1yZXF1ZXN0LXNwZWMpXG4gKiBPdGhlcndpc2UgcmV0dXJucyBKU09OXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3RCb2R5KHF1ZXJ5LCB2YXJpYWJsZXMsIG9wZXJhdGlvbk5hbWUpIHtcbiAgICB2YXIgX2EgPSBleHRyYWN0X2ZpbGVzXzEuZXh0cmFjdEZpbGVzKHsgcXVlcnk6IHF1ZXJ5LCB2YXJpYWJsZXM6IHZhcmlhYmxlcywgb3BlcmF0aW9uTmFtZTogb3BlcmF0aW9uTmFtZSB9LCAnJywgaXNFeHRyYWN0YWJsZUZpbGVFbmhhbmNlZCksIGNsb25lID0gX2EuY2xvbmUsIGZpbGVzID0gX2EuZmlsZXM7XG4gICAgaWYgKGZpbGVzLnNpemUgPT09IDApIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHF1ZXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNsb25lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhcmlhYmxlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgIUFycmF5LmlzQXJyYXkodmFyaWFibGVzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIHJlcXVlc3QgYm9keSB3aXRoIGdpdmVuIHZhcmlhYmxlIHR5cGUsIGFycmF5IGV4cGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQmF0Y2ggc3VwcG9ydFxuICAgICAgICB2YXIgcGF5bG9hZCA9IHF1ZXJ5LnJlZHVjZShmdW5jdGlvbiAoYWNjdSwgY3VycmVudFF1ZXJ5LCBpbmRleCkge1xuICAgICAgICAgICAgYWNjdS5wdXNoKHsgcXVlcnk6IGN1cnJlbnRRdWVyeSwgdmFyaWFibGVzOiB2YXJpYWJsZXMgPyB2YXJpYWJsZXNbaW5kZXhdIDogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHBheWxvYWQpO1xuICAgIH1cbiAgICB2YXIgRm9ybSA9IHR5cGVvZiBGb3JtRGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyBmb3JtX2RhdGFfMS5kZWZhdWx0IDogRm9ybURhdGE7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybSgpO1xuICAgIGZvcm0uYXBwZW5kKCdvcGVyYXRpb25zJywgSlNPTi5zdHJpbmdpZnkoY2xvbmUpKTtcbiAgICB2YXIgbWFwID0ge307XG4gICAgdmFyIGkgPSAwO1xuICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKHBhdGhzKSB7XG4gICAgICAgIG1hcFsrK2ldID0gcGF0aHM7XG4gICAgfSk7XG4gICAgZm9ybS5hcHBlbmQoJ21hcCcsIEpTT04uc3RyaW5naWZ5KG1hcCkpO1xuICAgIGkgPSAwO1xuICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24gKHBhdGhzLCBmaWxlKSB7XG4gICAgICAgIGZvcm0uYXBwZW5kKFwiXCIgKyArK2ksIGZpbGUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmb3JtO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUmVxdWVzdEJvZHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGVSZXF1ZXN0Qm9keS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xufSk7XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdxbCA9IGV4cG9ydHMuYmF0Y2hSZXF1ZXN0cyA9IGV4cG9ydHMucmVxdWVzdCA9IGV4cG9ydHMucmF3UmVxdWVzdCA9IGV4cG9ydHMuR3JhcGhRTENsaWVudCA9IGV4cG9ydHMuQ2xpZW50RXJyb3IgPSB2b2lkIDA7XG52YXIgY3Jvc3NfZmV0Y2hfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiY3Jvc3MtZmV0Y2hcIikpLCBDcm9zc0ZldGNoID0gY3Jvc3NfZmV0Y2hfMTtcbnZhciBwcmludGVyXzEgPSByZXF1aXJlKFwiZ3JhcGhxbC9sYW5ndWFnZS9wcmludGVyXCIpO1xudmFyIGNyZWF0ZVJlcXVlc3RCb2R5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY3JlYXRlUmVxdWVzdEJvZHlcIikpO1xudmFyIHBhcnNlQXJnc18xID0gcmVxdWlyZShcIi4vcGFyc2VBcmdzXCIpO1xudmFyIHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNsaWVudEVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlc18xLkNsaWVudEVycm9yOyB9IH0pO1xuLyoqXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBoZWFkZXJzIGNvbmZpZ3VyYXRpb24gaW50byBhIHBsYWluIG9iamVjdC5cbiAqL1xudmFyIHJlc29sdmVIZWFkZXJzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgICB2YXIgb0hlYWRlcnMgPSB7fTtcbiAgICBpZiAoaGVhZGVycykge1xuICAgICAgICBpZiAoKHR5cGVvZiBIZWFkZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykgfHxcbiAgICAgICAgICAgIGhlYWRlcnMgaW5zdGFuY2VvZiBDcm9zc0ZldGNoLkhlYWRlcnMpIHtcbiAgICAgICAgICAgIG9IZWFkZXJzID0gSGVhZGVyc0luc3RhbmNlVG9QbGFpbk9iamVjdChoZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICAgICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICBvSGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvSGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9IZWFkZXJzO1xufTtcbi8qKlxuICogQ2xlYW4gYSBHcmFwaFFMIGRvY3VtZW50IHRvIHNlbmQgaXQgdmlhIGEgR0VUIHF1ZXJ5XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBHcmFwaFFMIHF1ZXJ5XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBDbGVhbmVkIHF1ZXJ5XG4gKi9cbnZhciBxdWVyeUNsZWFubmVyID0gZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gc3RyLnJlcGxhY2UoLyhbXFxzLF18I1teXFxuXFxyXSspKy9nLCAnICcpLnRyaW0oKTsgfTtcbi8qKlxuICogQ3JlYXRlIHF1ZXJ5IHN0cmluZyBmb3IgR3JhcGhRTCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtMCAtXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhcmFtMC5xdWVyeSB0aGUgR3JhcGhRTCBkb2N1bWVudCBvciBhcnJheSBvZiBkb2N1bWVudCBpZiBpdCdzIGEgYmF0Y2ggcmVxdWVzdFxuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBwYXJhbTAub3BlcmF0aW9uTmFtZSB0aGUgR3JhcGhRTCBvcGVyYXRpb24gbmFtZVxuICogQHBhcmFtIHthbnl8YW55W119IHBhcmFtMC52YXJpYWJsZXMgdGhlIEdyYXBoUUwgdmFyaWFibGVzIHRvIHVzZVxuICovXG52YXIgYnVpbGRHZXRRdWVyeVBhcmFtcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBxdWVyeSA9IF9hLnF1ZXJ5LCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIG9wZXJhdGlvbk5hbWUgPSBfYS5vcGVyYXRpb25OYW1lO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShxdWVyeSkpIHtcbiAgICAgICAgdmFyIHNlYXJjaCA9IFtcInF1ZXJ5PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5Q2xlYW5uZXIocXVlcnkpKV07XG4gICAgICAgIGlmICh2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIHNlYXJjaC5wdXNoKFwidmFyaWFibGVzPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHZhcmlhYmxlcykpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3BlcmF0aW9uTmFtZSkge1xuICAgICAgICAgICAgc2VhcmNoLnB1c2goXCJvcGVyYXRpb25OYW1lPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wZXJhdGlvbk5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VhcmNoLmpvaW4oJyYnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YXJpYWJsZXMgIT09ICd1bmRlZmluZWQnICYmICFBcnJheS5pc0FycmF5KHZhcmlhYmxlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIHF1ZXJ5IHdpdGggZ2l2ZW4gdmFyaWFibGUgdHlwZSwgYXJyYXkgZXhwZWN0ZWQnKTtcbiAgICB9XG4gICAgLy8gQmF0Y2ggc3VwcG9ydFxuICAgIHZhciBwYXlsb2FkID0gcXVlcnkucmVkdWNlKGZ1bmN0aW9uIChhY2N1LCBjdXJyZW50UXVlcnksIGluZGV4KSB7XG4gICAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgICAgICBxdWVyeTogcXVlcnlDbGVhbm5lcihjdXJyZW50UXVlcnkpLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMgPyBKU09OLnN0cmluZ2lmeSh2YXJpYWJsZXNbaW5kZXhdKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gXCJxdWVyeT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG59O1xuLyoqXG4gKiBGZXRjaCBkYXRhIHVzaW5nIFBPU1QgbWV0aG9kXG4gKi9cbnZhciBwb3N0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHVybCA9IF9hLnVybCwgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBvcGVyYXRpb25OYW1lID0gX2Eub3BlcmF0aW9uTmFtZSwgaGVhZGVycyA9IF9hLmhlYWRlcnMsIGZldGNoID0gX2EuZmV0Y2gsIGZldGNoT3B0aW9ucyA9IF9hLmZldGNoT3B0aW9ucztcbiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZHk7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBjcmVhdGVSZXF1ZXN0Qm9keV8xLmRlZmF1bHQocXVlcnksIHZhcmlhYmxlcywgb3BlcmF0aW9uTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKHVybCwgX19hc3NpZ24oeyBtZXRob2Q6ICdQT1NUJywgaGVhZGVyczogX19hc3NpZ24oX19hc3NpZ24oe30sICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycgPyB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSA6IHt9KSksIGhlYWRlcnMpLCBib2R5OiBib2R5IH0sIGZldGNoT3B0aW9ucykpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYi5zZW50KCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4vKipcbiAqIEZldGNoIGRhdGEgdXNpbmcgR0VUIG1ldGhvZFxuICovXG52YXIgZ2V0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHVybCA9IF9hLnVybCwgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBvcGVyYXRpb25OYW1lID0gX2Eub3BlcmF0aW9uTmFtZSwgaGVhZGVycyA9IF9hLmhlYWRlcnMsIGZldGNoID0gX2EuZmV0Y2gsIGZldGNoT3B0aW9ucyA9IF9hLmZldGNoT3B0aW9ucztcbiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcyA9IGJ1aWxkR2V0UXVlcnlQYXJhbXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBvcGVyYXRpb25OYW1lLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2godXJsICsgXCI/XCIgKyBxdWVyeVBhcmFtcywgX19hc3NpZ24oeyBtZXRob2Q6ICdHRVQnLCBoZWFkZXJzOiBoZWFkZXJzIH0sIGZldGNoT3B0aW9ucykpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYi5zZW50KCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4vKipcbiAqIEdyYXBoUUwgQ2xpZW50LlxuICovXG52YXIgR3JhcGhRTENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcmFwaFFMQ2xpZW50KHVybCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB9XG4gICAgR3JhcGhRTENsaWVudC5wcm90b3R5cGUucmF3UmVxdWVzdCA9IGZ1bmN0aW9uIChxdWVyeU9yT3B0aW9ucywgdmFyaWFibGVzLCByZXF1ZXN0SGVhZGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmF3UmVxdWVzdE9wdGlvbnMsIF9hLCBoZWFkZXJzLCBfYiwgZmV0Y2gsIF9jLCBtZXRob2QsIGZldGNoT3B0aW9ucywgdXJsO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3RPcHRpb25zID0gcGFyc2VBcmdzXzEucGFyc2VSYXdSZXF1ZXN0QXJncyhxdWVyeU9yT3B0aW9ucywgdmFyaWFibGVzLCByZXF1ZXN0SGVhZGVycyk7XG4gICAgICAgICAgICAgICAgX2EgPSB0aGlzLm9wdGlvbnMsIGhlYWRlcnMgPSBfYS5oZWFkZXJzLCBfYiA9IF9hLmZldGNoLCBmZXRjaCA9IF9iID09PSB2b2lkIDAgPyBjcm9zc19mZXRjaF8xLmRlZmF1bHQgOiBfYiwgX2MgPSBfYS5tZXRob2QsIG1ldGhvZCA9IF9jID09PSB2b2lkIDAgPyAnUE9TVCcgOiBfYywgZmV0Y2hPcHRpb25zID0gX19yZXN0KF9hLCBbXCJoZWFkZXJzXCIsIFwiZmV0Y2hcIiwgXCJtZXRob2RcIl0pO1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMudXJsO1xuICAgICAgICAgICAgICAgIGlmIChyYXdSZXF1ZXN0T3B0aW9ucy5zaWduYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaE9wdGlvbnMuc2lnbmFsID0gcmF3UmVxdWVzdE9wdGlvbnMuc2lnbmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbWFrZVJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogcmF3UmVxdWVzdE9wdGlvbnMucXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHJhd1JlcXVlc3RPcHRpb25zLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNvbHZlSGVhZGVycyhoZWFkZXJzKSksIHJlc29sdmVIZWFkZXJzKHJhd1JlcXVlc3RPcHRpb25zLnJlcXVlc3RIZWFkZXJzKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25OYW1lOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaDogZmV0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoT3B0aW9uczogZmV0Y2hPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHcmFwaFFMQ2xpZW50LnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKGRvY3VtZW50T3JPcHRpb25zLCB2YXJpYWJsZXMsIHJlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucywgX2EsIGhlYWRlcnMsIF9iLCBmZXRjaCwgX2MsIG1ldGhvZCwgZmV0Y2hPcHRpb25zLCB1cmwsIF9kLCBxdWVyeSwgb3BlcmF0aW9uTmFtZSwgZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2UpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zID0gcGFyc2VBcmdzXzEucGFyc2VSZXF1ZXN0QXJncyhkb2N1bWVudE9yT3B0aW9ucywgdmFyaWFibGVzLCByZXF1ZXN0SGVhZGVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRoaXMub3B0aW9ucywgaGVhZGVycyA9IF9hLmhlYWRlcnMsIF9iID0gX2EuZmV0Y2gsIGZldGNoID0gX2IgPT09IHZvaWQgMCA/IGNyb3NzX2ZldGNoXzEuZGVmYXVsdCA6IF9iLCBfYyA9IF9hLm1ldGhvZCwgbWV0aG9kID0gX2MgPT09IHZvaWQgMCA/ICdQT1NUJyA6IF9jLCBmZXRjaE9wdGlvbnMgPSBfX3Jlc3QoX2EsIFtcImhlYWRlcnNcIiwgXCJmZXRjaFwiLCBcIm1ldGhvZFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5zaWduYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoT3B0aW9ucy5zaWduYWwgPSByZXF1ZXN0T3B0aW9ucy5zaWduYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfZCA9IHJlc29sdmVSZXF1ZXN0RG9jdW1lbnQocmVxdWVzdE9wdGlvbnMuZG9jdW1lbnQpLCBxdWVyeSA9IF9kLnF1ZXJ5LCBvcGVyYXRpb25OYW1lID0gX2Qub3BlcmF0aW9uTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG1ha2VSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiByZXF1ZXN0T3B0aW9ucy52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNvbHZlSGVhZGVycyhoZWFkZXJzKSksIHJlc29sdmVIZWFkZXJzKHJlcXVlc3RPcHRpb25zLnJlcXVlc3RIZWFkZXJzKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IG9wZXJhdGlvbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoOiBmZXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoT3B0aW9uczogZmV0Y2hPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IChfZS5zZW50KCkpLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR3JhcGhRTENsaWVudC5wcm90b3R5cGUuYmF0Y2hSZXF1ZXN0cyA9IGZ1bmN0aW9uIChkb2N1bWVudHNPck9wdGlvbnMsIHJlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBiYXRjaFJlcXVlc3RPcHRpb25zLCBfYSwgaGVhZGVycywgX2IsIGZldGNoLCBfYywgbWV0aG9kLCBmZXRjaE9wdGlvbnMsIHVybCwgcXVlcmllcywgdmFyaWFibGVzLCBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmF0Y2hSZXF1ZXN0T3B0aW9ucyA9IHBhcnNlQXJnc18xLnBhcnNlQmF0Y2hSZXF1ZXN0QXJncyhkb2N1bWVudHNPck9wdGlvbnMsIHJlcXVlc3RIZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcy5vcHRpb25zLCBoZWFkZXJzID0gX2EuaGVhZGVycywgX2IgPSBfYS5mZXRjaCwgZmV0Y2ggPSBfYiA9PT0gdm9pZCAwID8gY3Jvc3NfZmV0Y2hfMS5kZWZhdWx0IDogX2IsIF9jID0gX2EubWV0aG9kLCBtZXRob2QgPSBfYyA9PT0gdm9pZCAwID8gJ1BPU1QnIDogX2MsIGZldGNoT3B0aW9ucyA9IF9fcmVzdChfYSwgW1wiaGVhZGVyc1wiLCBcImZldGNoXCIsIFwibWV0aG9kXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMudXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJhdGNoUmVxdWVzdE9wdGlvbnMuc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaE9wdGlvbnMuc2lnbmFsID0gYmF0Y2hSZXF1ZXN0T3B0aW9ucy5zaWduYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyaWVzID0gYmF0Y2hSZXF1ZXN0T3B0aW9ucy5kb2N1bWVudHMubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2N1bWVudCA9IF9hLmRvY3VtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUmVxdWVzdERvY3VtZW50KGRvY3VtZW50KS5xdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzID0gYmF0Y2hSZXF1ZXN0T3B0aW9ucy5kb2N1bWVudHMubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhcmlhYmxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbWFrZVJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzb2x2ZUhlYWRlcnMoaGVhZGVycykpLCByZXNvbHZlSGVhZGVycyhiYXRjaFJlcXVlc3RPcHRpb25zLnJlcXVlc3RIZWFkZXJzKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2g6IGZldGNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hPcHRpb25zOiBmZXRjaE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gKF9kLnNlbnQoKSkuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHcmFwaFFMQ2xpZW50LnByb3RvdHlwZS5zZXRIZWFkZXJzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIGhlYWRlciB0byB0aGUgY2xpZW50LiBBbGwgc3Vic2VxdWVudCByZXF1ZXN0cyB3aWxsIGhhdmUgdGhpcyBoZWFkZXIuXG4gICAgICovXG4gICAgR3JhcGhRTENsaWVudC5wcm90b3R5cGUuc2V0SGVhZGVyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHRoaXMub3B0aW9ucy5oZWFkZXJzO1xuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgLy8gdG9kbyB3aGF0IGlmIGhlYWRlcnMgaXMgaW4gbmVzdGVkIGFycmF5IGZvcm0uLi4gP1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBoZWFkZXJzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5oZWFkZXJzID0gKF9hID0ge30sIF9hW2tleV0gPSB2YWx1ZSwgX2EpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBjbGllbnQgZW5kcG9pbnQuIEFsbCBzdWJzZXF1ZW50IHJlcXVlc3RzIHdpbGwgc2VuZCB0byB0aGlzIGVuZHBvaW50LlxuICAgICAqL1xuICAgIEdyYXBoUUxDbGllbnQucHJvdG90eXBlLnNldEVuZHBvaW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEdyYXBoUUxDbGllbnQ7XG59KCkpO1xuZXhwb3J0cy5HcmFwaFFMQ2xpZW50ID0gR3JhcGhRTENsaWVudDtcbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0KF9hKSB7XG4gICAgdmFyIHVybCA9IF9hLnVybCwgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBoZWFkZXJzID0gX2EuaGVhZGVycywgb3BlcmF0aW9uTmFtZSA9IF9hLm9wZXJhdGlvbk5hbWUsIGZldGNoID0gX2EuZmV0Y2gsIF9iID0gX2EubWV0aG9kLCBtZXRob2QgPSBfYiA9PT0gdm9pZCAwID8gJ1BPU1QnIDogX2IsIGZldGNoT3B0aW9ucyA9IF9hLmZldGNoT3B0aW9ucztcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmZXRjaGVyLCBpc0JhdGhjaGluZ1F1ZXJ5LCByZXNwb25zZSwgcmVzdWx0LCBzdWNjZXNzZnVsbHlSZWNlaXZlZERhdGEsIGhlYWRlcnNfMSwgc3RhdHVzXzEsIGVycm9yUmVzdWx0O1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBmZXRjaGVyID0gbWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQT1NUJyA/IHBvc3QgOiBnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlzQmF0aGNoaW5nUXVlcnkgPSBBcnJheS5pc0FycmF5KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2hlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IG9wZXJhdGlvbk5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaDogZmV0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hPcHRpb25zOiBmZXRjaE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZ2V0UmVzdWx0KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NmdWxseVJlY2VpdmVkRGF0YSA9IGlzQmF0aGNoaW5nUXVlcnkgJiYgQXJyYXkuaXNBcnJheShyZXN1bHQpID8gIXJlc3VsdC5zb21lKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBfYS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFkYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KSA6ICEhcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5vayAmJiAhcmVzdWx0LmVycm9ycyAmJiBzdWNjZXNzZnVsbHlSZWNlaXZlZERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNfMSA9IHJlc3BvbnNlLmhlYWRlcnMsIHN0YXR1c18xID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCAoaXNCYXRoY2hpbmdRdWVyeSA/IHsgZGF0YTogcmVzdWx0IH0gOiByZXN1bHQpKSwgeyBoZWFkZXJzOiBoZWFkZXJzXzEsIHN0YXR1czogc3RhdHVzXzEgfSldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JSZXN1bHQgPSB0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJyA/IHsgZXJyb3I6IHJlc3VsdCB9IDogcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IHR5cGVzXzEuQ2xpZW50RXJyb3IoX19hc3NpZ24oX19hc3NpZ24oe30sIGVycm9yUmVzdWx0KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cywgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyB9KSwgeyBxdWVyeTogcXVlcnksIHZhcmlhYmxlczogdmFyaWFibGVzIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiByYXdSZXF1ZXN0KHVybE9yT3B0aW9ucywgcXVlcnksIHZhcmlhYmxlcywgcmVxdWVzdEhlYWRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucywgY2xpZW50O1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICByZXF1ZXN0T3B0aW9ucyA9IHBhcnNlQXJnc18xLnBhcnNlUmF3UmVxdWVzdEV4dGVuZGVkQXJncyh1cmxPck9wdGlvbnMsIHF1ZXJ5LCB2YXJpYWJsZXMsIHJlcXVlc3RIZWFkZXJzKTtcbiAgICAgICAgICAgIGNsaWVudCA9IG5ldyBHcmFwaFFMQ2xpZW50KHJlcXVlc3RPcHRpb25zLnVybCk7XG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY2xpZW50LnJhd1JlcXVlc3QoX19hc3NpZ24oe30sIHJlcXVlc3RPcHRpb25zKSldO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmF3UmVxdWVzdCA9IHJhd1JlcXVlc3Q7XG5mdW5jdGlvbiByZXF1ZXN0KHVybE9yT3B0aW9ucywgZG9jdW1lbnQsIHZhcmlhYmxlcywgcmVxdWVzdEhlYWRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucywgY2xpZW50O1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICByZXF1ZXN0T3B0aW9ucyA9IHBhcnNlQXJnc18xLnBhcnNlUmVxdWVzdEV4dGVuZGVkQXJncyh1cmxPck9wdGlvbnMsIGRvY3VtZW50LCB2YXJpYWJsZXMsIHJlcXVlc3RIZWFkZXJzKTtcbiAgICAgICAgICAgIGNsaWVudCA9IG5ldyBHcmFwaFFMQ2xpZW50KHJlcXVlc3RPcHRpb25zLnVybCk7XG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY2xpZW50LnJlcXVlc3QoX19hc3NpZ24oe30sIHJlcXVlc3RPcHRpb25zKSldO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmVxdWVzdCA9IHJlcXVlc3Q7XG5mdW5jdGlvbiBiYXRjaFJlcXVlc3RzKHVybE9yT3B0aW9ucywgZG9jdW1lbnRzLCByZXF1ZXN0SGVhZGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zLCBjbGllbnQ7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zID0gcGFyc2VBcmdzXzEucGFyc2VCYXRjaFJlcXVlc3RzRXh0ZW5kZWRBcmdzKHVybE9yT3B0aW9ucywgZG9jdW1lbnRzLCByZXF1ZXN0SGVhZGVycyk7XG4gICAgICAgICAgICBjbGllbnQgPSBuZXcgR3JhcGhRTENsaWVudChyZXF1ZXN0T3B0aW9ucy51cmwpO1xuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGNsaWVudC5iYXRjaFJlcXVlc3RzKF9fYXNzaWduKHt9LCByZXF1ZXN0T3B0aW9ucykpXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmJhdGNoUmVxdWVzdHMgPSBiYXRjaFJlcXVlc3RzO1xuZXhwb3J0cy5kZWZhdWx0ID0gcmVxdWVzdDtcbi8qKlxuICogdG9kb1xuICovXG5mdW5jdGlvbiBnZXRSZXN1bHQocmVzcG9uc2UpIHtcbiAgICB2YXIgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKGNvbnRlbnRUeXBlICYmIGNvbnRlbnRUeXBlLnN0YXJ0c1dpdGgoJ2FwcGxpY2F0aW9uL2pzb24nKSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICB9XG59XG4vKipcbiAqIGhlbHBlcnNcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVJlcXVlc3REb2N1bWVudChkb2N1bWVudCkge1xuICAgIHZhciBfYTtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAnc3RyaW5nJylcbiAgICAgICAgcmV0dXJuIHsgcXVlcnk6IGRvY3VtZW50IH07XG4gICAgdmFyIG9wZXJhdGlvbk5hbWUgPSB1bmRlZmluZWQ7XG4gICAgdmFyIG9wZXJhdGlvbkRlZmluaXRpb25zID0gZG9jdW1lbnQuZGVmaW5pdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7IHJldHVybiBkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJzsgfSk7XG4gICAgaWYgKG9wZXJhdGlvbkRlZmluaXRpb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBvcGVyYXRpb25OYW1lID0gKF9hID0gb3BlcmF0aW9uRGVmaW5pdGlvbnNbMF0ubmFtZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4geyBxdWVyeTogcHJpbnRlcl8xLnByaW50KGRvY3VtZW50KSwgb3BlcmF0aW9uTmFtZTogb3BlcmF0aW9uTmFtZSB9O1xufVxuLyoqXG4gKiBDb252ZW5pZW5jZSBwYXNzdGhyb3VnaCB0ZW1wbGF0ZSB0YWcgdG8gZ2V0IHRoZSBiZW5lZml0cyBvZiB0b29saW5nIGZvciB0aGUgZ3FsIHRlbXBsYXRlIHRhZy4gVGhpcyBkb2VzIG5vdCBhY3R1YWxseSBwYXJzZSB0aGUgaW5wdXQgaW50byBhIEdyYXBoUUwgRG9jdW1lbnROb2RlIGxpa2UgZ3JhcGhxbC10YWcgcGFja2FnZSBkb2VzLiBJdCBqdXN0IHJldHVybnMgdGhlIHN0cmluZyB3aXRoIGFueSB2YXJpYWJsZXMgZ2l2ZW4gaW50ZXJwb2xhdGVkLiBDYW4gc2F2ZSB5b3UgYSBiaXQgb2YgcGVyZm9ybWFuY2UgYW5kIGhhdmluZyB0byBpbnN0YWxsIGFub3RoZXIgcGFja2FnZS5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCB7IGdxbCB9IGZyb20gJ2dyYXBocWwtcmVxdWVzdCdcbiAqXG4gKiBhd2FpdCByZXF1ZXN0KCdodHRwczovL2Zvby5iYXIvZ3JhcGhxbCcsIGdxbGAuLi5gKVxuICpcbiAqIEByZW1hcmtzXG4gKlxuICogU2V2ZXJhbCB0b29scyBpbiB0aGUgTm9kZSBHcmFwaFFMIGVjb3N5c3RlbSBhcmUgaGFyZGNvZGVkIHRvIHNwZWNpYWxseSB0cmVhdCBhbnkgdGVtcGxhdGUgdGFnIG5hbWVkIFwiZ3FsXCIuIEZvciBleGFtcGxlIHNlZSB0aGlzIHByZXR0aWVyIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vcHJldHRpZXIvcHJldHRpZXIvaXNzdWVzLzQzNjAuIFVzaW5nIHRoaXMgdGVtcGxhdGUgdGFnIGhhcyBubyBydW50aW1lIGVmZmVjdCBiZXlvbmQgdmFyaWFibGUgaW50ZXJwb2xhdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ3FsKGNodW5rcykge1xuICAgIHZhciB2YXJpYWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXJpYWJsZXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBjaHVua3MucmVkdWNlKGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgY2h1bmssIGluZGV4KSB7IHJldHVybiBcIlwiICsgYWNjdW11bGF0b3IgKyBjaHVuayArIChpbmRleCBpbiB2YXJpYWJsZXMgPyB2YXJpYWJsZXNbaW5kZXhdIDogJycpOyB9LCAnJyk7XG59XG5leHBvcnRzLmdxbCA9IGdxbDtcbi8qKlxuICogQ29udmVydCBIZWFkZXJzIGluc3RhbmNlIGludG8gcmVndWxhciBvYmplY3RcbiAqL1xuZnVuY3Rpb24gSGVhZGVyc0luc3RhbmNlVG9QbGFpbk9iamVjdChoZWFkZXJzKSB7XG4gICAgdmFyIG8gPSB7fTtcbiAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgb1trXSA9IHY7XG4gICAgfSk7XG4gICAgcmV0dXJuIG87XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGFyc2VCYXRjaFJlcXVlc3RzRXh0ZW5kZWRBcmdzID0gZXhwb3J0cy5wYXJzZVJhd1JlcXVlc3RFeHRlbmRlZEFyZ3MgPSBleHBvcnRzLnBhcnNlUmVxdWVzdEV4dGVuZGVkQXJncyA9IGV4cG9ydHMucGFyc2VCYXRjaFJlcXVlc3RBcmdzID0gZXhwb3J0cy5wYXJzZVJhd1JlcXVlc3RBcmdzID0gZXhwb3J0cy5wYXJzZVJlcXVlc3RBcmdzID0gdm9pZCAwO1xuZnVuY3Rpb24gcGFyc2VSZXF1ZXN0QXJncyhkb2N1bWVudE9yT3B0aW9ucywgdmFyaWFibGVzLCByZXF1ZXN0SGVhZGVycykge1xuICAgIHJldHVybiBkb2N1bWVudE9yT3B0aW9ucy5kb2N1bWVudFxuICAgICAgICA/IGRvY3VtZW50T3JPcHRpb25zXG4gICAgICAgIDoge1xuICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50T3JPcHRpb25zLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICByZXF1ZXN0SGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgICAgICBzaWduYWw6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbn1cbmV4cG9ydHMucGFyc2VSZXF1ZXN0QXJncyA9IHBhcnNlUmVxdWVzdEFyZ3M7XG5mdW5jdGlvbiBwYXJzZVJhd1JlcXVlc3RBcmdzKHF1ZXJ5T3JPcHRpb25zLCB2YXJpYWJsZXMsIHJlcXVlc3RIZWFkZXJzKSB7XG4gICAgcmV0dXJuIHF1ZXJ5T3JPcHRpb25zLnF1ZXJ5XG4gICAgICAgID8gcXVlcnlPck9wdGlvbnNcbiAgICAgICAgOiB7XG4gICAgICAgICAgICBxdWVyeTogcXVlcnlPck9wdGlvbnMsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgICAgIHNpZ25hbDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xufVxuZXhwb3J0cy5wYXJzZVJhd1JlcXVlc3RBcmdzID0gcGFyc2VSYXdSZXF1ZXN0QXJncztcbmZ1bmN0aW9uIHBhcnNlQmF0Y2hSZXF1ZXN0QXJncyhkb2N1bWVudHNPck9wdGlvbnMsIHJlcXVlc3RIZWFkZXJzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50c09yT3B0aW9ucy5kb2N1bWVudHNcbiAgICAgICAgPyBkb2N1bWVudHNPck9wdGlvbnNcbiAgICAgICAgOiB7XG4gICAgICAgICAgICBkb2N1bWVudHM6IGRvY3VtZW50c09yT3B0aW9ucyxcbiAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgICAgIHNpZ25hbDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xufVxuZXhwb3J0cy5wYXJzZUJhdGNoUmVxdWVzdEFyZ3MgPSBwYXJzZUJhdGNoUmVxdWVzdEFyZ3M7XG5mdW5jdGlvbiBwYXJzZVJlcXVlc3RFeHRlbmRlZEFyZ3ModXJsT3JPcHRpb25zLCBkb2N1bWVudCwgdmFyaWFibGVzLCByZXF1ZXN0SGVhZGVycykge1xuICAgIHJldHVybiB1cmxPck9wdGlvbnMuZG9jdW1lbnRcbiAgICAgICAgPyB1cmxPck9wdGlvbnNcbiAgICAgICAgOiB7XG4gICAgICAgICAgICB1cmw6IHVybE9yT3B0aW9ucyxcbiAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxuICAgICAgICAgICAgc2lnbmFsOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG59XG5leHBvcnRzLnBhcnNlUmVxdWVzdEV4dGVuZGVkQXJncyA9IHBhcnNlUmVxdWVzdEV4dGVuZGVkQXJncztcbmZ1bmN0aW9uIHBhcnNlUmF3UmVxdWVzdEV4dGVuZGVkQXJncyh1cmxPck9wdGlvbnMsIHF1ZXJ5LCB2YXJpYWJsZXMsIHJlcXVlc3RIZWFkZXJzKSB7XG4gICAgcmV0dXJuIHVybE9yT3B0aW9ucy5xdWVyeVxuICAgICAgICA/IHVybE9yT3B0aW9uc1xuICAgICAgICA6IHtcbiAgICAgICAgICAgIHVybDogdXJsT3JPcHRpb25zLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICByZXF1ZXN0SGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgICAgICBzaWduYWw6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbn1cbmV4cG9ydHMucGFyc2VSYXdSZXF1ZXN0RXh0ZW5kZWRBcmdzID0gcGFyc2VSYXdSZXF1ZXN0RXh0ZW5kZWRBcmdzO1xuZnVuY3Rpb24gcGFyc2VCYXRjaFJlcXVlc3RzRXh0ZW5kZWRBcmdzKHVybE9yT3B0aW9ucywgZG9jdW1lbnRzLCByZXF1ZXN0SGVhZGVycykge1xuICAgIHJldHVybiB1cmxPck9wdGlvbnMuZG9jdW1lbnRzXG4gICAgICAgID8gdXJsT3JPcHRpb25zXG4gICAgICAgIDoge1xuICAgICAgICAgICAgdXJsOiB1cmxPck9wdGlvbnMsXG4gICAgICAgICAgICBkb2N1bWVudHM6IGRvY3VtZW50cyxcbiAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgICAgIHNpZ25hbDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xufVxuZXhwb3J0cy5wYXJzZUJhdGNoUmVxdWVzdHNFeHRlbmRlZEFyZ3MgPSBwYXJzZUJhdGNoUmVxdWVzdHNFeHRlbmRlZEFyZ3M7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJzZUFyZ3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DbGllbnRFcnJvciA9IHZvaWQgMDtcbnZhciBDbGllbnRFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2xpZW50RXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2xpZW50RXJyb3IocmVzcG9uc2UsIHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBDbGllbnRFcnJvci5leHRyYWN0TWVzc2FnZShyZXNwb25zZSkgKyBcIjogXCIgKyBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UsXG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICB9KTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlKSB8fCB0aGlzO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoX3RoaXMsIENsaWVudEVycm9yLnByb3RvdHlwZSk7XG4gICAgICAgIF90aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICAvLyB0aGlzIGlzIG5lZWRlZCBhcyBTYWZhcmkgZG9lc24ndCBzdXBwb3J0IC5jYXB0dXJlU3RhY2tUcmFjZVxuICAgICAgICBpZiAodHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShfdGhpcywgQ2xpZW50RXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ2xpZW50RXJyb3IuZXh0cmFjdE1lc3NhZ2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5lcnJvcnNbMF0ubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiR3JhcGhRTCBFcnJvciAoQ29kZTogXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIilcIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIENsaWVudEVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0cy5DbGllbnRFcnJvciA9IENsaWVudEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCByb290Um91dGVyIGZyb20gJy4vcm91dGVzL3Jvb3QnO1xuaW1wb3J0IHJlZ2lzdHJhdGlvblJvdXRlciBmcm9tICcuL3JvdXRlcy9yZWdpc3RyYXRpb24nO1xuaW1wb3J0IHJlZ2lzdGVyUm91dGVyIGZyb20gJy4vcm91dGVzL3JlZ2lzdGVyJztcbmltcG9ydCBzbGFzaGVkUm91dGVyIGZyb20gJy4vcm91dGVzL3NsYXNoZWQnO1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUaGUgY2xpZW50IHVzZXMgRXhwcmVzcyBmb3IgdGhlIFJFU1QgQVBJIGFuZCBmb3IgdGhlIGZyb250ZW5kLlxuICogQGF1dGhvciBBdEhlYXJ0RW5naW5lZXJcbiAqIEBzaW5jZSAyMDIxLTAxLTAxXG4gKi9cblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgUE9SVCA9IDI2MDE7XG5cbi8vIENPUlMgT3B0aW9ucyBmb3IgdXNlIGluIEV4cHJlc3NcbmNvbnN0IGFsbG93ZWRPcmlnaW5zID0gW2BodHRwOi8vbG9jYWxob3N0OntQT1JUfWBdO1xuY29uc3Qgb3B0aW9uczogY29ycy5Db3JzT3B0aW9ucyA9IHtcbiAgICBvcmlnaW46IGFsbG93ZWRPcmlnaW5zXG59O1xuXG4vLyBJbml0aWFsaXppbmcgbWlkZGxld2FyZSB0byBlbmFibGUgQ09SUyBhbmQganNvblxuYXBwLnVzZShjb3JzKG9wdGlvbnMpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuXG4vLyBTZXJ2ZXMgc3RhdGljIGZpbGVzIG91dCBvZiBwdWJsaWMgZm9sZGVyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMvJykpKTtcblxuLy8gUm91dGVzXG5hcHAudXNlKCcvJywgcm9vdFJvdXRlcik7XG5hcHAudXNlKCcvYXBpL3YxL2dldFJlZ2lzdHJhdGlvbicsIHJlZ2lzdHJhdGlvblJvdXRlcik7XG5hcHAudXNlKCcvYXBpL3YxL2dldFNsYXNoZWRNZW1iZXJzJywgc2xhc2hlZFJvdXRlcik7XG5cbi8vIFN0YXJ0IHNlcnZlclxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYOKaoe+4j1NlcnZlciBpcyBydW5uaW5nIGF0IGh0dHBzOi8vbG9jYWxob3N0OiR7UE9SVH1gKTtcbn0pOyIsIlxuaW1wb3J0IHsgR3JhcGhRTENsaWVudCwgZ3FsIH0gZnJvbSAnZ3JhcGhxbC1yZXF1ZXN0J1xuXG5jbGFzcyBRdWVyeUdyYXBoIHtcbiAgICBwcml2YXRlIGNsaWVudDogR3JhcGhRTENsaWVudDtcblxuICAgIGNvbnN0cnVjdG9yKGVuZHBvaW50OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgR3JhcGhRTENsaWVudChlbmRwb2ludCwge30pO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFJlZ2lzdHJhdGlvbihwdWJrZXk6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBxdWVyeSA9IGdxbGBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb25FbnRpdGllcyhmaXJzdDogMSwgd2hlcmU6IHtwdWJrZXk6IFwiJHtwdWJrZXl9XCJ9KSB7XG4gICAgICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgICAgIHB1YmtleVxuICAgICAgICAgICAgICAgICAgICBpZENvbW1pdG1lbnRcbiAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuICAgICAgICBjb25zb2xlLmxvZyhxdWVyeSk7XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLmNsaWVudC5yZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGFzeW5jIGdldEFsbFJlZ2lzdHJhdGlvbnMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gZ3FsYFxuICAgICAgICB7IHJlZ2lzdHJhdGlvbkVudGl0aWVzKCkge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIHB1YmtleVxuICAgICAgICAgICAgaWRDb21taXRtZW50XG4gICAgICAgICAgICBzaWduYXR1cmVcbiAgICAgICAgfX1cbiAgICAgICAgYDtcbiAgICAgICAgY29uc29sZS5sb2cocXVlcnkpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQucmVxdWVzdChxdWVyeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXJ5R3JhcGgiLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgUXVlcnlHcmFwaCBmcm9tICcuLi9saWIvZ3JhcGhxbCc7XG5cbmNvbnN0IHVybCA9IFwiaHR0cHM6Ly9nYXRld2F5LnRoZWdyYXBoLmNvbS9hcGkvPEFQSV9LRVk+L3N1YmdyYXBocy9pZC9RbVVxZmFyeDhlamdDVFVlZ3VrTnRmNjdOOEZnTHRmZUNVcGVhWGZ0VGlSQUhlXCJcblxuY29uc3QgcmVnaXN0cmF0aW9uUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbmNvbnN0IGdyYXBoY2xpZW50ID0gbmV3IFF1ZXJ5R3JhcGgoJ2h0dHBzOi8vYXBpLnN0dWRpby50aGVncmFwaC5jb20vcXVlcnkvMjA0NzQvcmxuLXJlZ2lzdHJ5L3YwLjAuMScpXG5cbnJlZ2lzdHJhdGlvblJvdXRlci5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzLnNlbmQoYFRoaXMgZnVuY3Rpb24gaXMgbm90IHlldCBzdXBwb3J0ZWQsIHBsZWFzZSB1c2UgL3JlZ2lzdHJ5L3twdWJsaWNrZXl9YCk7XG59KTtcblxucmVnaXN0cmF0aW9uUm91dGVyLmdldCgnLzpwdWJsaWNrZXknLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgZ3JhcGhjbGllbnQuZ2V0UmVnaXN0cmF0aW9uKHJlcS5wYXJhbXMucHVibGlja2V5KS50aGVuKChfcmVnaXN0cmF0aW9uX3N0YXR1cykgPT4ge1xuICAgICAgICByZXMuanNvbih7IFwiUmVnaXN0ZXJlZFwiOiBfcmVnaXN0cmF0aW9uX3N0YXR1cyB9KTtcbiAgICB9KTtcblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdHJhdGlvblJvdXRlciIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jb25zdCByb290Um91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm9vdFJvdXRlci5nZXQoJy8nLCAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSA9PiB7XG4gICAgcmVzLnNlbmRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsICdwdWJsaWMvaW5kZXguaHRtbCcpKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb290Um91dGVyIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuXG5jb25zdCBzbGFzaGVkUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuXG5zbGFzaGVkUm91dGVyLmdldCgnLycsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2VuZChgVGhpcyBmdW5jdGlvbiBpcyBub3QgeWV0IHN1cHBvcnRlZGApO1xufSk7XG5cbnNsYXNoZWRSb3V0ZXIuZ2V0KCcvOnB1YmxpY2tleScsIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcbiAgICBsZXQgcHVibGlja2V5ID0gcmVxLnBhcmFtcy5wdWJsaWNrZXk7XG4gICAgcmVzLmpzb24oeyBSZWdpc3RyeV9QdWJrZXk6IHB1YmxpY2tleSB9KTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzbGFzaGVkUm91dGVyIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZvcm0tZGF0YVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsL2xhbmd1YWdlL3ByaW50ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS1mZXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2NsaWVudC9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=