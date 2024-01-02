/**
 * Weakens a target server.
 * @param {NS} ns The NetScript Module.
 */
export async function weaken(ns) {
  const target = ns.args[0];
  const threads = ns.args[1];
  await ns.weaken(target, { threads });
}

export const main = weaken;
