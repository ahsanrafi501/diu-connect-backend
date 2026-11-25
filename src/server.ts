import { app } from './app.js';
import { readConfig } from './config/env.js';

const { port } = readConfig();

app.listen(port, () => {
  console.log(`DIU Connect API listening on port ${port}`);
});
