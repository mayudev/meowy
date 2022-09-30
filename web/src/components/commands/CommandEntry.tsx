import Command from '../../../../src/bot/types/Command';

type Props = {
  command: Omit<Command, 'run'>;
};

export default function CommandEntry({ command }: Props) {
  return (
    <div className="command">
      <div className="name">{command.name}</div>
      {command.usage && <div className="usage">{command.usage}</div>}
      <div className="description">{command.description}</div>
      {command.alias && (
        <div className="alias">Aliases: {command.alias?.join(', ')}</div>
      )}

      <style jsx>{`
        .command {
          margin: 1rem;
          background: var(--color-background-2);
          border-radius: 4px;

          border-left: 3px solid var(--color-primary);
        }

        .name {
          padding: 1rem;
          font-size: 1.2rem;
          line-height: normal;
        }

        .usage {
          padding: 0 1rem 1rem;
          font-weight: 300;
        }

        .alias {
          padding: 0 1rem 1rem;
        }

        .description {
          padding: 0 1rem 1rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
