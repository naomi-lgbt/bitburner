/**
 * Declarations for the NS module built into the game.
 * Note that this might be incomplete - definitions are added when we need them in a script,
 * so unused methods might be missing.
 */
declare type NS = {
  /**
   * Arguments passed to the script when it's run.
   */
  args: (string | number | boolean)[];
  /**
   * Function used to hack money from the server.
   * @async
   * @param {string} hostname The hostname of the target server.
   * @param {object} options The options object.
   * @returns {Promise<number>} The amount of money hacked from the server.
   */
  hack: (
    hostname: string,
    opts: { threads: number; stock: boolean }
  ) => Promise<number>;
  /**
   * Function used to increase the money available on a server.
   * @async
   * @param {string} hostname The hostname of the target server.
   * @param {object} options The options object.
   * @returns {Promise<number>} The amount by which the money on the server was multiplied.
   */
  grow: (
    hostname: string,
    opts: { threads: number; stock: boolean }
  ) => Promise<number>;
  /**
   * Function used to decrease the security rating of a server.
   * @async
   * @param {string} hostname The hostname of the target server.
   * @param {object} options The options object.
   * @returns {Promise<number>} The amount by which the security level was decreased.
   */
  weaken: (hostname: string, opts: { threads: number }) => Promise<number>;
  /**
   * Function used to pause script execution.
   * @param {number} n The number of milliseconds to sleep.
   */
  sleep: (n: number) => Promise<void>;
  /**
   * Prints values to the script's logs.
   * @param {any} args Values to be printed.
   */
  print: (...args: any[]) => void;
  /**
   * Prints values to the terminal.
   * @param {any} args Values to be printed.
   */
  tprint: (...args: any[]) => void;
  /**
   * Disables logging for the given function.
   * @param {string} functionName Name of the function to disable logging for. Pass `ALL` to disable all logging.
   */
  disableLog: (functionName: string) => void;
  /**
   * Enables logging for the given function.
   * @param {string} functionName Name of the function to enable logging for. Pass `ALL` to re-enable all logging.
   */
  enableLog: (functionName: string) => void;
  /**
   * Confirms if logging is enabled for a function.
   * @param {string} functionName Name of the function to check.
   * @returns {boolean} True if the logs are enabled.
   */
  isLogEnbaled: (functionName: string) => boolean;
  /**
   * Scans for avaialable servers to connect to.
   * @param {string} hostName The name of the server to scan.
   * @returns {string[]} An array of server names directly connected to the hostName.
   */
  scan: (hostName: string) => string[];
  /**
   * Runs the NUKE.exe program, which grants root access on the server.
   * @param {string} hostName The name of the host to nuke.
   */
  nuke: (hostName: string) => void;
  /**
   * Runs the BruteSSH.exe program, which unlocks the SSH port.
   * @param {string} hostName The name of the host to run on.
   */
  brutessh: (hostName: string) => void;
  /**
   * Runs the FTPCrack.exe program, which unlocks the FTP port.
   * @param {string} hostName The name of the host to run on.
   */
  ftpcrack: (hostName: string) => void;
  /**
   * Runs the RelaySMTP.exe program, which unlocks the SMTP port.
   * @param {string} hostName The name of the host to run on.
   */
  relaysmtp: (hostName: string) => void;
  /**
   * Runs the HTTPWorm.exe program, which unlocks the HTTP port.
   * @param {string} hostName The name of the host to run on.
   */
  httpworm: (hostName: string) => void;
  /**
   * Runs the SQLInject.exe program, which unlocks the SQL port.
   * @param {string} hostName The name of the host to run on.
   */
  sqlinject: (hostName: string) => void;
  /**
   * Spawns a separate process to run the script, passing the `args` to that script.
   * @param {string} script The name (including path) of the script to run.
   * @param {number} numThreads The number of threads to run (1 by default).
   * @param {any} args The arguments to pass to the new script.
   * @returns {number} The process ID of the new script.
   */
  run: (script: string, numThreads: number, ...args: any) => number;
  /**
   * Spawns a separate process on a remote server to run the script, passing the `args` to that script.
   * @param {string} script The name (including path) of the script to run.
   * @param {string} hostName The name of the server to run on.
   * @param {number} numThreads The number of threads to run (1 by default).
   * @param {any} args The arguments to pass to the new script.
   * @returns {number} The process ID of the new script.
   */
  exec: (
    script: string,
    hostName: string,
    numThreads: number,
    ...args: any
  ) => number;
  /**
   * Terminates the existing process, then loads the specified script. This prevents RAM usage collision.
   * @param {string} script The name of the script to run.
   * @param {number} numThreads The number of threads to run. MUST BE GREATER THAN 0.
   * @param {any} args The arguments to pass to the new script.
   */
  spawn: (script: string, numThreads: number, ...args: any) => void;
  /**
   * Terminates the script with the given ID.
   * @param {number} pId The process ID to terminate.
   * @returns {boolean} True if the script was killed.
   */
  kill: (pId: number) => boolean;
  /**
   * Terminates all scripts on the target server.
   * @param {string} hostName The name of the server to target.
   * @returns {boolean} True if scripts were killed.
   */
  killall: (hostName: string) => boolean;
  /**
   * Copies the file from the source server to the destination server.
   * @async
   * @param {string | string[]} files File name or array of file names to copy.
   * @param {string} source Hostname of the source server (defaults to current server).
   * @param {string} destination Hostname of the destination server.
   * @returns {boolean} True if at least one file was copied.
   */
  scp: (
    files: string | string[],
    source: string,
    destination: string
  ) => Promise<boolean>;
  /**
   * Lists all files in the server in order.
   * @param {string} hostName The server to look at.
   * @param {string} grep The substring to filter by.
   */
  ls: (hostName: string, grep?: string) => string[];
  /**
   * Lists all running processes on the given server.
   * @param {string} hostName The server to look at. Defaults to current server.
   * @returns {object[]} An array of process information objects.
   */
  ps: (
    hostName: string
  ) => { filename: string; threads: number; args: string[]; pid: number }[];
  /**
   * Checks if you have root access on the server.
   * @param {string} hostName The server to check.
   * @returns {boolean} True if you have root access.
   */
  hasRootAccess: (hostName: string) => boolean;
  /**
   * Returns your current hacking level.
   * @returns {number} Your current hacking level.
   */
  getHackingLevel: () => number;
  /**
   * Returns a list of your hacking multipliers.
   * @returns {object} Your hacking multipliers.
   */
  getHackingMultipliers: () => {
    chance: number;
    speed: number;
    money: number;
    growth: number;
  };
  /**
   * Gets your Hacknet multipliers
   * @returns {object} Your Hacknet multipliers
   */
  getHacknetMultipliers: () => {
    production: number;
    purchaseCost: number;
    ramCost: number;
    coreCost: number;
    levelCost: number;
  };
  /**
   * Checks the amount of money available on the server.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The money available on the server.
   */
  getServerMoneyAvailable: (hostName: string) => number;
  /**
   * Checks the maximum amount of money the server can hold.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The money capacity of the server.
   */
  getServerMaxMoney: (hostName: string) => number;
  /**
   * Checks the security level of the server.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The security level of the server.
   */
  getServerSecurityLevel: (hostName: string) => number;
  /**
   * Gets the minimum security level of the server.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The minimum security level of the server.
   */
  getServerMinSecurityLevel: (hostName: string) => number;
  /**
   * Gets the required hacking level for the server.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The required hacking level of the server.
   */
  getServerRequiredHackingLevel: (hostName: string) => number;
  /**
   * Gets the number of required ports open to NUKE the server.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The number of ports that must be opened.
   */
  getServerNumPortsRequired: (hostName: string) => number;
  /**
   * Gets the maximum RAM available on the server.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The amount of RAM available on the server (in GB).
   */
  getServerMaxRam: (hostName: string) => number;
  /**
   * Gets the amount of RAM currently in use on the server.
   * @param {string} hostName The name of the server to check.
   * @returns {number} The amount of RAM in use on the server.
   */
  getServerUsedRam: (hostName: string) => number;
  /**
   * Checks if the server exists.
   * @param {string} hostName The name of the server to check.
   * @returns {boolean} True if the server exists.
   */
  serverExists: (hostName: string) => boolean;
  /**
   * Check if the given file exists.
   * @param {string} fileName The name of the file to look for.
   * @param {string} hostName The name of the server to check (defaults to current server).
   * @returns {boolean} True if the file exists on the server.
   */
  fileExits: (fileName: string, hostName: string) => boolean;
  /**
   * Check if the given script is running. Note that scripts are looked at by both name AND
   * arguments, so they must match exactly.
   * @param {string} script The name of the script to check.
   * @param {string} hostName The name of the server to check.
   * @param {string[]} args The arguments the script should have.
   * @returns {boolean} True if the script is running.
   */
  isRunning: (script: string, hostName: string, args: string[]) => boolean;
  /**
   * Hacknet Namespace
   */
  hacknet: {
    /**
     * Get the number of Hacknet nodes you own.
     * @returns {number} The number of nodes you own.
     */
    numNodes: () => number;
    /**
     * Purchase a new node.
     * @returns {number} The new node's number, or -1 on failure.
     */
    purchaseNode: () => number;
    /**
     * Get the cost of purchasing a new node.
     * @returns {number} The cost of a new node.
     */
    getPurchaseNodeCost: () => number;
    /**
     * Get the stats of a node.
     * @param {number} index The index of the node to look up.
     * @returns {object} The node's stats.
     */
    getNodeStats: (index: number) => {
      name: string;
      level: number;
      ram: number;
      cores: number;
    };
    /**
     * Upgrades a node's level.
     * @param {number} index The index of the node to upgrade.
     * @param {number} num The number of upgrades to purchase.
     * @returns {boolean} True if the upgrade was successful.
     */
    upgradeLevel: (index: number, num: number) => boolean;
    /**
     * Upgrades a node's RAM.
     * @param {number} index The index of the node to upgrade.
     * @param {number} num The number of upgrades to purchase.
     * @returns {boolean} True if the upgrade was successful.
     */
    upgradeRam: (index: number, num: number) => boolean;
    /**
     * Upgrades a node's cores.
     * @param {number} index The index of the node to upgrade.
     * @param {number} num The number of upgrades to purchase.
     * @returns {boolean} True if the upgrade was successful.
     */
    upgradeCore: (index: number, num: number) => boolean;
    /**
     * Gets the cost to upgrade a node's level.
     * @param {number} index The index of the node to upgrade.
     * @param {number} num The number of upgrades to calculate.
     * @returns {number} The cost to purchase the upgrades.
     */
    getLevelUpgradeCost: (index: number, num: number) => number;
    /**
     * Gets the cost to upgrade a node's RAM.
     * @param {number} index The index of the node to upgrade.
     * @param {number} num The number of upgrades to calculate.
     * @returns {number} The cost to purchase the upgrades.
     */
    getRamUpgradeCost: (index: number, num: number) => number;
    /**
     * Gets the cost to upgrade a node's cores.
     * @param {number} index The index of the node to upgrade.
     * @param {number} num The number of upgrades to calculate.
     * @returns {number} The cost to purchase the upgrades.
     */
    getCoreUpgradeCost: (index: number, num: number) => number;
  };
};
