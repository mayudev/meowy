import { Message } from 'revolt.js';

export class Results {
  static success = ':white_check_mark:';
  static error = ':x:';

  static botHasNoPerms(permission?: string) {
    const str = permission ? ` (${permission})` : '';
    return `${this.error} Bot has insufficient permissions${str}`;
  }

  static userHasNoPerms(permission?: string) {
    const str = permission ? ` (${permission})` : '';
    return `${this.error} You have insufficient permissions${str}`;
  }
}

export async function sendResult(message: Message, content: string) {
  return message.channel?.sendMessage({
    content,
  });
}
