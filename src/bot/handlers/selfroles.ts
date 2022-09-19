import { Server } from 'revolt.js';
import DatabaseController from '../../database/controller';

export async function getSelfroleList(db: DatabaseController, server: Server) {
  const entry = await db.servers.mustFind(server._id);

  let errorMark = false;
  const roles: string[] = [];

  entry.selfroles.forEach((roleId) => {
    const role = server.roles![roleId];

    if (!role) {
      errorMark = true;
    } else {
      roles.push(role.name);
    }
  });

  return {
    errorMark,
    roles,
  };
}
