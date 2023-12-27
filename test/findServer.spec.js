import { assert } from "chai";
import { suite, test } from "mocha";

import { main } from "../scripts/findServer.js";

import { NS } from "./__mocks__/NetScript.mock.js";

suite("findServer script", () => {
  test("prints correct value when target server does not exist", () => {
    const ns = new NS(["target"]);
    main(ns);
    assert.include(ns._logs, "Server target does not exist.");
  });

  test("prints correct ssh commands when server found", () => {
    const ns = new NS(["target"]);
    ns.addServer("target");
    main(ns);
    assert.include(
      ns._logs,
      `\nTo connect to this server, run this command:\nssh home;ssh target`
    );
  });
});
