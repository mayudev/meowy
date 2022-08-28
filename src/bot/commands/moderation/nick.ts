import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import Checks from '../../util/Checks';
import { handleMentionErrors } from '../../util/mention';
import { Results } from '../../util/Results';

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

      const permission = 'ManageNicknames';

      if (await Checks.checkPermission(message, permission)) {
        const nickname = context.invocation.reason();

        if (nickname.length > 0) {
          await target.edit({
            nickname,
          });

          await context.send(message, `${Results.success} Username changed`);
        } else {
          await target.edit({
            remove: ['Nickname'],
          });

          await context.send(
            message,
            `${Results.success} Username has been reset.`
          );
        }
      }
    } catch (e) {
      handleMentionErrors(message, e);
    }
  }
}
