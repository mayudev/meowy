import DatabaseController from '../database/controller';
import express, { Express, Request, Response } from 'express';

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

    api.get('/commands', (req: Request, res: Response) => {
      return res.send('a');
    });

    this.app.use('/api/v1', api);
  }

  listen(port: number) {
    this.app.listen(port);
    console.log(`[api] Server is listening on :${port}`);
  }
}

export default Api;
