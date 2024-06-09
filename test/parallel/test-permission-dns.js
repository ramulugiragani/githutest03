// Flags: --experimental-permission --allow-fs-read=*
'use strict';
require('../common');
const assert = require('assert');
const dns = require('dns');
const common = require('../common');

{
  const functions = [
    () => dns.lookup('example.com', () => {}),
    () => dns.lookupService('127.0.0.1', 22, () => {}),
    () => dns.reverse('8.8.8.8', () => {}),
    () => dns.resolveAny('example.com', () => {}),
    () => dns.resolve4('example.com', () => {}),
    () => dns.resolve6('example.com', () => {}),
    () => dns.resolveCaa('example.com', () => {}),
    () => dns.resolveCname('example.com', () => {}),
    () => dns.resolveMx('example.com', () => {}),
    () => dns.resolveNs('example.com', () => {}),
    () => dns.resolveTxt('example.com', () => {}),
    () => dns.resolveSrv('example.com', () => {}),
    () => dns.resolvePtr('example.com', () => {}),
    () => dns.resolveNaptr('example.com', () => {}),
    () => dns.resolveSoa('example.com', () => {}),
  ];
  for (let i = 0; i < functions.length; i++) {
    assert.throws(functions[i], /Error: Access to this API has been restricted/);
  }
}

{
  const resolvers = new dns.Resolver();
  const functions = [
    () => resolvers.reverse('8.8.8.8', () => {}),
    () => resolvers.resolveAny('example.com', () => {}),
    () => resolvers.resolve4('example.com', () => {}),
    () => resolvers.resolve6('example.com', () => {}),
    () => resolvers.resolveCaa('example.com', () => {}),
    () => resolvers.resolveCname('example.com', () => {}),
    () => resolvers.resolveMx('example.com', () => {}),
    () => resolvers.resolveNs('example.com', () => {}),
    () => resolvers.resolveTxt('example.com', () => {}),
    () => resolvers.resolveSrv('example.com', () => {}),
    () => resolvers.resolvePtr('example.com', () => {}),
    () => resolvers.resolveNaptr('example.com', () => {}),
    () => resolvers.resolveSoa('example.com', () => {}),
  ];
  for (let i = 0; i < functions.length; i++) {
    assert.throws(functions[i], /Error: Access to this API has been restricted/);
  }
}

{
  const functions = [
    () => dns.promises.lookup('example.com'),
    () => dns.promises.lookupService('127.0.0.1', 22),
    () => dns.promises.reverse('8.8.8.8'),
    () => dns.promises.resolveAny('example.com'),
    () => dns.promises.resolve4('example.com'),
    () => dns.promises.resolve6('example.com'),
    () => dns.promises.resolveCaa('example.com'),
    () => dns.promises.resolveCname('example.com'),
    () => dns.promises.resolveMx('example.com'),
    () => dns.promises.resolveNs('example.com'),
    () => dns.promises.resolveTxt('example.com'),
    () => dns.promises.resolveSrv('example.com'),
    () => dns.promises.resolvePtr('example.com'),
    () => dns.promises.resolveNaptr('example.com'),
    () => dns.promises.resolveSoa('example.com'),
  ];
  for (let i = 0; i < functions.length; i++) {
    assert.rejects(functions[i], /Error: Access to this API has been restricted/).then(common.mustCall());
  }
}
