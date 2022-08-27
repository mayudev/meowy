import { Message } from 'revolt.js';
import DatabaseController from '../../database/controller';
import { sendResult } from '../util/Results';
import { CommandArguments } from './CommandArguments';

/**
 * Class storing a command message's context
 */
export default class CommandContext {
  constructor(
    public invocation: CommandArguments,
    public controller: DatabaseController
  ) {}

  /**
   * A shorthand to send a reply message
   */
  async send(message: Message, content: string) {
    return sendResult(message, content);
  }
}
