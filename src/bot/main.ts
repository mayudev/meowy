import { Client, Message } from 'revolt.js';
import { readToken } from '../config/config';
import commandsRegister from './commands';
import registerCommands from './commands';
import PingCommand from './commands/ping';
import { isCommand, isMessageValid, parseCommand } from './handler';
import Command from './types/Command';
import CommandContext from './types/CommandContext';

class Bot {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  start() {
    this.setup();
    this.client.loginBot(readToken());
  }

  private setup() {
    this.client.on('ready', () => this.ready());
    this.client.on('message', (m) => this.message(m));
  }

  private ready() {
    console.info(`Bot is ready. Logged in as ${this.client.user?.username}`);
  }

  private async message(message: Message) {
    if (!isMessageValid(message)) return;
    if (!isCommand(message)) return;

    const invocation = parseCommand(message);

    const match = commandsRegister.find(
      (command) => command.name === invocation.name
    );

    if (match) {
      const context = new CommandContext(invocation);
      match.run(message, context);
    }
  }
}

export default Bot;
