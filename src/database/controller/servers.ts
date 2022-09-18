import { Collection } from 'mongodb';
import { Server } from '../models/Server';

export default class Servers {
  static collectionName = 'servers';

  constructor(private collection: Collection<Server>) {}

  /**
   * mustFind finds a Server in database, creating it if not found
   */
  async mustFind(serverId: string) {
    const result = await this.find(serverId);

    if (!result) {
      const server: Server = {
        serverId,
        selfroles: [],
      };

      await this.insert(server);
      return server;
    }

    return result;
  }

  async find(serverId: string) {
    return this.collection.findOne({
      serverId,
    });
  }

  async insert(server: Server) {
    return this.collection.insertOne(server);
  }

  async update(id: string, server: Partial<Server>) {
    return this.collection.updateOne(
      {
        serverId: id,
      },
      {
        $set: server,
      }
    );
  }
}
