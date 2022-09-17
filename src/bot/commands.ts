import AvatarCommand from './commands/misc/avatar';
import PingCommand from './commands/misc/ping';
import RollCommand from './commands/fun/roll';
import Command from './types/Command';
import RankCommand from './commands/level/rank';
import LeaderboardCommand from './commands/level/leaderboard';
import SayCommand from './commands/debug/say';
import BanCommand from './commands/moderation/ban';
import KickCommand from './commands/moderation/kick';
import NickCommand from './commands/moderation/nick';
import MuteCommand from './commands/moderation/mute';
import UnbanCommand from './commands/moderation/unban';
import UserCommand from './commands/misc/user';

// Register of all commands provided by the bot
const commandsRegister: Command[] = [
  new RollCommand(),
  new AvatarCommand(),
  new RankCommand(),
  new LeaderboardCommand(),
  new BanCommand(),
  new KickCommand(),
  new NickCommand(),
  new MuteCommand(),
  new UnbanCommand(),
  new UserCommand(),
];

if (process.env.NODE_ENV === 'development') {
  commandsRegister.push(new SayCommand(), new PingCommand());
}

export default commandsRegister;
