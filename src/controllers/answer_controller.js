import * as Errors from "/utils/errors.js";
import { kv } from "/db/kv.js";
import KeyFactory from "/db/key_factory.js";

export default class AnswerController {
  static async answer({ params, cookies, response, request }) {
    const username = await cookies.get("username");
    const questionId = await params.questionId;
    const json = await request.body.json();
    const answerChoiceId = json.choiceId;

    if (typeof username !== "string" || username === "") {
      response.body = Errors.NOT_LOGIN;
      return;
    }
    if (
      typeof questionId !== "string" ||
      questionId === "" ||
      typeof answerChoiceId !== "number" ||
      answerChoiceId === ""
    ) {
      response.body = Errors.BAD_REQUEST;
      return;
    }

    const correctAnswer =
      (await kv.get(KeyFactory.questionKey(questionId)));
    const correctAnswerId = correctAnswer.value.correctChoiceId;

    const isCorrect = answerChoiceId === correctAnswerId;

    const value = {
      username: username,
      questionId: questionId,
      answerChoiceId: answerChoiceId,
      isCorrect: isCorrect,
    };

    await kv.set(KeyFactory.answerKey(username, questionId), value);

    response.status = 200;
  }
}
