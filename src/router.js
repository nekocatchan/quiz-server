import { Router } from "@oak/oak";

const router = new Router();

router.get("/hello", (ctx) => {
  ctx.response.body = { hello: "world" };
});

export { router };
