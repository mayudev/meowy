import { RiGithubFill, RiHeart2Fill } from 'react-icons/ri';

export default function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/mayudev/meowy"
        target="_blank"
        rel="noreferrer"
      >
        <RiGithubFill size={24} />
      </a>
      <span className="footer_text">
        made with <RiHeart2Fill /> by mayudev
      </span>
      <style jsx>{`
        footer {
          display: flex;
          align-items: center;
        }

        .footer_text {
          margin-left: 0.5rem;
          font-size: 14px;
        }
      `}</style>
    </footer>
  );
}
