import { Message } from 'revolt.js';
import { UserNotFoundError, WrongArgumentError } from '../../common/errors';

export default class ArgsParser {
  /**
   * Find the first mention or user ID in a message
   * @param message Message object
   * @param args Command arguments
   * @returns Mentioned user's object
   * @throws UserNotFoundError
   */
  static asMention(message: Message, args: string[]) {
    let user;

    if (message.mentions?.length! > 0) {
      user = message.mentions![0];
    } else if (args.length > 0 && args[0].length === 26) {
      user = message.client.users.get(args[0]);
    } else {
      throw new WrongArgumentError();
    }

    if (typeof user === 'undefined') throw new UserNotFoundError();
    else return user;
  }
}
