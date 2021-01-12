var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const noop = () => { };
const anoop = () => __awaiter(void 0, void 0, void 0, function* () { });
export function hitch(handler, { before = noop, after = noop }) {
    return ((...args) => {
        before();
        const result = handler(...args);
        after();
        return result;
    });
}
export function asyncHitch(handler, { before = anoop, after = anoop }) {
    return ((...args) => __awaiter(this, void 0, void 0, function* () {
        yield before();
        const result = yield handler(...args);
        yield after();
        return result;
    }));
}
//# sourceMappingURL=hitch.js.map