import PingCommand from './commands/ping';
import RollCommand from './commands/roll';
import Command from './types/Command';

// Register of all commands provided by the bot
const commandsRegister: Command[] = [new PingCommand(), new RollCommand()];

export default commandsRegister;
