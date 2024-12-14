import * as Errors from "/utils/errors.js";
import { kv } from "/db/kv.js";
import KeyFactory from "/db/key_factory.js";
import HashHelper from "/utils/hash_helper.js";
import { Roles } from "/config/roles.js";

export default class UserController {
  static async create({ request, cookies, response }) {
    const json = await request.body.json();
    const { username, password, inviteCode } = json;

    if (
      typeof username !== "string" ||
      username === "" ||
      typeof password !== "string" ||
      password === "" ||
      typeof inviteCode !== "string"
    ) {
      response.body = Errors.BAD_REQUEST;
      return;
    }

    if (inviteCode !== "foobar") {
      response.body = Errors.UNKNOWN_INVITE_CODE;
      return;
    }

    const oldUser = (await kv.get(KeyFactory.userKey(username))).value;
    if (oldUser) {
      response.body = Errors.INVALID_USERNAME;
      return;
    }

    // createUser
    const role = Roles.USER;
    const passwordHash = await HashHelper.hash(password);
    const newUser = { username, passwordHash, role };
    await kv.set(KeyFactory.userKey(username), newUser);

    await cookies.set("username", username);

    response.body = { username };
  }
}
