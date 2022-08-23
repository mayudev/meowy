import AvatarCommand from './commands/misc/avatar';
import PingCommand from './commands/misc/ping';
import RollCommand from './commands/fun/roll';
import Command from './types/Command';
import RankCommand from './commands/level/rank';
import LeaderboardCommand from './commands/level/leaderboard';
import SayCommand from './commands/debug/say';

// Register of all commands provided by the bot
const commandsRegister: Command[] = [
  new PingCommand(),
  new RollCommand(),
  new AvatarCommand(),
  new RankCommand(),
  new LeaderboardCommand(),
  new SayCommand(), // TODO disable this in production
];

export default commandsRegister;
