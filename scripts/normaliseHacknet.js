/**
 * Keeps all hacknet servers at the same levels.
 * @param {NS} ns The NetScript Module.
 */
export async function normaliseHacknet(ns) {
  while (true) {
    const servers = ns.hacknet.numNodes();
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
    const lowestRam = ram.indexOf(Math.min(...ram));
    const lowestLevel = levels.indexOf(Math.min(...levels));
    while (
      ns.hacknet.getCoreUpgradeCost(lowestCore) >
        ns.hacknet.getPurchaseNodeCost() &&
      money > ns.hacknet.getPurchaseNodeCost()
    ) {
      ns.print(
        `Cheapest core is ${ns.hacknet.getCoreUpgradeCost(
          lowestCore
        )}, but new node is ${ns.hacknet.getPurchaseNodeCost()}, so purchasing new node.`
      );
      ns.hacknet.purchaseNode(1);
      money = ns.getServerMoneyAvailable("home");
    }
    const coreCost = ns.hacknet.getCoreUpgradeCost(lowestCore);
    if (money > coreCost) {
      ns.print(`Purchasing core on node ${lowestCore}`);
      ns.hacknet.upgradeCore(lowestCore, 1);
      money = ns.getServerMoneyAvailable("home");
    }
    const ramCost = ns.hacknet.getRamUpgradeCost(lowestRam);
    if (money > ramCost) {
      ns.print(`Purchasing ram on node ${lowestRam}`);
      ns.hacknet.upgradeRam(lowestRam, 1);
      money = ns.getServerMoneyAvailable("home");
    }
    const levelCost = ns.hacknet.getLevelUpgradeCost(lowestLevel);
    if (money > levelCost) {
      ns.print(`Purchasing level on node ${lowestLevel}`);
      ns.hacknet.upgradeLevel(lowestLevel, 1);
      money = ns.getServerMoneyAvailable("home");
    }

    await ns.sleep(60000);
  }
}

export const main = normaliseHacknet;
