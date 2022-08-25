import { Member, Message, Server } from 'revolt.js';

const rawMessages = (intent: string) => ({
  NoUserPermissions: `:x: You cannot **${intent} members**`,
  NoBotPermissions: `:x: The bot cannot **${intent} members**`,
  BanYourself: `:x: You cannot ${intent} yourself.`,
  BanBot: `:pleading_face: Please don't ${intent} me`,
});

type AllowedActions = 'BanMembers' | 'KickMembers';

function hasPermission(member: Member, server: Server, action: AllowedActions) {
  return member.hasPermission(server, action);
}

export default class Checks {
  /**
   * canPerformModAction checks if a moderation action can be performed.
   * It sends the appropriate error message if not.
   */
  static async canPerformModAction(
    message: Message,
    target: Member,
    action: AllowedActions
  ) {
    const Messages = rawMessages(action === 'BanMembers' ? 'ban' : 'kick');

    // Check if user invoking the command has enough permissions
    if (!hasPermission(message.member!, message.channel!.server!, action)) {
      message.channel?.sendMessage({
        content: Messages.NoUserPermissions,
      });

      return false;
    }

    // Check if the bot has enough permissions
    if (
      !hasPermission(
        message.channel!.server!.member!,
        message.channel!.server!,
        action
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
