import { Client, Message } from 'revolt.js';
import DatabaseController from '../../database/controller';
import CommandContext from '../types/CommandContext';

export async function addTemporaryBan(
  context: CommandContext,
  message: Message,
  targetId: string,
  length: number
) {
  const created = Date.now();
  const moderatorId = message.author_id;
  const serverId = message.channel!.server_id!;

  await context.controller.bans.insert({
    userId: targetId,
    serverId,
    created,
    expires: created + length,
    moderatorId,
  });

  await message.channel!.server!.banUser(targetId, {
    reason: `//by ${message.author?.username} by Meowy (${length})`,
  });
}

export async function temporaryBanLoop(
  client: Client,
  controller: DatabaseController
) {
  const expired = await controller.bans.findExpired();

  expired.forEach((entry) => {
    (async () => {
      try {
        const server = await client.servers.fetch(entry.serverId);
        await server.unbanUser(entry.userId);
        await controller.bans.delete(entry.userId, entry.serverId);
      } catch (e) {
        console.error(
          `unbanning member ${entry.userId} in server ${entry.serverId} failed`
        );
        // TODO notify mods of the server
      }
    })();
  });
}
