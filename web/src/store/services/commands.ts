import { meowyApi } from '../api';
import Category from '../../../../src/api/types/category';

const commandsEndpoint = meowyApi.injectEndpoints({
  endpoints: (build) => ({
    getCommands: build.query<Category[], void>({
      query: () => 'commands',
    }),
  }),
});

export const { useGetCommandsQuery } = commandsEndpoint;
