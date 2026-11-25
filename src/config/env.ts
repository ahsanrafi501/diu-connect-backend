export function readConfig(env: NodeJS.ProcessEnv = process.env) {
  const rawPort = env.PORT ?? '4000';
  const port = Number(rawPort);

  if (!/^\d+$/.test(rawPort) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return { port };
}
