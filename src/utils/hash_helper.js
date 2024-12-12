import { compareSync, hashSync } from "bcrypt/mod.ts";

/**
 * Deno Deploy で bcrypt の hash, compare が使えない。
 * hashSync, compareSync は使えるので非同期にして使う。
 * see: https://github.com/JamesBroadberry/deno-bcrypt/issues/26
 */
export default class HashHelper {
  static hash(plaintext) {
    return new Promise((res) => res(hashSync(plaintext)));
  }

  static compare(plaintext, hash) {
    return new Promise((res) => res(compareSync(plaintext, hash)));
  }
}
