/**
 * Generates a command for reaching the
 * target server.
 *
 * @param {NS} ns The Netscript Module.
 */
function main(ns) {
  const targetServer = ns.args[0];
  const targetExists = ns.serverExists(targetServer);
  if (!targetExists) {
    ns.tprint(`Server ${targetServer} does not exist.`);
    return;
  }
  const serverTree = [targetServer];
  while (serverTree[0] !== "home") {
    const scanResults = ns.scan(serverTree[0]);
    serverTree.unshift(scanResults[0]);
  }
  ns.tprint(
    `\nTo connect to this server, run this command:\n${serverTree
      .map((el) => `ssh ${el}`)
      .join(";")}`
  );
}

module.exports = {
  main
};
