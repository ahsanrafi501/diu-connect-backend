import { app } from './app.js';
import { readConfig } from './config/env.js';

const { port } = readConfig();
const server = app.listen(port, () => {
  console.log(`DIU Connect API listening on port ${port}`);
});

let stopping = false;

function shutdown() {
  if (stopping) return;
  stopping = true;

  const deadline = setTimeout(() => {
    console.error('HTTP shutdown timed out');
    server.closeAllConnections();
    process.exitCode = 1;
  }, 10_000);
  deadline.unref();

  server.close((error) => {
    clearTimeout(deadline);
    if (error) {
      console.error('HTTP shutdown failed', error);
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
