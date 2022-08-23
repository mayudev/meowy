import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import sanitize from '../../util/sanitize';

export default class SayCommand implements Command {
  name = 'say';
  description = '';
  category = CommandCategory.Debug;

  async run(message: Message, context: CommandContext) {
    message.channel?.sendMessage({
      content: sanitize(context.invocation.join()),
    });
  }
}
