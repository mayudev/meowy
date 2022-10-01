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
          padding: 0.5rem;

          box-sizing: border-box;
          min-height: 100vh;
          max-width: 1200px;

          margin: 0 auto;
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
