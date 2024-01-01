/**
 * Manually batches hacks, weakens, and grows.
 * This version is slower as it waits for execution, but consumes significantly less ram.
 * @param {NS} ns The NetScript Module.
 */
export async function batch(ns) {
  const target = ns.args[0];
  const threads = ns.args[1];
  while (ns.getServerMoneyAvailable(target)) {
    await ns.hack(target, { threads });
    await ns.weaken(target, { threads });
    await ns.grow(target, { threads });
    await ns.weaken(target, { threads });
  }
}

export const main = batch;
