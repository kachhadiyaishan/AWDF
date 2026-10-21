import { ArrowUp } from 'lucide-react';

export default function Footer({ name, year }) {
  return (
    <footer className="footer">
      <a className="footer-brand" href="#home">{name}<span>.</span></a>
      <p>Designed with care · Built with React</p>
      <div className="footer-right"><span>© {year}</span><a href="#home" aria-label="Back to top"><ArrowUp size={16} /></a></div>
    </footer>
  );
}
