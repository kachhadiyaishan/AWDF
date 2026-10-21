import { Sparkles } from 'lucide-react';

export default function About({ bio }) {
  return (
    <section id="about" className="section about-section">
      <div className="section-heading">
        <p className="eyebrow">01 / ABOUT</p>
        <h2>A curious mind,<br /><span className="muted-heading">always in progress.</span></h2>
      </div>
      <div className="about-content">
        <div className="about-icon"><Sparkles size={24} /></div>
        <div>
          <p className="about-lead">I believe the best way to learn is to keep building.</p>
          <p className="body-copy">{bio}</p>
          <p className="body-copy">My current focus is creating responsive interfaces, writing maintainable code, and understanding how small components work together to create a complete experience.</p>
        </div>
      </div>
      <div className="stats-row">
        <div><strong>01</strong><span>Curiosity first</span></div>
        <div><strong>∞</strong><span>Things to learn</span></div>
        <div><strong>100%</strong><span>Growth mindset</span></div>
      </div>
    </section>
  );
}
