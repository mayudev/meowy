import AvatarCommand from './commands/misc/avatar';
import PingCommand from './commands/misc/ping';
import RollCommand from './commands/fun/roll';
import Command from './types/Command';
import RankCommand from './commands/level/rank';

// Register of all commands provided by the bot
const commandsRegister: Command[] = [
  new PingCommand(),
  new RollCommand(),
  new AvatarCommand(),
  new RankCommand(),
];

export default commandsRegister;
