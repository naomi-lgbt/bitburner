/**
 * Lists every single server available across
 * all networks.
 * @param {NS} ns The NetScript Module.
 * @returns {string[]} A list of all server names that could be found.
 */
export function getAllServers(ns) {
  const serverTree = ["home"];
  for (let i = 0; i < serverTree.length; i++) {
    const servers = ns.scan(serverTree[i]);
    const filtered = servers.filter((s) => !serverTree.includes(s));
    serverTree.push(...filtered);
  }
  return serverTree;
}
