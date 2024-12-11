import { Application } from "@oak/oak";
import { router } from "/router.js";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });
