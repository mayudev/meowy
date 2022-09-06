import { Collection } from 'mongodb';
import { TemporaryBan } from '../models/TemporaryBan';

export default class TemporaryBans {
  static collectionName = 'tempbans';

  constructor(private collection: Collection<TemporaryBan>) {}

  async find(userId: string, serverId: string) {
    return this.collection.findOne({ userId, serverId });
  }

  async findExpired() {
    const now = Date.now();

    return this.collection
      .find({
        expires: {
          $lt: now,
        },
      })
      .toArray();
  }

  async findAndDelete(userId: string, serverId: string) {
    return this.collection.findOneAndDelete({
      userId,
      serverId,
    });
  }

  async insert(ban: TemporaryBan) {
    return this.collection.insertOne(ban);
  }

  async update(ban: TemporaryBan) {
    return this.collection.updateOne(
      {
        userId: ban.userId,
        serverId: ban.serverId,
      },
      {
        $set: ban,
      }
    );
  }

  async delete(userId: string, serverId: string) {
    this.collection.deleteOne({
      userId,
      serverId,
    });
  }
}
