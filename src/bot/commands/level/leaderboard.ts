import { Message } from 'revolt.js';
import { Member as RevoltMember } from 'revolt.js/dist/maps/Members';
import { themeColor } from '../../../common/util';
import { Member } from '../../../database/models/Member';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import { LeaderboardMember } from '../../types/internal/LeaderboardMember';
import sanitize from '../../util/sanitize';

export default class LeaderboardCommand implements Command {
  name = 'leaderboard';
  description = `Show server's most active users`;
  category = CommandCategory.Level;
  alias = ['top'];

  buildLeaderboard = (members: RevoltMember[], leaderboard: Member[]) =>
    leaderboard.map((user) => {
      const serverUser = members.find(
        (member) => member.user?._id === user.userId
      );

      const userObject = {
        userId: user.userId,
        exp: user.exp,
        level: user.level,
      } as Partial<LeaderboardMember>;

      if (serverUser) {
        userObject.nickname = serverUser.nickname || serverUser.user?.username;
      } else {
        userObject.nickname = 'Unknown';
      }

      return userObject as LeaderboardMember;
    });

  buildContent(leaderboard: LeaderboardMember[]) {
    return leaderboard
      .map(
        (u) => `#### ${sanitize(u.nickname)}
Level: **${u.level}** | Exp: ${u.exp}`
      )
      .join(`\n`);
  }

  async run(message: Message, context: CommandContext) {
    const top = await context.controller.members.findServerTop(
      message.channel!.server_id!,
      5
    );

    const members = await (
      await message.channel!.server!.fetchMembers()
    ).members;

    const leaderboard = this.buildLeaderboard(members, top);

    message.channel?.sendMessage({
      content: '',
      embeds: [
        {
          title: 'Leaderboard',
          colour: themeColor,
          icon_url: message.channel!.server!.generateIconURL(),
          description: this.buildContent(leaderboard),
        },
      ],
    });
  }
}
