import { Router } from "@oak/oak";

const router = new Router();

// sample
router.get("/hello", (ctx) => {
  ctx.response.body = { hello: "world" };
});

router.post("/signup", () => {});
router.post("/signin", () => {});
router.post("/signout", () => {});

router.post("/questions", () => {});
router.get("/questions/:questionId", () => {});
router.delete("/questions/:questionId", () => {});

export { router };
