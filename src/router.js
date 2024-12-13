import { Router } from "@oak/oak";
import * as Errors from "/utils/errors.js";
import AuthController from "/controllers/auth_controller.js";
import UserController from "/controllers/user_controller.js";
import QuestionController from "/controllers/question_controller.js";
import AnswerController from "./controllers/answer_controller.js";

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
router.post("/signin", AuthController.signin);
router.post("/signout", AuthController.signout);

router.post("/questions", QuestionController.postQuestion);
router.get("/questions/:questionId", QuestionController.getQuestion);
router.delete("/questions/:questionId", QuestionController.deleteQuestion);

router.post("/answers/:questionId", AnswerController.answer);

export { router };
