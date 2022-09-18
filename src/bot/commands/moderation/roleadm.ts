import { Message } from 'revolt.js';
import { themeColorBlue } from '../../../common/util';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';
import Checks from '../../util/Checks';
import { Results } from '../../util/Results';
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
    if (await Checks.checkPermission(message, 'ManageRole')) {
      const subcommand = context.invocation.args[0];
      const serverId = message.channel?.server_id!;
      const target = context.invocation.args[1];

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

        const targetId = Object.keys(roles).find(
          (role) => roles[role].name.toLowerCase() === target
        );

        if (!targetId) {
          return message.channel?.sendMessage({
            content: ':x: The role was not found.',
          });
        }

        const server = await this.getServer(context, serverId);
        const selfroles = Array.from(server.selfroles);

        if (subcommand === 'add') {
          if (selfroles.indexOf(targetId) > -1) {
            return message.channel?.sendMessage({
              content: ':x: The role has already been added.',
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

        // TODO rank checks
      } else if (subcommand === 'list') {
        // List available selfroles
        const server = await this.getServer(
          context,
          message.channel?.server_id!
        );

        const roles: string[] = [];
        let errorMark = false;

        server.selfroles.forEach((roleId) => {
          const role = message.channel?.server!.roles![roleId];

          if (!role) {
            errorMark = true;
          } else {
            roles.push(`- \`${sanitize(role.name)}\``);
          }
        });

        let description =
          roles.length > 0
            ? `### Available roles\n${roles.join('\n')}`
            : 'No roles available';

        if (errorMark) description += '\nAn invaild role has been detected!';

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
