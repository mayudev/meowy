import { Message } from 'revolt.js';
import { randInt } from '../../common/util';
import DatabaseController from '../../database/controller';

const timeout = 60;

export async function handleMemberLevel(
  message: Message,
  controller: DatabaseController
) {
  const member = await controller.members.mustFind(
    message.author_id,
    message.channel!.server_id!
  );

  const now = Math.floor(Date.now() / 1000);

  if (member.lastMessage + timeout < now) {
    member.lastMessage = now;
    member.exp += randInt(5, 15);

    const level = determineLevel(member.exp);
    if (level > member.level) {
      // TODO level up callback
      member.level = level;
    }

    await controller.members.update(member);
  }
}

/**
 * Level determination algorithm (subject to change)
 */
function determineLevel(exp: number) {
  return Math.floor(0.15 * Math.sqrt(exp));
}

/**
 * Reversed determineLevel
 */
export function determineExpRequired(level: number) {
  return Math.ceil(Math.pow(level / 0.15, 2));
}
