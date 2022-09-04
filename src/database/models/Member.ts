/**
 * A server's member
 */
export interface Member {
  userId: string;
  serverId: string;

  exp: number;
  level: number;

  lastMessage: number;
}
