import DatabaseController from '../database/controller';
import express, { Express, Request, Response } from 'express';
import CommandsController from './controllers/commands';

class Api {
  private app: Express;

  constructor(private controller: DatabaseController) {
    this.app = express();
  }

  setup() {
    this.app.get('/', (req: Request, res: Response) => {
      return res.send('hello');
    });

    const api = express.Router();

    this.initializeControllers(api);
    this.app.use('/api/v1', api);
  }

  private initializeControllers(router: express.Router) {
    const controllers = [new CommandsController(this.controller)];

    controllers.forEach((controller) => {
      router.use('/', controller.router);
    });
  }

  listen(port: number) {
    this.app.listen(port);
    console.log(`[api] Server is listening on :${port}`);
  }
}

export default Api;
