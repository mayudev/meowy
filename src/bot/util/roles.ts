import { Member } from 'revolt.js';

export function getMembersHighestRole(member: Member) {
  return member.orderedRoles.at(0)?.[1];
}
