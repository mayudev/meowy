import { Message } from 'revolt.js';
import Command from './types/Command';
import { CommandArguments } from './types/CommandArguments';

const prefix = '?';

/**
 * Checks if the message is valid and should be processed by the bot.
 */
export function isMessageValid(message: Message) {
  return (
    // the message wasn't sent by the bot
    message.author_id != message.client.user?._id &&
    // content is not empty
    message.content
  );
}

export function isCommand(message: Message) {
  return message.content?.startsWith(prefix);
}

export function parseCommand(message: Message) {
  return new CommandArguments(message.content!);
}

export function registerCommand(command: Command) {}
