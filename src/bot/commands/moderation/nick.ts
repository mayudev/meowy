import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import Checks from '../../util/Checks';
import { handleMentionErrors } from '../../util/mention';

export default class NickCommand implements Command {
  name = 'nick';
  description = `Change a member's nickname`;
  category = CommandCategory.Moderation;
  usage = 'nick <@ping or ID> [nickname | leave empty to reset]';

  async run(message: Message, context: CommandContext) {
    try {
      const target = await ArgsParser.asMention(
        message,
        context.invocation.args
      );

      if (!Checks.botHasPermission(message, 'ManageNicknames')) {
        console.error('no perms');
        // TODO implement unified bot error messages
      } else if (!Checks.userHasPermission(message, 'ManageNicknames')) {
        // TODO
      } else {
        const nickname = context.invocation.reason();

        if (nickname.length > 0) {
          await target.edit({
            nickname,
          });

          await message.channel?.sendMessage({
            content: `:white_check_mark: Username changed`,
          });
        } else {
          await target.edit({
            remove: ['Nickname'],
          });

          await message.channel?.sendMessage({
            content: `:white_check_mark: Username has been reset.`,
          });
        }
      }
    } catch (e) {
      handleMentionErrors(message, e);
    }
  }
}
