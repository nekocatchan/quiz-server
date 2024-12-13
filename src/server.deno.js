import { Application } from "@oak/oak";
import { router } from "/router.js";
import { oakCors } from "cors/mod.ts";

const app = new Application();

app.use(oakCors())

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
