import { JSX } from 'preact';
import Navbar from './Navbar';

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />

      {children}

      <style jsx>{`
        p {
          color: wheat;
        }
      `}</style>
    </div>
  );
}
