"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const router_1 = require("../components/router");
function init() {
    router_1.router.get("/", async (ctx) => {
        ctx.render("index.pug", {
            title: "Home | Zachary Montgomery",
            heroClass: true,
        });
    });
    router_1.router.get("/humans.txt", async (ctx) => {
        ctx.body = "Made with ❤️ by Zachary Montgomery.";
    });
}
exports.init = init;
//# sourceMappingURL=static-pages.js.map