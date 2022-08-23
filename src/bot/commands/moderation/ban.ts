import { Message } from 'revolt.js';
import { UserNotFoundError, WrongArgumentError } from '../../../common/errors';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import { hasBanPermission } from '../../util/permissions';

export default class BanCommand implements Command {
  name = 'ban';
  description = 'Ban a member';
  category = CommandCategory.Moderation;
  usage = 'ban [@ping or ID]';

  async run(message: Message, context: CommandContext) {
    // TODO: move those checks to a separate function
    if (!(await hasBanPermission(message.member!, message.channel!.server!))) {
      return message.channel?.sendMessage({
        content: ':x: You cannot **ban members**',
      });
    }

    if (
      !(await hasBanPermission(
        message.channel!.server!.member!,
        message.channel!.server!
      ))
    ) {
      return message.channel?.sendMessage({
        content: ':x: The bot cannot **ban members**',
      });
    }

    try {
      const target = await ArgsParser.asMention(
        message,
        context.invocation.args
      );

      if (target._id.user === message.author_id) {
        return message.channel?.sendMessage({
          content: ':x: You cannot ban yourself.',
        });
      }

      if (target._id.user === message.client.user?._id) {
        return message.channel?.sendMessage({
          content: `:pleading_face: Please don't ban me`,
        });
      }

      await message.channel!.server!.banUser(target._id.user, {
        reason: `//by ${message.author?.username} via Meowy`,
      });
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return message.channel?.sendMessage({
          content: ':x: User not found',
        });
      } else if (e instanceof WrongArgumentError) {
        return message.channel?.sendMessage({
          content: ':x: User not mentioned',
        });
      } else {
        console.error(e);
      }
    }
  }
}
