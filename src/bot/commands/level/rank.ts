import { Message } from 'revolt.js';
import { determineExpRequired } from '../../handlers/level';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';

export default class RankCommand implements Command {
  name = 'rank';
  description = `Displays user's current level`;
  category = CommandCategory.Level;

  async run(message: Message, context: CommandContext) {
    const member = await context.controller.members.mustFind(
      message.author_id,
      message.channel!.server_id!
    );

    message.channel?.sendMessage({
      content: `Your current level is **${member.level}**. Exp: ${member.exp}/${
        determineExpRequired(member.level + 1) - 1
      }`,
    });
  }
}
