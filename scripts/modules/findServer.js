/**
 * Generates a command for reaching the
 * target server.
 * @param {NS} ns The NetScript Module.
 * @param {string} target The name of the server to fetch.
 * @returns {boolean} Whether the server exists or not.
 */
export function findServer(ns, target) {
  const targetExists = ns.serverExists(target);
  if (!targetExists) {
    ns.tprint(`Server ${target} does not exist.`);
    return false;
  }
  const serverTree = [target];
  while (serverTree[0] !== "home") {
    const scanResults = ns.scan(serverTree[0]);
    serverTree.unshift(scanResults[0]);
  }
  ns.tprint(
    `\nTo connect to this server, run this command:\n${serverTree
      .map((el) => `ssh ${el}`)
      .join(";")}`
  );
  return true;
}
