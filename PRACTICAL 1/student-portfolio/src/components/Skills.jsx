import { Braces } from 'lucide-react';

export default function Skills({ skillList }) {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-heading">
        <p className="eyebrow">02 / TOOLKIT</p>
        <h2>Tools I use to<br /><span className="muted-heading">bring ideas to life.</span></h2>
        <p className="section-copy">A growing collection of technologies and skills I’m exploring.</p>
      </div>
      <div className="skills-grid">
        {skillList.map((skill, index) => (
          <div className="skill-card" key={skill}>
            <span className="skill-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="skill-icon"><Braces size={19} /></span>
            <span className="skill-name">{skill}</span>
            <span className="skill-arrow">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}
