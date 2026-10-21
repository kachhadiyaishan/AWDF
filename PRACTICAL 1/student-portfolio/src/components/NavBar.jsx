import { Code2 } from 'lucide-react';

export default function NavBar({ sections, activeSection }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="brand" href="#home" aria-label="Portfolio home">
        <span className="brand-mark"><Code2 size={19} /></span>
        <span>portfolio<span className="brand-dot">.</span></span>
      </a>
      <div className="nav-links">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={activeSection === section.id ? 'nav-link active' : 'nav-link'}
            aria-current={activeSection === section.id ? 'location' : undefined}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
