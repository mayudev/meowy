import { CommandArguments } from './CommandArguments';

/**
 * Class storing a command message's context
 */
export default class CommandContext {
  invocation: CommandArguments;

  constructor(invocation: CommandArguments) {
    this.invocation = invocation;
  }
}
