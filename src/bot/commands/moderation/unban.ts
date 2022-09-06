import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import Checks from '../../util/Checks';
import { handleMentionErrors } from '../../util/mention';

export default class UnbanCommand implements Command {
  name = 'unban';
  description = 'Unban a specified member';
  category = CommandCategory.Moderation;
  usage = 'unban [@ping or ID]';

  async run(message: Message, context: CommandContext) {
    try {
      const target = await ArgsParser.asULID(context.invocation.args[0]);

      if (await Checks.checkPermission(message, 'BanMembers')) {
        message.channel!.server!.unbanUser(target);

        await context.controller.bans.findAndDelete(
          message.author_id,
          message.channel!.server_id!
        );

        await message.channel?.sendMessage({
          content: `:white_check_mark: User has been unbanned`,
        });
      }
    } catch (e) {
      handleMentionErrors(message, e);
    }
  }
}
