import 'dotenv/config';
import { InvalidConfigError } from '../common/errors';

/**
 * Reads an environment variable.
 */
export function readConfig(property: string) {
  return process.env[property];
}

/**
 * Reads the bot token.
 * @throws InvalidConfigError
 */
export function readToken() {
  const token = readConfig('TOKEN');

  if (!token) {
    throw new InvalidConfigError();
  } else {
    return token;
  }
}
