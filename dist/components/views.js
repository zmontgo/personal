"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderView = void 0;
const path_1 = __importDefault(require("path"));
const pug_1 = __importDefault(require("pug"));
async function renderView(path, context) {
    const truePath = path_1.default.join(__dirname, "../../views/", path);
    return pug_1.default.renderFile(truePath, context);
}
exports.renderView = renderView;
//# sourceMappingURL=views.js.map