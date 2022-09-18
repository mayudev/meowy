import { Message } from 'revolt.js';
import Command from '../../types/Command';
import CommandCategory from '../../types/CommandCategory';
import CommandContext from '../../types/CommandContext';

export default class RoleCommand implements Command {
  name = 'role';
  description = 'Use self-assignable roles';
  category = CommandCategory.Level;
  usage = 'role <add|remove> <role name> | role list';
  alias = ['selfrole'];

  async run(message: Message, context: CommandContext) {}
}
