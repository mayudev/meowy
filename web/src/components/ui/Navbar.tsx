import { Link, NavLink } from 'react-router-dom';
import Button from '../common/Button';

export default function Navbar() {
  return (
    <nav>
      <a className="title navigation_link">
        <Link to="/">meowy</Link>
      </a>

      <span style={{ flex: 1 }} />
      <a className="navigation_link">
        <Link to="/invite">Add to server</Link>
      </a>
      <a className="navigation_link">
        <Link to="/commands">Commands</Link>
      </a>
      <Button primary>Log in</Button>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
          margin: 2rem auto;
          max-width: 1200px;
        }
        .navigation_link {
          padding: 0.5rem 1rem;
          font-size: 15px;
        }

        .navigation_link:last-of-type {
          margin-right: 1rem;
        }

        .navigation_link:not(.title):hover {
          color: var(--color-foreground-2);
        }

        .title {
          font-weight: 300;
          font-size: 1.5rem;

          text-shadow: 0 0 1px var(--color-foreground);
        }
      `}</style>
    </nav>
  );
}
