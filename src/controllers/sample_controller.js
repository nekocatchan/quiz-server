import { kv } from "/db/kv.js";
import KeyFactory from "/db/key_factory.js";

export default class SampleController {
  static async getMe({ cookies, response }) {
    const username = await cookies.get("username");
    const user = (await kv.get(KeyFactory.userKey(username))).value;
    const pick = ({ username, role }) => ({ username, role });
    response.body = pick(user);
  }
}
