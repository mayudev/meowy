import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import Checks from '../../util/Checks';
import { getDisplayName, handleMentionErrors } from '../../util/mention';
import sanitize from '../../util/sanitize';

export default class KickCommand implements Command {
  name = 'kick';
  description = 'Kick a member';
  category = CommandCategory.Moderation;
  usage = 'kick [@ping or ID]';

  async run(message: Message, context: CommandContext) {
    try {
      const target = await ArgsParser.asMention(
        message,
        context.invocation.args
      );

      if (await Checks.canPerformModAction(message, target, 'KickMembers')) {
        const displayname = getDisplayName(target);

        await target.kick();

        await message.channel?.sendMessage({
          content: `:white_check_mark: ${sanitize(displayname)} was **kicked**`,
        });
      }
    } catch (e) {
      handleMentionErrors(message, e);
    }
  }
}
