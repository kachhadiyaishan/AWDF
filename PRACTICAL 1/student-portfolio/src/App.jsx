import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';

const profile = {
  name: 'Ishan Kachhadiya',
  role: 'IT Student · Frontend Developer',
  email: 'ishan@example.com',
  location: 'Gujarat, India',
  bio: 'I enjoy turning ideas into clean, accessible web experiences. I am currently learning modern frontend development, building small projects, and strengthening my understanding of JavaScript and React.',
  skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Git & GitHub', 'Responsive Design', 'REST APIs'],
  projects: [
    {
      number: '01',
      title: 'Student Portfolio',
      description: 'A responsive portfolio made from reusable React components, with data passed through props.',
      tags: ['React', 'Vite', 'CSS'],
      link: '#contact'
    },
    {
      number: '02',
      title: 'Weather Dashboard',
      description: 'A practice dashboard concept for presenting current conditions and forecast information clearly.',
      tags: ['JavaScript', 'API', 'UI'],
      link: '#contact'
    },
    {
      number: '03',
      title: 'Task Planner',
      description: 'A simple task-management concept focused on organizing daily work into manageable steps.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#contact'
    }
  ]
};

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.6] }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <NavBar sections={sections} activeSection={activeSection} />
      <main>
        <Header name={profile.name} role={profile.role} themeColor="#a3e635" location={profile.location} />
        <About bio={profile.bio} />
        <Skills skillList={profile.skills} />
        <Projects projects={profile.projects} />
        <section id="contact" className="section contact-section">
          <div className="section-heading">
            <p className="eyebrow">LET'S CONNECT</p>
            <h2>Have a project in mind?</h2>
            <p className="section-copy">I’m always open to learning, collaborating, and discussing new ideas.</p>
          </div>
          <div className="contact-panel">
            <div>
              <span className="contact-label">EMAIL ME AT</span>
              <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <a className="round-link" href={`mailto:${profile.email}`} aria-label="Send an email"><Mail size={20} /></a>
          </div>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a>
          </div>
        </section>
      </main>
      <Footer name={profile.name} year={new Date().getFullYear()} />
    </>
  );
}
