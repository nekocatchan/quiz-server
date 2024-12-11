/**
 * usage:
 *
 * import * as Errors from "/utils/errors.js";
 * const error = Errors.BAD_REQUEST;
 */

export const BAD_REQUEST = error(400, "Bad Request");
export const INTERNAL_SERVER_ERROR = error(500, "Internal Server Error");

function error(code, message) {
  return { error: { code, message } };
}
