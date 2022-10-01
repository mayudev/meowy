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
        <Link to="/login">
          <Button primary>Log in</Button>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
          padding: 1rem;
          margin: 1rem 0;
        }

        .navigation_link {
          padding: 0 1rem;
          font-size: 15px;
        }

        .navigation_link:last-of-type {
          margin-right: 1rem;
        }

        .navigation_link:not(.title):hover {
          color: var(--color-foreground-2);
        }

        .title {
          font-size: 20px;
          line-height: normal;
        }

        .button_wrapper {
          margin-right: 1rem;
        }
      `}</style>
    </nav>
  );
}
