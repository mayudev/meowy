import { Message } from 'revolt.js';
import CommandCategory from './CommandCategory';
import CommandContext from './CommandContext';

export default interface Command {
  name: string;
  description: string;
  usage?: string;

  category: CommandCategory;
  run: (message: Message, context: CommandContext) => Promise<any> | any;
}
