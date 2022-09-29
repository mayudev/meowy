type Props = {
  categories: string[];
};

export default function CommandCategories({ categories }: Props) {
  return (
    <div>
      <nav className="categories">
        <div className="title">Commands</div>
        {categories.map((category) => (
          <a href={`#section-${category}`} className="link" key={category}>
            <p className="link-text">{category}</p>
          </a>
        ))}
      </nav>

      <style jsx>{`
        .categories {
          margin-right: 1rem;
          position: sticky;
          top: 20px;

          min-width: 200px;
        }

        .title {
          font-size: 1.5rem;
          padding: 0.5rem 0;
        }

        .link-text {
          font-size: 15px;
          line-height: 20px;
          font-weight: 500;

          transition: 200ms;
        }

        .link-text:hover {
          color: var(--color-foreground-2);
        }
      `}</style>
    </div>
  );
}
