"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
;
class GenericSingleStore {
    constructor(options = {}) {
        this.item = new rxjs_1.BehaviorSubject(undefined);
        this.options = Object.assign({ storage: undefined }, options);
        this.options.storageKey.subscribe((key) => {
            this.load(key);
        });
    }
    get() {
        return this.item;
    }
    set(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.item.next(item);
            yield this.save(item);
        });
    }
    updateProperties(properties) {
        this.set(Object.assign({}, this.item.value, properties));
    }
    load(key = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.storage) {
                if (!key) {
                    key = this.options.storageKey.value;
                }
                const data = yield this.options.storage.getItem(key);
                if (data) {
                    const decoded = this.options.decoder(data);
                    this.item.next(decoded);
                }
            }
            return Promise.resolve();
        });
    }
    save(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.storage) {
                const data = this.options.encoder(item);
                yield this.options.storage.setItem(this.options.storageKey.value, data);
            }
            return Promise.resolve();
        });
    }
}
exports.GenericSingleStore = GenericSingleStore;
