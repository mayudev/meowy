import { Member, Server } from 'revolt.js';

export function hasBanPermission(member: Member, server: Server) {
  return member.hasPermission(server, 'BanMembers');
}
