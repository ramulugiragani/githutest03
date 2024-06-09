// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';
const common = require('../common');
const tmpdir = require('../common/tmpdir');
const assert = require('assert');
const cluster = require('cluster');
const fs = require('fs');
const path = require('path');

const totalWorkers = 2;

// Cluster setup
if (cluster.isWorker) {
  const http = require('http');
  http.Server(() => {}).listen(0, '127.0.0.1');
  process.on('exit', () => {
    fs.writeFileSync(
      process.env.DONE_FILE_PATTERN.replace('$pid', process.pid), 'done');
  });
} else if (process.argv[2] === 'cluster') {
  // Send PID to testcase process
  let forkNum = 0;
  cluster.on('fork', common.mustCall(function forkEvent(worker) {
    // Send PID
    process.send({
      cmd: 'worker',
      workerPID: worker.process.pid
    });

    // Stop listening when done
    if (++forkNum === totalWorkers) {
      cluster.removeListener('fork', forkEvent);
    }
  }, totalWorkers));

  // Throw accidental error when all workers are listening
  let listeningNum = 0;
  cluster.on('listening', common.mustCall(function listeningEvent() {
    // When all workers are listening
    if (++listeningNum === totalWorkers) {
      // Stop listening
      cluster.removeListener('listening', listeningEvent);

      // Throw accidental error
      process.nextTick(() => {
        throw new Error('accidental error');
      });
    }
  }, totalWorkers));

  // Startup a basic cluster
  cluster.fork();
  cluster.fork();
} else {
  // This is the testcase
  tmpdir.refresh();
  const doneFilePattern = path.resolve(tmpdir.path, 'done-$pid');
  process.env.DONE_FILE_PATTERN = doneFilePattern;

  const fork = require('child_process').fork;

  // List all workers
  const workers = [];

  // Spawn a cluster process
  const primary = fork(process.argv[1], ['cluster'], { silent: true });

  // Handle messages from the cluster
  primary.on('message', common.mustCall((data) => {
    // Add worker pid to list and progress tracker
    if (data.cmd === 'worker') {
      workers.push(data.workerPID);
    }
  }, totalWorkers));

  // When cluster is dead
  primary.on('exit', common.mustCall((code) => {
    // Check that the cluster died accidentally (non-zero exit code)
    assert.strictEqual(code, 1);

    const pollWorkers = () => {
      // When master is dead all workers should be dead too
      if (workers.some(
        (pid) => !fs.existsSync(doneFilePattern.replace('$pid', pid)))) {
        setTimeout(pollWorkers, 50);
      }
    };

    // Loop indefinitely until worker exit
    pollWorkers();
  }));
}
