import { Message } from 'revolt.js';
import Command from '../types/Command';
import CommandContext from '../types/CommandContext';

export default class PingCommand implements Command {
  name = 'a';
  run = async (message: Message, context: CommandContext) => {
    message.reply('pong');
  };
}
