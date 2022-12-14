import { Message } from 'revolt.js';
import { themeColorBlue } from '../../../common/util';
import { getSelfroleList, getSelfroles } from '../../handlers/selfroles';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import Checks from '../../util/Checks';
import { Results } from '../../util/Results';
import { getMembersHighestRole } from '../../util/roles';
import sanitize from '../../util/sanitize';

export default class RoleAdmCommand implements Command {
  name = 'roleadm';
  description = 'Manage self-assignable roles';
  category = CommandCategory.Moderation;
  usage = 'roleadm <add|remove> <role name> | roleadm list';
  alias = ['selfroleadm', 'rolemanage', 'mrole'];

  async getServer(context: CommandContext, id: string) {
    return context.controller.servers.mustFind(id);
  }

  async run(message: Message, context: CommandContext) {
    if (
      (await Checks.checkPermission(message, 'ManageRole')) &&
      (await Checks.checkPermission(message, 'AssignRoles'))
    ) {
      const subcommand = context.invocation.args[0];
      const serverId = message.channel?.server_id!;
      const target = context.invocation.args.slice(1).join(' ');

      if (subcommand === 'add' || subcommand === 'remove') {
        if (!target) {
          return message.channel?.sendMessage({
            content: ':x: Specify the role name.',
          });
        }

        const roles = message.channel?.server!.roles;

        if (!roles) {
          return message.channel?.sendMessage({
            content: ':x: The server has no roles available.',
          });
        }

        const server = await this.getServer(context, serverId);
        const selfroles = Array.from(server.selfroles);

        const roleIds = Object.keys(roles);

        let targetId;

        // Try to find by ID
        if (
          target.length === 26 &&
          (roleIds.indexOf(target) > -1 ||
            (selfroles.indexOf(target) > -1 && subcommand === 'remove')) // allow removal of invalid roles
        ) {
          targetId = target;
        } else {
          // Otherwise name
          targetId = roleIds.find(
            (role) => roles[role].name.toLowerCase() === target.toLowerCase()
          );
        }

        if (!targetId) {
          return message.channel?.sendMessage({
            content: ':x: The role was not found.',
          });
        }

        if (subcommand === 'add') {
          // Rank check
          const highestRank = getMembersHighestRole(message.member!)?.rank;
          const targetRank = roles[targetId].rank;

          // Lower rank - more important
          if (
            typeof highestRank === 'undefined' ||
            (typeof targetRank !== 'undefined' && highestRank >= targetRank)
          ) {
            return message.channel?.sendMessage({
              content: `:x: This role is higher or equal to highest role. (your rank: ${highestRank}, role rank: ${targetRank})`,
            });
          }

          // Rank warning
          const botRank = getMembersHighestRole(
            message.channel!.server!.member!
          )?.rank;
          if ((botRank || 0) > (targetRank || -1)) {
            message.channel?.sendMessage({
              content: `:warning: Bot may be unable to give this role to members due to rankings. Please make sure bot's highest rank is more important (lower number) than the role rank. Bot rank: ${botRank}, role rank: ${targetRank}`,
            });
          }

          if (selfroles.indexOf(targetId) > -1) {
            return message.channel?.sendMessage({
              content: ':x: The role has already been added.',
            });
          }

          if (selfroles.length >= 100) {
            return message.channel?.sendMessage({
              content: ':x: The selfroles limit was exceeded.',
            });
          }

          selfroles.push(targetId);

          await context.controller.servers.update(serverId, {
            selfroles,
          });

          return message.channel?.sendMessage({
            content: `${Results.success} Role has been successfully added.`,
          });
        } else {
          // TODO add a way to remove invalid roles
          const index = selfroles.indexOf(targetId);

          if (index === -1) {
            return message.channel?.sendMessage({
              content: `:x: The role wasn't found.`,
            });
          }

          selfroles.splice(index, 1);

          await context.controller.servers.update(serverId, {
            selfroles,
          });

          return message.channel?.sendMessage({
            content: `${Results.success} Role has been successfully removed.`,
          });
        }
      } else if (subcommand === 'list') {
        // List available selfroles
        const roles = await getSelfroles(
          context.controller,
          message.channel!.server!
        );

        let description =
          roles.length > 0
            ? `### Available roles\n${roles
                .map(
                  (role) =>
                    `#### ${sanitize(role.name)} \nID: ${role.id} | Rank: ${
                      role.rank
                    }${role.error ? " | Error: role wasn't found" : ''}`
                )
                .join('\n')}`
            : 'No roles available.';

        return message.channel?.sendMessage({
          embeds: [
            {
              title: 'Manage self-assignable roles',
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
}
