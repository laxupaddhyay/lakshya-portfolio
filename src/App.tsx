import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { experience, projects, skills, type Project, type ProjectCategory } from './data'

const filters: Array<'All' | ProjectCategory> = ['All', 'Distributed systems', 'Identity', 'Developer tools', 'Computer vision', 'Immersive web', 'Algorithms']
const themes = [{ id: 'violet', label: 'Violet', color: '#a3a5ff' }, { id: 'atlantic', label: 'Atlantic', color: '#73e0c4' }, { id: 'copper', label: 'Copper', color: '#e6b477' }] as const
type Theme = (typeof themes)[number]['id']
const github = 'https://github.com/laxupaddhyay'
const email = 'lakshyasharma024@gmail.com'

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" className={diagonal ? 'icon icon-diagonal' : 'icon'} fill="none"><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3.5 10h12m-5-5 5 5-5 5'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function ProjectArtwork({ kind }: { kind: Project['visual'] }) {
  if (kind === 'stock') {
    return <div className="art-stock" aria-hidden="true">
      <div className="stock-topline"><span><i className="status-dot" /> INVENTORY / LIVE SIMULATION</span><span>STOCK_01</span></div>
      <div className="stock-value">084<span> units available</span></div>
      <div className="bar-chart">{[32, 47, 38, 62, 49, 72, 55, 88, 68, 96, 74, 84].map((height, i) => <i key={i} style={{ height: `${height}%`, animationDelay: `${i * 55}ms` }} />)}</div>
      <div className="stock-bottom"><span>ATOMIC UPDATE</span><span className="stock-success">● &nbsp; CONSISTENT</span></div>
    </div>
  }
  if (kind === 'identity') {
    return <div className="art-identity" aria-hidden="true">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="orbit-center"><span>OIDC</span><small>ISSUER</small></div>
      <div className="orbit-node node-top">PKCE</div><div className="orbit-node node-right">JWKS</div><div className="orbit-node node-left">JWT</div>
      <div className="identity-caption"><i className="status-dot" /> TRUST, BY DESIGN</div>
    </div>
  }
  if (kind === 'culling') {
    return <div className="art-culling" aria-hidden="true">
      <div className="photo-board"><div className="photo-thumb photo-one"><span /></div><div className="photo-thumb photo-two"><span /></div><div className="photo-thumb photo-three"><span /></div><div className="photo-thumb photo-four"><span /></div></div>
      <div className="score-card"><span>FRAME / 0182</span><strong>92<span>/100</span></strong><i><b /></i><small>SHARPNESS &nbsp; HIGH</small><small>EXPRESSION &nbsp; GOOD</small></div>
      <div className="culling-label"><i className="status-dot" /> QUALITY SCORE / READY FOR REVIEW</div>
    </div>
  }
  if (kind === 'gallery') {
    return <div className="art-gallery" aria-hidden="true">
      <div className="gallery-backwall"><div className="gallery-frame frame-large"><i /></div><div className="gallery-frame frame-small"><i /></div></div>
      <div className="gallery-sidewall"><div className="gallery-frame frame-side"><i /></div></div>
      <div className="gallery-floor" /><div className="gallery-hint"><span>W</span><span>A</span><span>S</span><span>D</span><small>MOVE THROUGH THE GALLERY</small></div>
    </div>
  }
  if (kind === 'huffman') {
    return <div className="art-huffman" aria-hidden="true">
      <div className="tree-tag">HUFFMAN TREE <span>FREQUENCY → CODE</span></div>
      <svg viewBox="0 0 460 155" role="presentation"><path d="M230 34 132 78M230 34 328 78M132 83 82 125M132 83 184 125M328 83 278 125M328 83 379 125" /><circle cx="230" cy="27" r="15" /><circle cx="132" cy="78" r="13" /><circle cx="328" cy="78" r="13" /><circle cx="82" cy="126" r="12" /><circle cx="184" cy="126" r="12" /><circle cx="278" cy="126" r="12" /><circle cx="379" cy="126" r="12" /><text x="230" y="31">12</text><text x="132" y="82">5</text><text x="328" y="82">7</text><text x="82" y="130">A</text><text x="184" y="130">B</text><text x="278" y="130">C</text><text x="379" y="130">D</text></svg>
      <div className="tree-codes"><span>A <b>00</b></span><span>B <b>01</b></span><span>C <b>10</b></span><span>D <b>11</b></span></div>
    </div>
  }
  return <div className="art-limiter" aria-hidden="true">
    <div className="limiter-heading"><span>REQUEST BUDGET</span><span>USER / API KEY</span></div>
    <div className="token-row">{Array.from({ length: 12 }, (_, i) => <i className={i < 8 ? 'token token-filled' : 'token'} key={i} />)}</div>
    <div className="limiter-code"><span className="code-purple">bucket</span> <span className="code-muted">=</span> <span className="code-lime">atomic.consume</span><span className="code-muted">(</span><span className="code-orange">identity</span><span className="code-muted">)</span></div>
    <div className="limiter-caption"><i className="status-dot" /> 08 / 12 TOKENS &nbsp; <span>REFILLING</span></div>
  </div>
}

function ProjectCard({ project, index, onOpen, reducedMotion }: { project: Project; index: number; onOpen: (project: Project) => void; reducedMotion: boolean | null }) {
  function trackPointer(event: ReactPointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return <motion.article className={`project-card ${project.featured ? 'project-featured' : ''}`} layout
    onPointerMove={trackPointer}
    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }}
    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
    <button className="project-open" onClick={() => onOpen(project)} aria-label={`View details for ${project.title}`}>
    <div className={`project-art project-visual-${project.visual}`}><ProjectArtwork kind={project.visual} /></div>
      <div className="project-body">
        <div className="project-meta"><span>{project.number} / SELECTED WORK</span><span className="project-category">{project.category}</span></div>
        <div className="project-title-row"><h3>{project.title}</h3><span className="round-arrow"><Arrow diagonal /></span></div>
        <p className="project-tagline">{project.tagline}</p>
        <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </button>
  </motion.article>
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return <motion.div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"
      initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.24 }}>
      <div className="dialog-top"><span>PROJECT / {project.number}</span><button className="close-button" onClick={onClose} aria-label="Close project details">×</button></div>
      <div className={`dialog-art dialog-visual-${project.visual}`}><ProjectArtwork kind={project.visual} /></div>
      <p className="eyebrow">{project.category}</p><h2 id="dialog-title">{project.title}</h2><p className="dialog-description">{project.description}</p>
      <h3 className="detail-heading">Engineering notes</h3>
      <ul className="highlight-list">{project.highlights.map((highlight) => <li key={highlight}><span>↗</span>{highlight}</li>)}</ul>
      <div className="dialog-bottom"><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a className="button button-primary" href={project.href} target="_blank" rel="noreferrer">Explore repository <Arrow diagonal /></a></div>
    </motion.section>
  </motion.div>
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = window.localStorage.getItem('portfolio-theme')
      return themes.some((option) => option.id === saved) ? saved as Theme : 'violet'
    } catch {
      return 'violet'
    }
  })
  const reducedMotion = useReducedMotion()
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleProjects = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.category === filter), [filter])

  useEffect(() => {
    try {
      window.localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The site still works when browser storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    const moveSpotlight = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
      })
    }
    window.addEventListener('pointermove', moveSpotlight, { passive: true })
    return () => {
      window.removeEventListener('pointermove', moveSpotlight)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return <div className="site-shell" data-theme={theme}>
    <div className="cursor-spotlight" aria-hidden="true" />
    <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <header className="site-header"><a href="#top" className="brand" aria-label="Lakshya Upaddhyay home"><span className="brand-mark">LU</span><span>Lakshya Upaddhyay<span className="brand-role"> / SOFTWARE ENGINEER</span></span></a>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation"><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></nav>
      <div className="theme-picker" role="group" aria-label="Choose color theme">{themes.map((option) => <button key={option.id} className="theme-swatch" style={{ '--swatch': option.color } as CSSProperties} aria-label={`${option.label} theme`} aria-pressed={theme === option.id} onClick={() => setTheme(option.id)} />)}</div>
      <button className="mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <a className="header-contact" href={`mailto:${email}`}>Let’s talk <Arrow diagonal /></a>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy"><motion.p className="eyebrow hero-eyebrow" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}><i className="status-dot" /> OPEN TO BUILDING WHAT’S NEXT</motion.p>
          <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>I make complex<br /><span className="serif-accent">systems feel</span> simple.</motion.h1>
          <motion.p className="hero-summary" initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>Software engineer focused on secure identity, reliable APIs, and the backend systems that keep products moving.</motion.p>
          <motion.div className="hero-actions" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}><a href="#work" className="button button-primary">Explore my work <Arrow /></a><a href={github} target="_blank" rel="noreferrer" className="text-link">GitHub profile <Arrow diagonal /></a></motion.div>
          <div className="hero-note"><span>JAVA / SPRING ENGINEER</span><span>IDENTITY · SECURITY · DISTRIBUTED SYSTEMS</span></div>
        </div>
        <motion.div className="hero-visual" initial={reducedMotion ? false : { opacity: 0, scale: 0.96, x: 16 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="hero-visual-grid" />
          <motion.div className="float-chip chip-one" animate={reducedMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}><span className="chip-icon chip-java">J</span><span>Java / Spring</span><i className="chip-check">✓</i></motion.div>
          <motion.div className="float-chip chip-two" animate={reducedMotion ? undefined : { y: [0, 6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><span className="chip-icon chip-lock">⌑</span><span>Identity flows</span><i className="chip-check">✓</i></motion.div>
          <div className="hero-orbit orbit-hero-one" /><div className="hero-orbit orbit-hero-two" /><div className="hero-core"><div className="core-ring"><span>LU</span><i className="core-spark" /></div><span className="core-label">ENGINEER / SYSTEMS</span></div>
          <div className="hero-code"><span className="code-window"><i /><i /><i /></span><code><span className="code-purple">while</span> <span className="code-muted">(</span><span className="code-lime">systems</span><span className="code-muted">.</span><span className="code-orange">needScale</span><span className="code-muted">()) {'{'}</span><br />&nbsp;&nbsp;<span className="code-purple">make</span><span className="code-muted">(</span><span className="code-lime">itReliable</span><span className="code-muted">);</span><br /><span className="code-muted">{'}'}</span></code></div>
          <span className="visual-coordinate">JAVA / IDENTITY / SYSTEMS</span>
        </motion.div>
      </section>

      <nav className="intro-strip section-wrap" aria-label="Portfolio sections"><a className="index-lead" href="#work"><span>01</span> Selected work <i>↘</i></a><a href="#experience"><span>02</span> Experience <i>↘</i></a><a href="#skills"><span>03</span> Toolkit <i>↘</i></a></nav>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading"><div><p className="eyebrow">SELECTED WORK / 2024 — 2026</p><h2>Projects with a<br /><span className="serif-accent">point of view.</span></h2></div><p className="section-aside">I like hard problems with clear stakes: protecting identity, keeping data consistent, and making infrastructure easier to use.</p></div>
        <div className="filter-row" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item} className={`filter-chip ${filter === item ? 'filter-active' : ''}`} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}<span>{item === 'All' ? projects.length : projects.filter((project) => project.category === item).length}</span></button>)}</div>
        <motion.div className="project-grid" layout>{visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} reducedMotion={reducedMotion} />)}</motion.div>
        <div className="work-more"><span>MORE CODE, NOTES & EXPERIMENTS</span><a href={github} target="_blank" rel="noreferrer">Browse GitHub <Arrow diagonal /></a></div>
      </section>

      

      

      

      <section className="experience-section section-wrap" id="experience"><div className="section-heading experience-head"><div><p className="eyebrow">THE PATH SO FAR</p><h2>Where I’ve<br /><span className="serif-accent">been building.</span></h2></div><p className="section-aside">A steady thread through the work: make systems easier to trust, operate, and evolve.</p></div><div className="timeline">{experience.map((item, index) => <motion.article className="timeline-item" key={item.company} initial={reducedMotion ? false : { opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}><div className="timeline-date">{item.date}</div><div className="timeline-marker"><i /></div><div className="timeline-content"><div className="timeline-title"><h3>{item.role}</h3><span>{item.company}</span></div><p>{item.detail}</p><div className="timeline-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></motion.article>)}</div></section>

      <section className="skills-section section-wrap" id="skills"><div className="skills-header"><p className="eyebrow">TOOLS I REACH FOR</p><span>ALWAYS LEARNING / ALWAYS BUILDING</span></div><div className="skills-grid">{skills.map((group, index) => <motion.div className="skill-group" key={group.label} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.07 }}><span className="skill-index">0{index + 1} / {group.label}</span><div>{group.items.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div></motion.div>)}</div></section>

      <section className="about-section section-wrap" id="about"><div className="about-heading"><p className="eyebrow">A LITTLE ABOUT ME</p><h2>Curious by default.<br /><span className="serif-accent">Careful by design.</span></h2></div><div className="about-copy"><p>I’m Lakshya, a software engineer working on enterprise identity and authentication. I enjoy turning complicated login and distributed-system problems into flows teams can understand and trust.</p><p>My day-to-day is Java, Spring Boot, and service communication. Outside work, I keep learning across the stack, build small tools, and reset with photography, cooking, or a few notes on the harmonica.</p><div className="education-card"><span className="education-icon">✳</span><div><span>EDUCATION / 2025</span><strong>B.Tech, Computer Science & Engineering</strong><small>Rajasthan Technical University, Kota · CGPA 9.57</small></div></div></div></section>

      <section className="contact-section section-wrap"><div className="contact-orb" aria-hidden="true" /><div className="contact-content"><p className="eyebrow"><i className="status-dot" /> GOOD SYSTEMS START WITH A CONVERSATION</p><h2>Have a good<br /><span className="serif-accent">problem in mind?</span></h2><p>I’m always interested in thoughtful teams and meaningful engineering challenges.</p><a className="button button-primary contact-button" href={`mailto:${email}`}>Say hello <Arrow diagonal /></a></div><div className="contact-side"><a href={`mailto:${email}`}>{email} <Arrow diagonal /></a><a href={github} target="_blank" rel="noreferrer">github.com/laxupaddhyay <Arrow diagonal /></a></div></section>
    </main>

    <footer className="site-footer section-wrap"><a href="#top" className="footer-brand"><span className="brand-mark">LU</span> Lakshya Upaddhyay</a><span>DESIGNED WITH INTENTION · BUILT WITH REACT</span><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>
    <AnimatePresence>{selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
  </div>
}

export default App
