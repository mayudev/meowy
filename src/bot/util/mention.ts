import { Member, Message } from 'revolt.js';
import { UserNotFoundError, WrongArgumentError } from '../../common/errors';

export function handleMentionErrors(message: Message, e: unknown) {
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

export function getDisplayName(member: Member) {
  return member.nickname || member.user?.username || '';
}
