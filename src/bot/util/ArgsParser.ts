import { Client, Member, Message, User } from 'revolt.js';
import { UserNotFoundError, WrongArgumentError } from '../../common/errors';

export default class ArgsParser {
  /**
   * Find the first mention or user ID in a message
   * @param message Message object
   * @param args Command arguments
   * @returns Mentioned user's object
   * @throws {UserNotFoundError | WrongArgumentError},
   */
  static async asMention(message: Message, args: string[]) {
    let user: Member | undefined;

    if (message.mentions?.length! > 0) {
      // User mentioned
      user = await grabUser(message, message.mention_ids![0]);
    } else if (args.length > 0 && args[0].length === 26) {
      // ID provided directly

      user = await grabUser(message, args[0]);
    } else {
      throw new WrongArgumentError();
    }

    if (typeof user === 'undefined') throw new UserNotFoundError();
    else return user;
  }
}

async function grabUser(message: Message, id: string) {
  try {
    const first = await message.channel!.server!.fetchMember(id);
    return first;
  } catch (e) {
    return undefined;
  }
}
