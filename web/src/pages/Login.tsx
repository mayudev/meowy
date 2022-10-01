import { RiClipboardFill } from 'react-icons/ri';

export default function Login() {
  return (
    <main>
      <section className="login">
        <h1>Login with Revolt</h1>
        <p>
          To continue, please type this command in <strong>any server </strong>
          that has meowy bot.
        </p>
        <div className="login_command">
          <span>?login ABC3DEF4GHJ</span>
          <div role="button">
            <RiClipboardFill />
          </div>
        </div>
      </section>

      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
          margin: 1rem 0;
        }
        .login {
          background: var(--color-background-2);
          border-radius: 20px;
          padding: 1.5rem;
        }
        .login h1 {
          font-weight: 400;
          font-size: 2rem;
          line-height: normal;

          margin: 0;
          padding: 0;
        }
        .login_command {
          display: flex;
          justify-content: space-between;
          align-items: center;

          background: var(--color-background);
          border-radius: 100px;
          padding: 1rem;

          line-height: normal;
        }
      `}</style>
    </main>
  );
}
