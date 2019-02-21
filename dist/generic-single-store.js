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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
import { BehaviorSubject } from 'rxjs';
;
var GenericSingleStore = /** @class */ (function () {
    function GenericSingleStore(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.item = BehaviorSubject.create();
        this.options = __assign({ storage: undefined, encoder: function (subject) { return JSON.stringify(subject); }, decoder: function (subject) { return JSON.parse(subject); } }, options);
        this.options.storageKey.subscribe(function (key) {
            if (key) {
                _this.load(key);
            }
        });
    }
    GenericSingleStore.prototype.get = function () {
        return this.item;
    };
    GenericSingleStore.prototype.set = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.item.next(item);
                        return [4 /*yield*/, this.save(item)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GenericSingleStore.prototype.updateProperties = function (properties) {
        this.set(__assign({}, this.item.value, properties));
    };
    GenericSingleStore.prototype.load = function (key) {
        if (key === void 0) { key = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var data, decoded;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.options.storage) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.options.storage.getItem(key || this.options.storageKey.value)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            decoded = this.options.decoder(data);
                            this.item.next(decoded);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    GenericSingleStore.prototype.save = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.options.storage) return [3 /*break*/, 2];
                        data = this.options.encoder(item);
                        return [4 /*yield*/, this.options.storage.setItem(this.options.storageKey.value, data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    return GenericSingleStore;
}());
export { GenericSingleStore };
