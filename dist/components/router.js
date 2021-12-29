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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.koa = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_mount_1 = __importDefault(require("koa-mount"));
const Boom = __importStar(require("@hapi/boom"));
const path_1 = __importDefault(require("path"));
const sentry_1 = require("./sentry");
const views_1 = require("./views");
const koa_compress_1 = __importDefault(require("koa-compress"));
exports.koa = new koa_1.default();
exports.router = new koa_router_1.default({
    prefix: process.env.HTTP_URL_PREFIX,
});
exports.koa.use((0, koa_compress_1.default)());
exports.koa.use((0, koa_body_1.default)({
    text: false,
    multipart: true,
    urlencoded: true,
    formidable: {
        keepExtensions: true,
    },
}));
exports.koa.use((0, koa_mount_1.default)("/", (0, koa_static_1.default)(path_1.default.join(__dirname, "../../static"))));
// Error catcher
exports.koa.use(async (ctx, next) => {
    try {
        await next();
        // Handle non-200 HTTP replies
        if (ctx.status < 200 || ctx.status > 299) {
            ctx.render("errors/error.pug", {
                error: ctx.response.message,
                status: ctx.status,
                statusCode: ctx.status,
            });
        }
    }
    catch (e) {
        (0, sentry_1.captureException)(e, {});
        if (!Boom.isBoom(e) && !(e instanceof sentry_1.PublicError)) {
            console.error(e);
            e = Boom.internal();
            await outputError(ctx, e);
        }
        else if (e instanceof sentry_1.PublicError) {
            e = Boom.badRequest(e.message, e);
            await outputError(ctx, e);
        }
    }
});
async function outputError(ctx, e) {
    ctx.status = e.output.statusCode;
    ctx.render("errors/error.pug", {
        ...e.output.payload,
        status: ctx.status,
        statusCode: undefined,
    });
}
// Render utility
exports.koa.use(async (ctx, next) => {
    ctx.render = async (path, context) => {
        ctx.body = await (0, views_1.renderView)(path, {
            ...context,
            user: ctx.state.user,
        });
        return ctx.body;
    };
    await next();
});
exports.koa.use(exports.router.routes());
exports.koa.use(exports.router.allowedMethods());
//# sourceMappingURL=router.js.map