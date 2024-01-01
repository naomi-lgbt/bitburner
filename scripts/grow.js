/**
 * Grows a target server.
 * @param {NS} ns The NetScript Module.
 */
export async function grow(ns) {
  const target = ns.args[0];
  const threads = ns.args[1];
  await ns.grow(target, { threads });
}

export const main = grow;
