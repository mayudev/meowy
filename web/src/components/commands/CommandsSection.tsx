import Category from '../../../../src/api/types/category';
import CommandEntry from './CommandEntry';

type Props = {
  section: Category;
};

export default function CommandsSection({ section }: Props) {
  return (
    <div>
      <div className="title" id={`section-${section.name}`}>
        {section.name}
      </div>
      <div className="commands">
        {section.commands.map((command) => (
          <CommandEntry command={command} key={command.name} />
        ))}
      </div>

      <style jsx>{`
        .title {
          font-size: 2rem;
          line-height: normal;
          font-weight: 400;
          margin: 2rem 1.5rem;
        }

        .commands {
        }
      `}</style>
    </div>
  );
}
