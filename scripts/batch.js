/**
 * Properly batches hacks, weakens, and grows.
 * @param {NS} ns The NetScript Module.
 */
export async function batch(ns) {
  const target = ns.args[0];
  const threads = ns.args[1];
  while (ns.getServerMoneyAvailable(target)) {
    const ht = Math.ceil(ns.getHackTime(target));
    const wt = Math.ceil(ns.getWeakenTime(target));
    const gt = Math.ceil(ns.getGrowTime(target));
    ns.print(`Time to Hack: ${ht}ms`);
    ns.print(`Time to Weaken: ${wt}ms`);
    ns.print(`Time to Grow: ${gt}ms`);

    ns.print(
      `Starting first weaken... Will finish at ${new Date(Date.now() + wt)}`
    );
    ns.run("scripts/weaken.js", threads, target, threads);
    await ns.sleep(2000);
    ns.print(
      `Starting second weaken... Will finish at ${new Date(Date.now() + wt)}`
    );
    ns.run("scripts/weaken.js", threads, target, threads);
    await ns.sleep(wt - gt - 1000);
    ns.print(`Starting grow... Will finish at ${new Date(Date.now() + gt)}`);
    ns.run("scripts/grow.js", threads, target, threads);
    await ns.sleep(gt - ht - 3000);
    ns.print(`Starting hack... Will finish at ${new Date(Date.now() + ht)}`);
    ns.run("scripts/hack.js", threads, target, threads);
  }
}

export const main = batch;
