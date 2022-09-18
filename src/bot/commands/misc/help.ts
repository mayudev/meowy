import { Message } from 'revolt.js';
import { themeColor } from '../../../common/util';
import commandsRegister from '../../commands';
import Command from '../../types/Command';
import CommandCategory, {
  CommandCategoryNames,
} from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';

export default class HelpCommand implements Command {
  name = 'help';
  description = 'Lists all commands';
  usage = 'help [command name]';
  category = CommandCategory.Misc;

  async run(message: Message, context: CommandContext) {
    const target = context.invocation.args[0];

    // TODO mention website (when it's made)

    if (!target) {
      let description = `## Commands\nmeowy has ${commandsRegister.length} commands in total.\n`;

      CommandCategoryNames.forEach((name, i) => {
        const commands = commandsRegister.filter(
          (command) => command.category === i
        );

        if (commands.length === 0) return;

        description += `\n### ${name}\n${commands
          .map((x) => '`' + x.name + '`')
          .join(', ')}`;
      });

      description +=
        '\nUse `help [command name]` to see more information about a command!';

      return message.channel?.sendMessage({
        embeds: [
          {
            title: 'meowy command reference',
            colour: themeColor,
            description,
          },
        ],
      });
    } else {
      const command = commandsRegister.find(
        (command) => command.name.toLowerCase() === target.toLowerCase()
      );
      if (!command) {
        return message.channel?.sendMessage({
          content: `:x: Command not found.`,
        });
      }

      let description = `## ${command.name}

#### Description
${command.description}

#### Usage
\`${command.usage || command.name}\``;

      if (command.alias && command.alias.length > 0) {
        description +=
          '\n#### Aliases\n' +
          command.alias.map((alias) => '`' + alias + '`').join(', ');
      }

      return message.channel?.sendMessage({
        embeds: [
          {
            title: 'meowy command reference',
            colour: themeColor,
            description,
          },
        ],
      });
    }
  }
}
