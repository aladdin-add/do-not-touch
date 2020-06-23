'use strict';

const assert = require('assert');
const add = require('../../lib/index.js');

describe('add', () => {
  it('1 + 1 === 2', () => {
    assert.strictEqual(add(1, 1), 2);
  });
});

