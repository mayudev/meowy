import express, { Request, Response } from 'express';
import commandsRegister from '../../bot/commands';
import DatabaseController from '../../database/controller';
import Controller from '../types/controller';
import { CommandCategoryNames } from '../../bot/types/CommandCategory';
import Category from '../types/category';

class CommandsController implements Controller {
  public path = '/commands';
  public router = express.Router();
  private commands: Category[] = [];

  constructor(private db: DatabaseController) {
    this.prepareCommands();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllCommands);
  }

  private prepareCommands() {
    CommandCategoryNames.forEach((name, i) => {
      const commands = commandsRegister.filter(
        (command) => command.category === i
      );

      if (commands.length === 0) return;

      this.commands.push({
        name,
        commands,
      });
    });
  }

  /** Returns all bot's commands */
  private getAllCommands = (req: Request, res: Response) => {
    return res.json(this.commands);
  };
}

export default CommandsController;
