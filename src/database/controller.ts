import { Db } from 'mongodb';
import TemporaryBans from './controller/bans';
import Members from './controller/members';

export default class DatabaseController {
  constructor(public db: Db) {}

  members = new Members(this.db.collection(Members.collectionName));
  bans = new TemporaryBans(this.db.collection(TemporaryBans.collectionName));
}
