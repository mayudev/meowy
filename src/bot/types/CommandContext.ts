import DatabaseController from '../../database/controller';
import { CommandArguments } from './CommandArguments';

/**
 * Class storing a command message's context
 */
export default class CommandContext {
  constructor(
    public invocation: CommandArguments,
    public controller: DatabaseController
  ) {}
}
