import { Server } from 'revolt.js';
import DatabaseController from '../../database/controller';

type Selfrole = {
  id: string;
  name: string;
  rank?: number;
  error: boolean;
};

export async function getSelfroles(db: DatabaseController, server: Server) {
  const entry = await db.servers.mustFind(server._id);

  const selfroles: Selfrole[] = [];

  entry.selfroles.forEach((roleId) => {
    const role = server.roles![roleId];

    if (!role) {
      selfroles.push({
        id: roleId,
        name: '',
        error: true,
      });
    } else {
      selfroles.push({
        id: roleId,
        name: role.name,
        rank: role.rank,
        error: false,
      });
    }
  });

  return selfroles;
}

export async function getSelfroleList(db: DatabaseController, server: Server) {
  const selfroles = await getSelfroles(db, server);

  let errorMark = false;
  const roles: string[] = [];

  selfroles.forEach((role) => {
    if (role.error) {
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
