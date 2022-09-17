import { Member, Message, Server } from 'revolt.js';
import { UserNotFoundError } from '../../../common/errors';
import { themeColor } from '../../../common/util';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import ArgsParser from '../../util/ArgsParser';
import { getDisplayName } from '../../util/mention';
import { Results } from '../../util/Results';
import sanitize from '../../util/sanitize';

export default class UserCommand implements Command {
  name = 'user';
  description = 'Display information about a user';
  usage = 'user [@ping or user ID]';
  category = CommandCategory.Misc;
  alias = ['userinfo'];

  getRoleName(server: Server | undefined, role: string) {
    if (server?.roles![role]) {
      return sanitize(server!.roles![role].name);
    } else {
      return role;
    }
  }

  async run(message: Message, context: CommandContext) {
    let user: Member;
    try {
      user = await ArgsParser.asMention(message, context.invocation.args);
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return message.reply(Results.userNotFound);
      } else {
        if (typeof message.member === 'undefined') {
          return message.reply('Unknown error');
        } else {
          user = message.member;
        }
      }
    }

    const description = `**Username**
${sanitize(user.user?.username || '')}

**Account created at**
<t:${Math.floor((user.user?.createdAt || 0) / 1000)}:F>

**Joined at**
<t:${Math.floor(user.joined_at.getTime() / 1000)}:F>

**Roles**
${sanitize(
  user.roles?.map((role) => this.getRoleName(user.server, role)).join(', ') ||
    ''
)}
`;

    message.channel?.sendMessage({
      embeds: [
        {
          title: sanitize(getDisplayName(user)),
          icon_url: user.generateAvatarURL(),
          colour: themeColor,
          description,
        },
      ],
    });
  }
}
