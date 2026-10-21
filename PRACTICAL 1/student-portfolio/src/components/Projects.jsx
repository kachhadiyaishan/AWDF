import { ArrowUpRight, Layers3 } from 'lucide-react';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section projects-section">
      <div className="section-heading project-heading">
        <div>
          <p className="eyebrow">03 / SELECTED WORK</p>
          <h2>Learning by<br /><span className="muted-heading">making things.</span></h2>
        </div>
        <p className="section-copy">Practice projects that help me turn new concepts into something real.</p>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-topline"><span>{project.number} / PROJECT</span><Layers3 size={18} /></div>
            <div className="project-illustration">
              <div className="illustration-window">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="window-content"><span /><span /><span /><b /></div>
              </div>
              <div className="illustration-spark">✳</div>
            </div>
            <div className="project-info">
              <div className="project-title-row"><h3>{project.title}</h3><a href={project.link} aria-label={`Learn more about ${project.title}`}><ArrowUpRight size={19} /></a></div>
              <p>{project.description}</p>
              <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
