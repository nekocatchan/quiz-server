export default class KeyFactory {
  // sample
  static ticketKey(ticketId) {
    return ["tickets", ticketId];
  }

  static userKey(username) {
    return ["users", username];
  }
}
