import { Collection } from 'mongodb';
import { Member } from '../models/Member';

export default class Members {
  static collectionName = 'members';

  constructor(private collection: Collection<Member>) {}

  /**
   * mustFind finds a Member in database, creating it if not found.
   */
  async mustFind(userId: string, serverId: string) {
    const result = await this.find(userId, serverId);

    if (!result) {
      const member: Member = {
        userId,
        serverId,
        lastMessage: 0,
        level: 0,
        exp: 0,
      };

      await this.insert(member);
      return member;
    }

    return result;
  }

  /**
   * Finds a server's top {number} scoring members
   */
  async findServerTop(serverId: string, count: number) {
    return this.collection
      .find({
        serverId,
      })
      .sort({
        exp: -1,
      })
      .limit(count)
      .toArray();
  }

  async find(userId: string, serverId: string) {
    return this.collection.findOne({
      userId,
      serverId,
    });
  }

  async insert(member: Member) {
    return this.collection.insertOne(member);
  }

  async update(member: Member) {
    return this.collection.updateOne(
      {
        userId: member.userId,
        serverId: member.serverId,
      },
      {
        $set: member,
      }
    );
  }
}
