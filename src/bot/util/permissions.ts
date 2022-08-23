import { Member, Message, Server } from 'revolt.js';

export async function hasBanPermission(member: Member, server: Server) {
  return member.hasPermission(server, 'BanMembers');
}
