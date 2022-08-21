import { Db } from 'mongodb';
import Members from './controller/members';

export default class DatabaseController {
  constructor(public db: Db) {}

  members = new Members(this.db.collection(Members.collectionName));
}
