// Flags: --expose-internals

'use strict';

const common = require('../common');
if (!common.hasCrypto)
  common.skip('missing crypto');
const assert = require('assert');
const h2 = require('http2');
const { kSocket } = require('internal/http2/util');
const { once } = require('events');

const server = h2.createServer();

// We use the lower-level API here
server.on('stream', common.mustCall(onStream));

function onStream(stream) {
  stream.respond();
  stream.write('test');

  const socket = stream.session[kSocket];

  // When the socket is destroyed, the close events must be triggered
  // on the socket, server and session.
  socket.on('close', common.mustCall());
  stream.on('close', common.mustCall());
  server.on('close', common.mustCall());
  stream.session.on('close', common.mustCall(() => server.close()));

  // Also, the aborted event must be triggered on the stream
  stream.on('aborted', common.mustCall());

  assert.notStrictEqual(stream.session, undefined);

  stream.once('error', common.expectsError({
    name: 'Error',
    code: 'ERR_HTTP2_STREAM_ERROR',
    message: 'Stream closed with error code NGHTTP2_CANCEL'
  }));

  // Do not use destroy() as it sends FIN on Linux.
  // On macOS, it sends RST.

  // Always send RST.
  socket.resetAndDestroy();
}

server.listen(0);

server.on('listening', common.mustCall(async () => {
  const client = h2.connect(`http://localhost:${server.address().port}`);
  client.on('error', common.expectsError({
    name: 'Error',
    code: 'ECONNRESET',
    message: 'read ECONNRESET'
  }));
  client.on('close', common.mustCall());

  const req = client.request({ ':method': 'POST' });
  req.on('error', common.expectsError({
    name: 'Error',
    code: 'ECONNRESET',
    message: 'read ECONNRESET'
  }));

  req.on('aborted', common.mustCall());
  req.resume();

  try {
    await once(req, 'end');
  } catch {
    // Continue regardless of error.
  }
}));
