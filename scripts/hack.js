/**
 * Hacks a target server.
 * @param {NS} ns The NetScript Module.
 */
export async function hack(ns) {
  const target = ns.args[0];
  const threads = ns.args[1];
  await ns.hack(target, { threads });
}

export const main = hack;
