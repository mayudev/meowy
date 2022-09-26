import { JSX } from 'preact';
import Footer from './Footer';
import Navbar from './Navbar';

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div className="container">
      <Navbar />
      {children}
      <span style={{ flex: 1 }} />
      <Footer />

      <style jsx>{`
        .container {
          border-top: 2px solid var(--color-primary);
          padding: 0.5rem;

          box-sizing: border-box;
          min-height: 100vh;

          margin: 0;
          display: flex;
          flex-direction: column;
        }
        p {
          color: wheat;
        }
      `}</style>
    </div>
  );
}
