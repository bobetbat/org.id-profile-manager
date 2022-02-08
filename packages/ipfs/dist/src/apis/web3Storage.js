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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3StorageApi = void 0;
var base_1 = require("./base");
var utils_1 = require("../utils");
var org_id_utils_1 = require("@windingtree/org.id-utils");
var web3StorageApiPath = 'https://api.web3.storage';
var Web3StorageApi = /** @class */ (function (_super) {
    __extends(Web3StorageApi, _super);
    function Web3StorageApi(token, gateway) {
        var _this = _super.call(this) || this;
        if (!token) {
            throw new Error('Web3Storage Authorization API token must be provided');
        }
        if (!gateway) {
            throw new Error('IPFS gateway must be provided');
        }
        _this.authToken = token;
        _this.ipfsGateway = gateway;
        return _this;
    }
    Web3StorageApi.prototype.authHeader = function () {
        return {
            'Authorization': "Bearer ".concat(this.authToken),
            'X-Client': 'web3.storage/js'
        };
    };
    Web3StorageApi.prototype.add = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = org_id_utils_1.http).request;
                        _c = ["".concat(web3StorageApiPath, "/upload"), 'POST'];
                        return [4 /*yield*/, file.arrayBuffer()];
                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), __assign(__assign({}, this.authHeader()), { 'X-NAME': file.name })]))];
                }
            });
        });
    };
    Web3StorageApi.prototype.get = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, utils_1.getIpfsChunks)(this.ipfsGateway.cat(cid))];
            });
        });
    };
    // Faked until Web3.storage not implemented /user/uploads/{cid}
    // https://github.com/web3-storage/web3.storage/issues/314
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Web3StorageApi.prototype.delete = function (cid) {
        return Promise.resolve();
    };
    Web3StorageApi.prototype._delete = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, org_id_utils_1.http.request("".concat(web3StorageApiPath, "/user/uploads/").concat(cid), 'DELETE', undefined, __assign({}, this.authHeader()))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Web3StorageApi;
}(base_1.BaseIpfsStorageApi));
exports.Web3StorageApi = Web3StorageApi;
//# sourceMappingURL=web3Storage.js.map