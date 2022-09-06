import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import Checks from '../../util/Checks';
import { handleMentionErrors } from '../../util/mention';
import { Results } from '../../util/Results';

export default class MuteCommand implements Command {
  name = 'mute';
  description = `Mute a member so they can't talk in the server.`;
  category = CommandCategory.Moderation;
  usage = 'mute <@ping or ID> [time | leave empty to unmute]';
  alias = ['timeout'];

  async run(message: Message, context: CommandContext) {
    try {
      const target = await ArgsParser.asMention(
        message,
        context.invocation.args
      );

      const permission = 'TimeoutMembers';
      if (await Checks.canPerformModAction(message, target, permission)) {
        const length = ArgsParser.asTime(context.invocation.args[1]);

        if (length === 0) {
          // No length provided
          await target.edit({
            remove: ['Timeout'],
          });

          await context.send(
            message,
            `${Results.success} Timeout has been removed.`
          );
        } else if (!length) {
          // Incorrect length provided
          await context.send(message, `${Results.error} Incorrect length.`);
        } else if (length > 3153600000000) {
          // 100 years
          await context.send(
            message,
            `${Results.error} 100 years is the limit.`
          );
        } else {
          // Correct length provided
          await target.edit({
            timeout: new Date(Date.now() + length).toISOString(),
          });

          await context.send(
            message,
            `${Results.success} User has been timed out.`
          );
        }
      }
    } catch (e) {
      handleMentionErrors(message, e);
    }
  }
}
