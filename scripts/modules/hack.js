/**
 * Hacks a target server.
 * @param {NS} ns The NetScript Module.
 * @param {string} target The name of the server to hack.
 */
export async function hack(ns, target) {
  await ns.hack(target);
}
