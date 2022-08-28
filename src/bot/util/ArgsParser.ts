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

  /**
   * Parses time provided in [length][mark] form e.g.: 1s, 3h, 365y
   * Returns null if incorrect length was provided, 0 if no length was provided.
   */
  static asTime(arg: string) {
    if (!arg || arg.length === 0) {
      return 0;
    }

    let match = arg.match(/([0-9]{1,3}[smhdwy])/);

    if (!match) {
      return null;
    }

    const mark = match[0].at(-1); // smhdwy
    const num = Number(match[0].slice(0, -1));

    let multiplier = 1;

    switch (mark) {
      case 's':
        multiplier = 1;
        break;
      case 'm':
        multiplier = 60;
        break;
      case 'h':
        multiplier = 60 * 60;
        break;
      case 'd':
        multiplier = 60 * 60 * 24;
        break;
      case 'w':
        multiplier = 60 * 60 * 24 * 7;
        break;
      case 'y':
        multiplier = 60 * 60 * 24 * 365;
        break;
    }

    return multiplier * num * 1000;
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
