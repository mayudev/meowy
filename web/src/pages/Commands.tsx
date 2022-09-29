import CommandCategories from '../components/commands/CommandCategories';
import CommandsSection from '../components/commands/CommandsSection';
import Loading from '../components/common/Loading';
import { useGetCommandsQuery } from '../store/services/commands';

export default function Commands() {
  const { data, error, isLoading } = useGetCommandsQuery();

  return (
    <div>
      {error ? (
        // TODO error handling
        <p>Error</p>
      ) : isLoading ? (
        <Loading center />
      ) : data ? (
        <section className="commands">
          <CommandCategories categories={data.map((cat) => cat.name)} />
          <div>
            {data.map((cat) => (
              <CommandsSection section={cat} key={cat.name} />
            ))}
          </div>

          <style jsx>{`
            .commands {
              display: flex;
            }
          `}</style>
        </section>
      ) : null}
    </div>
  );
}
