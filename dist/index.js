"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const router_1 = require("./components/router");
const port = parseInt(process.env.HTTP_PORT) || 3000;
router_1.koa.listen(port, process.env.HTTP_HOST);
for (let route of ['static-pages']) {
    require('./routes/' + route)?.init?.();
}
//# sourceMappingURL=index.js.map