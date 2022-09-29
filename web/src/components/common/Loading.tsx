import { RiLoader5Fill } from 'react-icons/ri';

type Props = {
  center?: boolean;
};

export default function Loading({ center }: Props) {
  const spinner = (
    <div className="spinner">
      <RiLoader5Fill size={64} />

      <style jsx>{`
        .spinner {
          width: 64px;
          height: 64px;
          animation: rotate 0.6s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  return (
    <>
      {center ? (
        <div className="centered">
          {spinner}

          <style jsx>{`
            .centered {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>
        </div>
      ) : (
        spinner
      )}
    </>
  );
}
