import Command from '../types/Command';
import CommandContext from '../types/CommandContext';

export default class PingCommand implements Command {
  name = 'a';
  run = async (context: CommandContext) => {
    context.message.reply('pong');
  };
}
