import { Message } from 'revolt.js';
import { CommandArguments } from './CommandArguments';

/**
 * Class storing a command message's context
 */
export default class CommandContext {
  message: Message;
  invocation: CommandArguments;

  constructor(message: Message, invocation: CommandArguments) {
    this.message = message;
    this.invocation = invocation;
  }
}
