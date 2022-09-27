import { useGetCommandsQuery } from '../store/services/commands';

export default function Commands() {
  const { data, error, isLoading } = useGetCommandsQuery();

  return (
    <div>
      {error ? (
        <p>theres an error lol</p>
      ) : isLoading ? (
        <p>Loading</p>
      ) : data ? (
        <p>a</p>
      ) : null}
    </div>
  );
}
