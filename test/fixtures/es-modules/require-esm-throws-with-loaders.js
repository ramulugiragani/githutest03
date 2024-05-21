'use strict';
const fixtures = require('../../common/fixtures');
const { readFile, __fromLoader } = require('fs');
const assert = require('assert');

const moduleName = fixtures.path('es-modules/test-esm-ok.mjs');
assert.throws(() => require(moduleName), { code: 'ERR_REQUIRE_ESM' });

assert(readFile);
assert(__fromLoader);
