import { Router } from "@oak/oak";
import * as Errors from "/utils/errors.js";
import UserController from "/controllers/user_controller.js";
import QuestionController from "/controllers/question_controller.js";

const router = new Router();

// sample
router.get("/hello", (ctx) => {
  ctx.response.body = { hello: "world" };
});
// sample
router.get("/error/400", (ctx) => {
  ctx.response.body = Errors.BAD_REQUEST;
});

router.post("/signup", UserController.create);
router.post("/signin", () => {});
router.post("/signout", () => {});

router.post("/questions", QuestionController.postQuestion);
router.get("/questions/:questionId", QuestionController.getQuestion);
router.delete("/questions/:questionId", () => {});

export { router };
