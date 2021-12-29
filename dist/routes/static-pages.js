"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const router_1 = require("../components/router");
function init() {
    router_1.router.get("/", async (ctx) => {
        ctx.render("index.pug", {
            title: "Home | North Point Heating and Air",
            heroClass: true,
        });
    });
    router_1.router.get("/about", async (ctx) => {
        ctx.render("about.pug", {
            title: "About | North Point Heating and Air",
        });
    });
    router_1.router.get("/reviews", async (ctx) => {
        ctx.render("reviews.pug", {
            title: "Reviews | North Point Heating and Air",
        });
    });
    router_1.router.get("/air-conditioning", async (ctx) => {
        ctx.render("services/air-conditioning.pug", {
            title: "Air Conditioning | North Point Heating and Air",
        });
    });
    router_1.router.get("/heating", async (ctx) => {
        ctx.render("services/heating.pug", {
            title: "Heating | North Point Heating and Air",
        });
    });
    router_1.router.get("/air-quality", async (ctx) => {
        ctx.render("services/air-quality.pug", {
            title: "Air Quality | North Point Heating and Air",
        });
    });
    router_1.router.get("/weatherization", async (ctx) => {
        ctx.render("services/weatherization.pug", {
            title: "Weatherization | North Point Heating and Air",
        });
    });
    router_1.router.get("/schedule", async (ctx) => {
        ctx.render("schedule.pug", {
            title: "Schedule Service | North Point Heating and Air",
        });
    });
    router_1.router.get("/privacy", async (ctx) => {
        ctx.render("privacy.pug", { title: "Privacy Policy | North Point Heating and Air" });
    });
    router_1.router.get("/robots.txt", async (ctx) => {
        ctx.render("robots.pug");
    });
    router_1.router.get("/sitemap.xml", async (ctx) => {
        ctx.type = 'text/xml';
        ctx.body = `<urlse>
    <!--  created with Free Online Sitemap Generator www.xml-sitemaps.com  -->
    <url>
    <loc>http://104.131.24.42/</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>1.00</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/air-conditioning</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/heating</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/air-quality</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/weatherization</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/about/</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/reviews/</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/contact/</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/contact</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/privacy</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/feedback</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>http://104.131.24.42/not-a-page</loc>
    <lastmod>2021-11-22T21:21:11+00:00</lastmod>
    <priority>0.64</priority>
    </url>
    </urlset>`;
    });
    router_1.router.get("/humans.txt", async (ctx) => {
        ctx.body = "Made with ❤️ by Zachary Montgomery for North Point Heating and Air.";
    });
}
exports.init = init;
//# sourceMappingURL=static-pages.js.map