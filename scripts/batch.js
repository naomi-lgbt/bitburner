import { findServer } from "./modules/findServer";

/**
 * Properly batches hacks, weakens, and grows.
 * @param {NS} ns The NetScript Module.
 */
export async function batch(ns) {
  const target = ns.args[0];
  const exists = findServer(ns, target);
  if (!exists) {
    ns.print(`Failed to find ${target} server.`);
    return;
  }
  while (ns.getServerMoneyAvailable(target)) {
    await ns.hack(target);
    await ns.weaken(target);
    await ns.grow(target);
    await ns.weaken(target);
  }
}

export const main = batch;
