/**
 * Mock class for the NS module.
 */
export class NS {
  /**
   * @class
   * @param {(boolean | string | number)[]} args Arguments passed to the function call.
   */
  constructor(args) {
    this.args = args;
    this._servers = [];
    this._logs = [];
  }

  /**
   * Checks if a server exists.
   * @param {string} server The name of the server.
   * @returns {boolean} Whether the server exists.
   */
  serverExists(server) {
    return this._servers.includes(server);
  }

  /**
   * Adds a message to the internal logs.
   * @param {string} message The message to log.
   */
  tprint(message) {
    this._logs.push(message);
  }

  /**
   * Eventually this will scan a server and return the connection path.
   * For the basic testing needs we have now, this just returns "home".
   * @param {string} server The name of the server to scan.
   * @returns {string[]} The list of servers to ssh into, in order, to reach the target server.
   */
  scan(server) {
    return ["home", server];
  }

  /**
   * Methods used for mocking.
   */

  /**
   * Adds a server to the server list.
   * @abstract
   * @param {string} server The server to add. MAY be turned into an object later?
   */
  addServer(server) {
    this._servers.push(server);
  }
}
