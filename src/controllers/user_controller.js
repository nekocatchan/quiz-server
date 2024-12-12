import * as Errors from "/utils/errors.js";
import { kv } from "/db/kv.js";
import KeyFactory from "/db/key_factory.js";
import * as bcrypt from "bcrypt/mod.ts";

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
    const passwordHash = await bcrypt.hash(password);
    const newUser = { username, passwordHash };
    await kv.set(KeyFactory.userKey(username), newUser);

    cookies.set("username", username);

    response.body = { username };
  }
}
