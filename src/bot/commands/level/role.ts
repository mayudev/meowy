import { Message } from 'revolt.js';
import { themeColorBlue } from '../../../common/util';
import { getSelfroleList } from '../../handlers/selfroles';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import { Results } from '../../util/Results';
import sanitize from '../../util/sanitize';

export default class RoleCommand implements Command {
  name = 'role';
  description = 'Use self-assignable roles';
  category = CommandCategory.Level;
  usage = 'role <add|remove> <role name> | role list';
  alias = ['selfrole'];

  async run(message: Message, context: CommandContext) {
    const subcommand = context.invocation.args[0];

    if (subcommand === 'add' || subcommand === 'remove') {
      const target = context.invocation.args.slice(1).join(' ');

      if (!target) {
        return message.channel?.sendMessage({
          content: ':x: Specify role name.',
        });
      }

      const server = await context.controller.servers.mustFind(
        message.channel?.server_id!
      );

      const roles = message.channel?.server!.roles!;

      const targetId = Object.keys(roles).find(
        (role) => roles[role].name.toLowerCase() === target.toLowerCase()
      );

      if (!targetId || server.selfroles.indexOf(targetId) === -1) {
        return message.channel?.sendMessage({
          content: ':x: Role not found.',
        });
      }

      const currentRoles = Array.from(message.member!.roles || []);

      if (subcommand === 'add') {
        if (currentRoles.indexOf(targetId) > -1) {
          return message.channel?.sendMessage({
            content:
              'You already have this role. Use the remove command to get rid of it.',
          });
        }

        try {
          currentRoles.push(targetId);

          await message.member?.edit({
            roles: currentRoles,
          });

          return message.channel?.sendMessage({
            content: `${Results.success} Role added successfully.`,
          });
        } catch (e) {
          return message.channel?.sendMessage({
            content: `:x: Something went wrong. The bot is most likely above the role, or is missing some general permissions.`,
          });
        }
      } else {
        // Remove
        const index = currentRoles.indexOf(targetId);
        if (index === -1) {
          return message.channel?.sendMessage({
            content:
              'You do not have this role. Use the add command to get it.',
          });
        }

        try {
          currentRoles.splice(index, 1);

          await message.member?.edit({
            roles: currentRoles,
          });

          return message.channel?.sendMessage({
            content: `${Results.success} Role deleted successfully.`,
          });
        } catch (e) {
          return message.channel?.sendMessage({
            content: `:x: Something went wrong. The bot is most likely above the role, or is missing some general permissions.`,
          });
        }
      }
    } else if (subcommand === 'list') {
      const { roles } = await getSelfroleList(
        context.controller,
        message.channel!.server!
      );

      let description =
        roles.length > 0
          ? `### Available roles\n${roles
              .map((role) => `- \`${sanitize(role)}\``)
              .join('\n')}`
          : 'No roles available.';

      return message.channel?.sendMessage({
        embeds: [
          {
            title: 'meowy selfrole',
            colour: themeColorBlue,
            description,
          },
        ],
      });
    } else {
      return message.channel?.sendMessage({
        content: ':x: Unknown subcommand.',
      });
    }
  }
}
