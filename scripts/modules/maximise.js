/**
 * Prepares a server for maximum batch scripting returns.
 * @param {NS} ns The NetScript Module.
 * @param {string} target The server to prep.
 * @param {number} threads The number of threads to use.
 */
export async function maximise(ns, target, threads) {
  ns.tprint("Minimising security on server.");
  while (
    ns.getServerMinSecurityLevel(target) < ns.getServerSecurityLevel(target)
  ) {
    await ns.weaken(target, { threads });
  }
  ns.tprint("Maximising funds on server.");
  while (ns.getServerMaxMoney(target) > ns.getServerMoneyAvailable(target)) {
    await ns.grow(target, { threads });
  }

  ns.tprint("Minimising security on server again.");
  while (
    ns.getServerMinSecurityLevel(target) < ns.getServerSecurityLevel(target)
  ) {
    await ns.weaken(target, { threads });
  }
}
