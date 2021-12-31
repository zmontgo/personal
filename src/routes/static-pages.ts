import { router } from "../components/router";

export function init() {
  router.get("/", async (ctx) => {
    console.log('Hi');

    ctx.render("index.pug", {
      title: "Home | Zachary Montgomery",
      heroClass: true,
    });
  });

  router.get("/humans.txt", async (ctx) => {
    ctx.body = "Made with ❤️ by Zachary Montgomery."
  })
}
