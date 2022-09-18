import { Member, Message, Server } from 'revolt.js';
import { Results } from './Results';

const rawBanMessages = {
  BanYourself: `:x: You cannot ban yourself.`,
  BanBot: `:pleading_face: Please don't ban me`,
};

const rawMessages = {
  BanYourself: `:x: You cannot perform this action on yourself.`,
  BanBot: `:x: You cannot perform this action on me.`,
};

export type AllowedActions =
  | 'BanMembers'
  | 'KickMembers'
  | 'ManageNicknames'
  | 'TimeoutMembers'
  | 'ManageRole';

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
   * checkPermission checks if both bot and the invoking user have enough permissions
   * to perform an action.
   * It send the appropriate error message if not.
   */
  static async checkPermission(
    message: Message,
    action: AllowedActions,
    silent: boolean = false
  ) {
    if (!Checks.userHasPermission(message, action)) {
      if (!silent)
        await message.channel?.sendMessage({
          content: Results.userHasNoPerms(action),
        });

      return false;
    } else if (!Checks.botHasPermission(message, action)) {
      if (!silent)
        await message.channel?.sendMessage({
          content: Results.botHasNoPerms(action),
        });
      return false;
    } else {
      return true;
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
    const Messages = action === 'BanMembers' ? rawBanMessages : rawMessages;

    // Check if user invoking the command and bot have enough permissions
    if (!(await this.checkPermission(message, action, silent))) return false;

    // Check if the user wants to ban themselves or the bot
    switch (this.checkTarget(message, target)) {
      case Target.Author:
        if (!silent)
          await message.channel?.sendMessage({
            content: Messages.BanYourself,
          });
        return false;
      case Target.Bot:
        if (!silent)
          await message.channel?.sendMessage({
            content: Messages.BanBot,
          });
        return false;
      case Target.Neither:
        return true;
    }
  }
}
