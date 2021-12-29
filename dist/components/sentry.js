"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureException = exports.PublicError = void 0;
const Sentry = __importStar(require("@sentry/node"));
Sentry.init({
    dsn: "https://448cede325be4e3199a09af0bc8da715@o1047646.ingest.sentry.io/6024712",
    tracesSampleRate: 1.0,
});
// Any PublicError we throw contains an error message that the user is allowed
// to see.
class PublicError extends Error {
}
exports.PublicError = PublicError;
// We use this to prevent logging while in development mode (and just log
// locally instead)
function captureException(e, captureContext) {
    if (process.env.NODE_ENV === "production") {
        Sentry.captureException(e, captureContext);
    }
    console.log(e, captureContext);
}
exports.captureException = captureException;
//# sourceMappingURL=sentry.js.map