"use strict";

const assert = require("assert");
const dnt = require("../../lib/index.js");

describe("dnt", () => {
  it("dnt should be a function", () => {
    assert.strictEqual(typeof dnt.checkChanged, "function");
  });
});
