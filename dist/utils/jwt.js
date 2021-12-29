"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const util_1 = __importDefault(require("util"));
const jwtVerify = util_1.default.promisify(require("jsonwebtoken").verify);
const jwtSign = util_1.default.promisify(require("jsonwebtoken").sign);
async function encode(data, expiresIn = "24h") {
    return await jwtSign(data, process.env.JWT_TOKEN, {
        expiresIn,
    });
}
exports.encode = encode;
async function decode(data) {
    try {
        const payload = await jwtVerify(data, process.env.JWT_TOKEN);
        return payload;
    }
    catch (e) {
        return null;
    }
}
exports.decode = decode;
//# sourceMappingURL=jwt.js.map