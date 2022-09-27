import { meowyApi } from '../api';

const commandsEndpoint = meowyApi.injectEndpoints({
  endpoints: (build) => ({
    getCommands: build.query<{}, void>({ query: () => 'commands' }),
  }),
});

export const { useGetCommandsQuery } = commandsEndpoint;
