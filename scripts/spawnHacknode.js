/**
 * Spawns a given number of hacknodes and bumps them to
 * max.
 * @param {NS} ns The NetScript Module.
 */
export async function spawnHacknode(ns) {
  const count = ns.args[0];
  for (let i = 0; i < count; i++) {
    const index = ns.hacknet.purchaseNode();
    ns.hacknet.upgradeCore(index, 15);
    ns.hacknet.upgradeLevel(index, 199);
    ns.hacknet.upgradeRam(index, 6);
  }
}

export const main = spawnHacknode;
