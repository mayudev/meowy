import { Member } from '../../../database/models/Member';

export interface LeaderboardMember
  extends Omit<Member, 'serverId' | 'lastMessage'> {
  nickname: string;
}
