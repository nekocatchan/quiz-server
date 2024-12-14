export default class KeyFactory {
  // sample
  static ticketKey(ticketId) {
    return ["tickets", ticketId];
  }

  static userKey(username) {
    return ["users", username];
  }

  static questionKey(questionId) {
    return ["questions", questionId];
  }

  static answerKey(username, questionId) {
    return ["answers", username, questionId];
  }
}
