import { ArrowDownRight, MapPin } from 'lucide-react';

export default function Header({ name, role, themeColor, location }) {
  return (
    <section id="home" className="hero section">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> AVAILABLE TO LEARN & COLLABORATE</p>
        <h1>Building digital<br />things with <span style={{ color: themeColor }}>purpose.</span></h1>
        <p className="hero-intro">Hey, I’m <strong>{name}</strong> — {role.toLowerCase()} focused on thoughtful design and useful experiences.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
          <a className="text-button" href="#about">A little about me <span>↗</span></a>
        </div>
        <p className="location"><MapPin size={15} /> {location}</p>
      </div>
      <div className="hero-art" aria-label="Decorative code illustration">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-card">
          <div className="card-top"><span /><span /><span /><small>developer.js</small></div>
          <div className="code-lines">
            <p><span className="code-muted">01</span> <span className="code-purple">const</span> <span className="code-blue">developer</span> = {'{'}</p>
            <p><span className="code-muted">02</span> &nbsp; curiosity: <span className="code-green">true</span>,</p>
            <p><span className="code-muted">03</span> &nbsp; learning: <span className="code-green">'always'</span>,</p>
            <p><span className="code-muted">04</span> &nbsp; coffee: <span className="code-orange">∞</span></p>
            <p><span className="code-muted">05</span> {'}'}</p>
            <p className="code-comment"><span className="code-muted">06</span> // building one day at a time</p>
          </div>
          <div className="card-footer"><span className="terminal-dot" /> Ready to create <span className="cursor">_</span></div>
        </div>
        <div className="floating-chip chip-top"> {'{ }'} <span>React components</span></div>
        <div className="floating-chip chip-bottom"><span className="chip-spark">✳</span> Small steps, big ideas</div>
      </div>
      <div className="hero-index"><span>01</span> — INTRODUCTION</div>
    </section>
  );
}
