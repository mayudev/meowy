import { Member, Message } from 'revolt.js';
import { hasBanPermission } from './permissions';

const Messages = {
  NoUserPermissions: ':x: You cannot **ban members**',
  NoBotPermissions: ':x: The bot cannot **ban members**',
  BanYourself: ':x: You cannot ban yourself.',
  BanBot: `:pleading_face: Please don't ban me`,
};

export default class Checks {
  /**
   * canBan checks if an action of banning can be performed.
   * It sends the appropriate error message if not.
   */
  static async canBan(message: Message, target: Member) {
    // Check if user invoking the command has enough permissions
    if (!hasBanPermission(message.member!, message.channel!.server!)) {
      message.channel?.sendMessage({
        content: Messages.NoUserPermissions,
      });

      return false;
    }

    // Check if the bot has enough permissions
    if (
      !hasBanPermission(
        message.channel!.server!.member!,
        message.channel!.server!
      )
    ) {
      message.channel?.sendMessage({
        content: Messages.NoBotPermissions,
      });

      return false;
    }

    // Check if the user wants to ban themselves
    if (target._id.user === message.author_id) {
      message.channel?.sendMessage({
        content: Messages.BanYourself,
      });

      return false;
    }

    // Check if the user wants to ban the bot
    if (target._id.user === message.client.user?._id) {
      message.channel?.sendMessage({
        content: Messages.BanBot,
      });

      return false;
    }

    return true;
  }
}
