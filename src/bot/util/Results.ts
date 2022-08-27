import { Message } from 'revolt.js';

const success = ':white_check_mark:';
const error = ':x:';

export class Results {
  static botHasNoPerms(permission?: string) {
    const str = permission ? ` (${permission})` : '';
    return `${error} Bot has insufficient permissions${str}`;
  }

  static userHasNoPerms(permission?: string) {
    const str = permission ? ` (${permission})` : '';
    return `${error} You have insufficient permissions${str}`;
  }
}

export async function sendResult(message: Message, content: string) {
  return message.channel?.sendMessage({
    content,
  });
}
