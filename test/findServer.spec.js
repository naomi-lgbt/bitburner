const { assert } = require("chai");
const { suite, test } = require("mocha");

const { main } = require("../scripts/findServer");

suite("findServer example test", () => {
  test("It uses the assert API", () => {
    assert.isFunction(main, "main is not a function");
  });
});
