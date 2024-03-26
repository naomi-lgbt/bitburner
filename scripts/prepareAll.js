import { getAllServers } from "./modules/getAllServers";

/**
 * Runs the prepare script on every server that can be found.
 * @param {NS} ns The NetScript module.
 */
export function prepareAll(ns) {
  const servers = getAllServers(ns);
  for (const server of servers) {
    // We don't need to prepare our home server.
    if (server === "home") {
      continue;
    }
    // kills all scripts on the server to prevent conflicts.
    ns.killall(server);
    ns.exec("scripts/prepare.js", "home", 1, server);
  }
}

export const main = prepareAll;
