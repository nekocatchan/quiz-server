import { Application } from "@oak/oak";
import { router } from "/router.js";
import { oakCors } from "cors/mod.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();

  ctx.response.headers.set(
    "Access-Control-Allow-Origin",
    ctx.request.headers.get("Origin") ?? "",
  );
  ctx.response.headers.set("Access-Control-Allow-Credentials", "true");
});
app.use(oakCors());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
