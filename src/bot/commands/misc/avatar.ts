import { Message } from 'revolt.js';
import { UserNotFoundError } from '../../../common/errors';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';

export default class AvatarCommand implements Command {
  name = 'avatar';
  description = `Display a user's avatar`;
  usage = 'avatar [@ping or user ID]';
  category = CommandCategory.Misc;

  async run(message: Message, context: CommandContext) {
    let url;

    try {
      const ping = ArgsParser.asMention(message, context.invocation.args);
      url = ping.generateAvatarURL();
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return message.reply('User not found');
      } else {
        url = message.author?.generateAvatarURL();
      }
    }

    message.channel?.sendMessage({
      content: `[Avatar](${url})`,
    });
  }
}
