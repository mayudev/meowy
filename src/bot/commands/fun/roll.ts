import { Message } from 'revolt.js';
import { WrongArgumentError } from '../../../common/errors';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';

export default class RollCommand implements Command {
  name = 'roll';
  description = 'Rolls a dice';
  usage = 'roll [size from 1 to 1000]';
  category = CommandCategory.Fun;

  getSize(args: string[]) {
    if (args.length > 0) {
      const num = parseInt(args[0], 10);
      if (num > 0 && num <= 1000) {
        return num;
      } else throw new WrongArgumentError();
    } else return 6;
  }

  run(message: Message, context: CommandContext) {
    try {
      const size = this.getSize(context.invocation.args);
      const random = Math.floor(Math.random() * size) + 1;
      message.channel?.sendMessage(`:game_die: ${random}`);
    } catch (e) {
      if (e instanceof WrongArgumentError) {
        message.reply('Please specify a dice size between 1 and 1000.');
      }
    }
  }
}
