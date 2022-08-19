import { Message } from 'revolt.js';
import Command from '../types/Command';
import CommandCategory from '../types/CommandCategory';
import CommandContext from '../types/CommandContext';

export default class PingCommand implements Command {
  name = 'ping';
  description = 'Simple test command';
  category = CommandCategory.Misc;

  run = async (message: Message, context: CommandContext) => {
    message.reply('pong');
  };
}
