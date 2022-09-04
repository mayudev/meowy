export interface TemporaryBan {
  userId: string;
  serverId: string;

  moderatorId: string;

  created: number;
  expires: number;
}
