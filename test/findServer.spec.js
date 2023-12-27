import { assert } from "chai";
import { suite, test } from "mocha";

import { main } from "../scripts/findServer.js";

suite("findServer example test", () => {
  test("It uses the assert API", () => {
    assert.isFunction(main, "main is not a function");
  });
});
