import { Member, Message, Server } from 'revolt.js';

const rawMessages = (intent: string) => ({
  NoUserPermissions: `:x: You cannot **${intent} members**`,
  NoBotPermissions: `:x: The bot cannot **${intent} members**`,
  BanYourself: `:x: You cannot ${intent} yourself.`,
  BanBot: `:pleading_face: Please don't ${intent} me`,
});

type AllowedActions = 'BanMembers' | 'KickMembers';

enum Target {
  Neither,
  Bot,
  Author,
}

function hasPermission(member: Member, server: Server, action: AllowedActions) {
  return member.hasPermission(server, action);
}

export default class Checks {
  /**
   * Checks if the bot has enough permissions to perform the action
   */
  static botHasPermission(message: Message, action: AllowedActions) {
    return hasPermission(
      message.channel!.server!.member!,
      message.channel!.server!,
      action
    );
  }

  /**
   * Checks if the invoking user has enough permissions to perform the action
   */
  static userHasPermission(message: Message, action: AllowedActions) {
    return hasPermission(message.member!, message.channel!.server!, action);
  }

  /**
   * Checks if the target is the bot or the user themselves
   */
  static checkTarget(message: Message, target: Member) {
    switch (target._id.user) {
      case message.author_id:
        return Target.Author;
      case message.client.user?._id:
        return Target.Bot;
      default:
        return Target.Neither;
    }
  }

  /**
   * canPerformModAction checks if a moderation action can be performed.
   * It sends the appropriate error message if not.
   */
  static async canPerformModAction(
    message: Message,
    target: Member,
    action: AllowedActions,
    silent: boolean = false
  ) {
    const Messages = rawMessages(action === 'BanMembers' ? 'ban' : 'kick');

    // Check if user invoking the command has enough permissions
    if (!this.userHasPermission(message, action)) {
      if (!silent)
        message.channel?.sendMessage({
          content: Messages.NoUserPermissions,
        });

      return false;
    }

    // Check if the bot has enough permissions
    if (!this.botHasPermission(message, action)) {
      if (!silent)
        message.channel?.sendMessage({
          content: Messages.NoBotPermissions,
        });

      return false;
    }

    // Check if the user wants to ban themselves or the bot
    switch (this.checkTarget(message, target)) {
      case Target.Author:
        if (!silent)
          message.channel?.sendMessage({
            content: Messages.BanYourself,
          });
        return false;
      case Target.Bot:
        if (!silent)
          message.channel?.sendMessage({
            content: Messages.BanBot,
          });
        return false;
      case Target.Neither:
        return true;
    }
  }
}
