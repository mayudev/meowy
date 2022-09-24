type Props = {
  children: JSX.Element | string;
  primary?: boolean;
};

export default function Button({ children, primary }: Props) {
  return (
    <button className={`btn ${primary && 'btn_primary'}`}>
      {children}{' '}
      <style jsx>{`
        .btn {
          outline: none;
          border: none;

          font: inherit;
          background: var(--color-background-2);
          color: inherit;

          font-size: 15px;
          border-radius: 6px;

          padding: 0.5rem 1rem;

          transition: 0.2s ease;
          cursor: pointer;
        }

        .btn:hover {
          background: var(--color-background-3);
        }

        .btn_primary {
          background: var(--color-primary);
          color: var(--color-onprimary);
        }

        .btn_primary:hover {
          background: var(--color-primary-2);
          color: var(--color-onprimary);
        }
      `}</style>
    </button>
  );
}
