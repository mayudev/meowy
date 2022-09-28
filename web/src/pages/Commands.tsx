import { useGetCommandsQuery } from '../store/services/commands';

export default function Commands() {
  const { data, error, isLoading } = useGetCommandsQuery();

  return (
    <div>
      {error ? (
        // TODO error handling
        <p>error</p>
      ) : isLoading ? (
        <p>Loading</p>
      ) : data ? (
        <div>
          {data.map((category) => (
            <div key={category.name}>
              {category.name}
              {category.commands.map((cmd) => (
                <p key={cmd.name}>{cmd.name}</p>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
