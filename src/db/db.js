import KeyFactory from "/db/utils/key_factory.js";

const kv = await Deno.openKv();

// sample
export async function getTicket(ticketId) {
  return (await kv.get(KeyFactory.ticketKey(ticketId))).value;
}
