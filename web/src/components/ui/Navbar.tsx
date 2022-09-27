import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { useContext } from 'preact/hooks';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

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
      <div className="button_wrapper">
        <Button onClick={switchTheme} icon title="Toggle theme">
          {theme === 'dark' ? (
            <RiSunFill size={20} />
          ) : (
            <RiMoonFill size={20} />
          )}
        </Button>
      </div>
      <div className="button_wrapper">
        <Button primary>Log in</Button>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
          margin: 2rem 0;
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

          text-shadow: 0 0 15px var(--color-primary);
        }

        .button_wrapper {
          margin-right: 1rem;
        }
      `}</style>
    </nav>
  );
}
