import CommandContext from './CommandContext';

export default interface Command {
  name: string;
  run: (context: CommandContext) => Promise<any>;
}
