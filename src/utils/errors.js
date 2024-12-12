/**
 * usage:
 *
 * import * as Errors from "/utils/errors.js";
 * const error = Errors.BAD_REQUEST;
 */

export const BAD_REQUEST = error(400, "Bad Request");
export const INTERNAL_SERVER_ERROR = error(500, "Internal Server Error");

export const INVALID_USERNAME = error(
  1001,
  "このユーザー名は使用できません",
);
export const UNKNOWN_INVITE_CODE = error(
  1002,
  "不明な招待コード",
);

function error(code, message) {
  return { error: { code, message } };
}
