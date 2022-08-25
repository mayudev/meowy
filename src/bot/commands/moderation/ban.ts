import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import Checks from '../../util/Checks';
import { handleMentionErrors } from '../../util/mention';
import sanitize from '../../util/sanitize';

export default class BanCommand implements Command {
  name = 'ban';
  description = 'Ban a member';
  category = CommandCategory.Moderation;
  usage = 'ban [@ping or ID]';

  async run(message: Message, context: CommandContext) {
    try {
      const target = await ArgsParser.asMention(
        message,
        context.invocation.args
      );

      if (await Checks.canPerformModAction(message, target, 'BanMembers')) {
        await message.channel!.server!.banUser(target._id.user, {
          reason: `//by ${message.author?.username} via Meowy`,
        });

        message.channel?.sendMessage({
          content: `:white_check_mark: ${sanitize(
            target.nickname || target.user?.username || ''
          )} was **banned**`,
        });
      }
    } catch (e) {
      handleMentionErrors(message, e);
    }
  }
}
