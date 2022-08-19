import PingCommand from './commands/ping';
import Command from './types/Command';

// Register of all commands provided by the bot
const commandsRegister: Command[] = [new PingCommand()];

export default commandsRegister;
