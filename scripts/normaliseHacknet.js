/**
 * Keeps all hacknet servers at the same levels.
 * @param {NS} ns The NetScript Module.
 */
export async function normaliseHacknet(ns) {
  const servers = ns.hacknet.numNodes();
  while (true) {
    let money = ns.getServerMoneyAvailable("home");
    const levels = [];
    const ram = [];
    const cores = [];
    for (let i = 0; i < servers; i++) {
      const stats = ns.hacknet.getNodeStats(i);
      levels.push(stats.level);
      ram.push(stats.ram);
      cores.push(stats.cores);
    }
    const lowestCore = cores.indexOf(Math.min(...cores));
    const coreCost = ns.hacknet.getCoreUpgradeCost(lowestCore);
    if (money > coreCost) {
      ns.hacknet.upgradeCore(lowestCore, 1);
      money = ns.getServerMoneyAvailable("home");
    }
    const lowestRam = ram.indexOf(Math.min(...ram));
    const ramCost = ns.hacknet.getRamUpgradeCost(lowestRam);
    if (money > ramCost) {
      ns.hacknet.upgradeRam(lowestRam, 1);
      money = ns.getServerMoneyAvailable("home");
    }
    const lowestLevel = levels.indexOf(Math.min(...levels));
    const levelCost = ns.hacknet.getLevelUpgradeCost(lowestLevel);
    if (money > levelCost) {
      ns.hacknet.upgradeLevel(lowestLevel, 1);
      money = ns.getServerMoneyAvailable("home");
    }

    await ns.sleep(60000);
  }
}

export const main = normaliseHacknet;
