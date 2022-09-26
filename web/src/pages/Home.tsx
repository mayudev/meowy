export default function Home() {
  return (
    <main>
      <section className="landing">
        <h1>
          Revolutionize
          <br /> your server.
        </h1>
        <h2>Buzzwords buzzwords</h2>
      </section>
      <style jsx>{`
        main {
        }
        .landing {
          max-width: 500px;

          margin: 1rem;
          animation: section-appear 0.5s ease forwards;
        }
        .landing h1 {
          font-weight: 300;
          font-size: 4rem;

          line-height: 1.2;
          padding: 0;
          margin: 0;
        }
        .landing h2 {
          font-weight: 300;
        }

        @keyframes section-appear {
          from {
            opacity: 0;
            margin-top: 40vh;
          }
          to {
            opacity: 1;
            margin-top: 20vh;
          }
        }
      `}</style>
    </main>
  );
}
