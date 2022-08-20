import AvatarCommand from './commands/avatar';
import PingCommand from './commands/ping';
import RollCommand from './commands/roll';
import Command from './types/Command';

// Register of all commands provided by the bot
const commandsRegister: Command[] = [
  new PingCommand(),
  new RollCommand(),
  new AvatarCommand(),
];

export default commandsRegister;
