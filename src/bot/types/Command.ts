import { Message } from 'revolt.js';
import CommandContext from './CommandContext';

export default interface Command {
  name: string;
  run: (message: Message, context: CommandContext) => Promise<any> | any;
}
