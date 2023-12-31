import { findServer } from "./modules/findServer";

/**
 * Prepares all of the scripts on a server,
 * and initialises the batched hacking script.
 * @param {NS} ns The NetScript Module.
 */
export async function prepare(ns) {
  const target = ns.args[0];
  const exists = findServer(ns, target);
  if (!exists) {
    ns.print(`Target ${target} does not exist.`);
    return;
  }
  if (!ns.hasRootAccess(target)) {
    ns.nuke(target);
  }
  await ns.scp(["scripts/batch.js", "scripts/modules/findServer.js"], target);

  const memAvailable = ns.getServerMaxRam(target) - ns.getServerUsedRam(target);
  const memNeeded = ns.getScriptRam("scripts/batch.js", target);
  const threads = Math.floor(memAvailable / memNeeded);
  ns.tprint(`Available: ${memAvailable}`);
  ns.tprint(`Needed: ${memNeeded}`);
  ns.tprint(`Threads to run: ${threads}`);

  await ns.exec(`scripts/batch.js`, target, threads, target);
}

export const main = prepare;
