import { Db } from 'mongodb';
import { Client, Message } from 'revolt.js';
import Api from '../api/main';
import { readToken } from '../config/config';
import DatabaseController from '../database/controller';
import commandsRegister from './commands';
import { isCommand, isMessageValid, parseCommand } from './handler';
import { handleMemberLevel } from './handlers/level';
import CommandContext from './types/CommandContext';
import { temporaryBanLoop } from './util/bans';

class Bot {
  private client: Client;
  private controller: DatabaseController;

  constructor(private db: Db) {
    this.client = new Client();
    this.controller = new DatabaseController(db);
  }

  start() {
    this.setup();
    this.client.loginBot(readToken());

    const api = new Api(this.controller);
    api.setup();
    api.listen(8080);
  }

  private setup() {
    this.client.on('ready', () => this.ready());
    this.client.on('message', (m) => this.message(m));
  }

  private ready() {
    console.info(`Bot is ready. Logged in as ${this.client.user?.username}`);
    setInterval(() => temporaryBanLoop(this.client, this.controller), 60000);
  }

  private async message(message: Message) {
    try {
      if (!isMessageValid(message)) return;

      if (!isCommand(message)) {
        handleMemberLevel(message, this.controller);
        return;
      }

      const invocation = parseCommand(message);

      const match = commandsRegister.find(
        (command) =>
          command.name === invocation.name ||
          (command.alias && command.alias.indexOf(invocation.name) > -1)
      );

      if (match) {
        const context = new CommandContext(invocation, this.controller);
        match.run(message, context);
      }
    } catch (e) {
      console.error(
        `An error occurred during the execution of a message handler that wasn't properly caught.`
      );
      console.error(e);
    }
  }
}

export default Bot;
