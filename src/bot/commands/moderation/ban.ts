import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import { addTemporaryBan } from '../../util/bans';
import Checks from '../../util/Checks';
import { getDisplayName, handleMentionErrors } from '../../util/mention';
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
        // Check ban length
        const length = ArgsParser.asTime(context.invocation.args[1]);

        if (!length || length === 0) {
          // No length was provided: permanent ban
          await message.channel!.server!.banUser(target._id.user, {
            reason: `//by ${message.author?.username} via Meowy`,
          });
          await message.channel?.sendMessage({
            content: `:white_check_mark: ${sanitize(
              getDisplayName(target)
            )} was **banned permanently**`,
          });
        } else {
          await addTemporaryBan(context, message, target._id.user, length);

          await message.channel?.sendMessage({
            content: `:white_check_mark: ${sanitize(
              getDisplayName(target)
            )} was **banned**`,
          });
        }
      }
    } catch (e) {
      handleMentionErrors(message, e);
    }
  }
}
