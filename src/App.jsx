import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import chiWangPhoto from './assets/images/chi-wang.jpg';
import zihanWangPhoto from './assets/images/zihan-wang.jpg';

/* ============================================
   Data
   ============================================ */
const SPEAKERS = [
  {
    name: 'Dawn Song',
    tentative: false,
    role: 'Professor, Computer Science',
    affiliation: 'UC Berkeley',
    photo: 'https://dawnsong.io/dawn-berkeley.png',
    website: 'https://dawnsong.io',
  },
  {
    name: 'Sergey Levine',
    tentative: false,
    role: 'Associate Professor, EECS',
    affiliation: 'UC Berkeley',
    photo: 'https://people.eecs.berkeley.edu/~svlevine/images/portrait_lab_small.png',
    website: 'https://people.eecs.berkeley.edu/~svlevine/',
  },
  {
    name: 'Jiajun Wu',
    tentative: false,
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Stanford University',
    photo: 'https://jiajunwu.com/images/Jiajun_Wu.jpg',
    website: 'https://jiajunwu.com/',
  },
  {
    name: 'Chi Wang',
    tentative: false,
    role: 'Senior Staff Research Scientist, Creator of AutoGen',
    affiliation: 'Google DeepMind',
    photo: chiWangPhoto,
    website: 'https://www.linkedin.com/in/chi-wang-autogen',
  },
];

const ORGANIZERS = [
  {
    name: 'Xuan Wang',
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Virginia Tech',
    bio: 'Research focuses on small, open-source, and multimodal language model agents for science and society. NSF CAREER Award (2025), Nvidia Academic Grant (2025), Cisco Research Award (2025), ICDM Young Female Scholar Award (2025), NAACL Best Demo Paper Award (2021).',
    photo: 'https://xuanwang91.github.io/images//img/Xuan2016.jpg',
    website: 'https://xuanwang91.github.io',
  },
  {
    name: 'Wenqi Shi',
    role: 'Assistant Professor, Health Data Science',
    affiliation: 'UT Southwestern Medical Center',
    photo: 'https://wshi83.github.io/assets/img/profile.png',
    website: 'https://wshi83.github.io/',
  },
  {
    name: 'Yuchen Zhuang',
    role: 'Research Scientist',
    affiliation: 'Google DeepMind',
    photo: 'https://night-chen.github.io/assets/images/profile.png',
    website: 'https://night-chen.github.io/',
  },
  {
    name: 'Ligeng Zhu',
    role: 'Researcher',
    affiliation: 'Nvidia',
    photo: 'https://s.gravatar.com/avatar/3b0c57abe05e251bbcea1a00c60b67d2?s=240',
    website: 'https://lzhu.me/',
  },
  {
    name: 'Charles Flemming',
    role: 'Senior Researcher',
    affiliation: 'Cisco',
    photo: 'https://outshift-headless-cms-s3.s3.us-east-2.amazonaws.com/Charles_fleming.jpg',
    website: 'https://outshift.cisco.com/blog/author/charles-fleming',
  },
  {
    name: 'Zihan Wang',
    role: 'VP of Research',
    affiliation: 'Abaka AI',
    photo: zihanWangPhoto,
    website: 'https://www.linkedin.com/in/zihanwanghms/',
  },
  {
    name: 'Heng Ji',
    role: 'Professor, Computer Science',
    affiliation: 'UIUC',
    bio: 'ACL Fellow. Research in NLP, knowledge-enhanced LLMs, agentic AI, and multimodal models. Outstanding paper awards at NAACL 2024 and ACL 2024. NAACL-HLT 2018 Program Co-Chair.',
    photo: 'https://ws.engr.illinois.edu/directory/viewphoto.aspx?photo=16852&s=300',
    website: 'https://blender.cs.illinois.edu/hengji.html',
  },
  {
    name: 'Jiawei Han',
    role: 'Michael Aiken Chair Professor, Computer Science',
    affiliation: 'UIUC',
    bio: 'ACM Fellow and IEEE Fellow. Research in data mining, text mining, and intelligent systems. Author of multiple widely used textbooks on data mining. Directs the Data Mining Research Group at UIUC.',
    photo: 'https://ws.engr.illinois.edu/directory/viewphoto.aspx?photo=18410&s=300',
    website: 'http://hanj.cs.illinois.edu/',
  },
];

const TOPICS = [
  {
    icon: '\u{1F916}',
    title: 'LLM-Based Multi-Agent Coordination',
    desc: 'How language models can enable agents to communicate, reason together, and coordinate actions in shared environments.',
  },
  {
    icon: '\u{1F9BE}',
    title: 'Embodied Multi-Agent Systems',
    desc: 'Robotic teams, autonomous vehicles, and physical systems where multiple agents must work together under real-world constraints.',
  },
  {
    icon: '\u{1F4AC}',
    title: 'Emergent Communication',
    desc: 'How agents develop shared languages and protocols, from learned message passing to symbolic communication.',
  },
  {
    icon: '\u{1F30D}',
    title: 'World Models for Agent Coordination',
    desc: 'Using world models and simulators to help agents plan, predict, and coordinate in complex environments.',
  },
  {
    icon: '\u{1F504}',
    title: 'Multi-Agent Reinforcement Learning',
    desc: 'Learning algorithms for cooperative and competitive multi-agent settings, including parameter sharing and distributed training.',
  },
  {
    icon: '\u{1F517}',
    title: 'Unifying Physical and Digital Agents',
    desc: 'Bridging the gap between robotics-style control systems and AI-driven reasoning agents through shared design principles.',
  },
  {
    icon: '\u{2699}\u{FE0F}',
    title: 'Scalable Multi-Agent Collaboration',
    desc: 'How to scale multi-agent coordination from two or three agents to large teams, and what breaks when you do.',
  },
  {
    icon: '\u{1F9EA}',
    title: 'Benchmarks and Evaluation',
    desc: 'How do we measure progress in multi-agent embodied systems? What benchmarks, metrics, and testbeds are needed?',
  },
];

const DATES = [
  { date: 'August 29, 2026', label: 'Workshop Paper Submission Deadline', highlight: true },
  { date: 'September 29, 2026', label: 'Acceptance Notification', note: 'Authors will be notified of decisions' },
  { date: 'TBA', label: 'Camera-Ready Deadline', note: 'Final versions due (date to be announced)' },
  { date: 'December 12 or 13, 2026', label: 'Workshop Day', note: 'Atlanta, GA, USA', highlight: true },
];

const SCHEDULE = [
  { time: '8:30 AM - 8:45 AM', title: 'Opening Remarks', speaker: 'Workshop Organizers' },
  { time: '8:45 AM - 9:35 AM', title: 'Keynote Talk 1' },
  { time: '9:35 AM - 10:25 AM', title: 'Keynote Talk 2' },
  { time: '10:25 AM - 10:55 AM', title: 'Coffee Break', isBreak: true },
  { time: '10:55 AM - 11:45 AM', title: 'Keynote Talk 3' },
  { time: '11:45 AM - 12:30 PM', title: 'Keynote Talk 4' },
  { time: '12:30 PM - 1:45 PM', title: 'Lunch Break', isBreak: true },
  { time: '1:45 PM - 3:15 PM', title: 'Contributed Talks (Oral)', speaker: 'Selected Authors' },
  { time: '3:15 PM - 3:45 PM', title: 'Coffee Break', isBreak: true },
  { time: '3:45 PM - 4:45 PM', title: 'Panel Discussion', speaker: 'Invited Speakers & Organizers' },
  { time: '4:45 PM - 5:00 PM', title: 'Closing Remarks & Best Paper Award', speaker: 'Workshop Organizers' },
  { time: '5:00 PM - 6:00 PM', title: 'Networking Reception & Poster Session', speaker: 'All Participants' },
];

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#cfp', label: 'Call for Papers' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#organizers', label: 'Organizers' },
  { href: '#contact', label: 'Contact' },
];

/* ============================================
   Components
   ============================================ */

function PersonCard({ person }) {
  return (
    <div className="person-card">
      <div className="person-photo">
        {person.photo ? (
          <img src={person.photo} alt={person.name} loading="lazy" />
        ) : (
          <div className="person-photo-placeholder">
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div className="person-name">{person.name}</div>
      {person.tentative && <div className="person-tentative">(tentative)</div>}
      <div className="person-role">{person.role}</div>
      <div className="person-affiliation">{person.affiliation}</div>
      {person.bio && <div className="person-bio">{person.bio}</div>}
      {person.website && (
        <div className="person-link-wrapper">
          <a href={person.website} className="person-link" target="_blank" rel="noopener noreferrer">
            Website &#8599;
          </a>
        </div>
      )}
    </div>
  );
}

function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function FadeIn({ children, className = '' }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

/* ============================================
   Main App
   ============================================ */
function App() {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Track active section for nav highlighting
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e) => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#top" className="navbar-brand">
            <span>UniMAS</span> @ NeurIPS 2026
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '\u{2715}' : '\u{2630}'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            NeurIPS 2026 Workshop
          </div>
          <h1 className="hero-title-oneline">
            UniMAS: A Unified View of Multi-Agent Systems for Embodied AI (NeurIPS, 2026)
          </h1>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4C5}'}</span>
              December 12 or 13, 2026
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4CD}'}</span>
              Atlanta, GA, USA
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F3DB}\u{FE0F}'}</span>
              Co-located with NeurIPS 2026
            </div>
          </div>
          <div className="hero-actions">
            <a href="#cfp" className="btn btn-primary">
              Submit a Paper &#8599;
            </a>
            <a href="#about" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">About</div>
              <h2 className="section-title">Workshop Overview</h2>
              <p className="section-description">
                Connecting robotics, control, and embodied systems with LLM agents, world models, and multi-agent AI.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Multi-agent systems are central to real-world intelligent systems, including
                  <strong> robotic teams, autonomous driving, manufacturing, and healthcare</strong>,
                  where agents must coordinate under uncertainty and dynamic environments. In parallel,
                  recent advances in AI have produced a new class of multi-agent systems driven by
                  <strong> large language models (LLMs), vision-language models (VLMs), and world models</strong>,
                  enabling complex reasoning, planning, and coordination in simulated environments.
                </p>
                <p>
                  However, these two paradigms remain <strong>fundamentally misaligned</strong>: robotic
                  control treats multi-agent systems as physically grounded, safety-critical dynamical
                  systems, while modern AI treats them as representation-driven, reasoning-based agents.
                  Robotics emphasizes <strong>dynamics, constraints, and distributed control</strong>,
                  whereas AI focuses on learned representations and flexible interaction, including
                  multi-agent reinforcement learning, emergent communication, and LLM-based coordination.
                </p>
                <p>
                  At the same time, recent work reveals <strong>structural convergence</strong> across
                  these paradigms, including latent message passing, symbolic communication, and
                  parameter-level coordination. <strong>UniMAS addresses this gap by reframing
                  multi-agent systems as a unified problem of embodied intelligence across physical and
                  digital domains</strong>, focusing on shared principles of representation, coordination,
                  and distributed decision-making.
                </p>
                <p>
                  This gap is increasingly urgent as embodied AI pushes multi-agent systems from
                  simulation to real-world deployment. LLM-based agents and world models enable scalable
                  reasoning and coordination, while robotics and control provide robust mechanisms under
                  physical constraints. <strong>No existing venue</strong> explicitly connects these
                  paradigms at the level of system abstraction and design principles. UniMAS directly
                  targets this missing layer.
                </p>
                <p>
                  UniMAS builds a community that connects robotics, control, and embodied systems with
                  LLM agents, world models, and multi-agent AI. It <strong>establishes a shared
                  vocabulary, aligns assumptions, and surfaces core challenges</strong> in multi-agent
                  intelligence. By unifying model-centric and physically grounded perspectives, UniMAS
                  enables meaningful cross-disciplinary collaboration and accelerates progress toward
                  real-world multi-agent systems, making it a natural fit for NeurIPS. We expect{' '}
                  <strong>50&ndash;100 participants</strong> from academia and industry across robotics,
                  control, embodied AI, and foundation-model-based agents.
                </p>
              </div>
              <div className="about-highlights">
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F3AF}'}</span>
                  <div>
                    <h4>Bridging Two Paradigms</h4>
                    <p>Connecting physically grounded robotics with AI-driven reasoning agents under a single framework.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F91D}'}</span>
                  <div>
                    <h4>Cross-Disciplinary</h4>
                    <p>Robotics, control, NLP, reinforcement learning, and embodied AI researchers and practitioners, all in one place.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F4AC}'}</span>
                  <div>
                    <h4>Full-Day Program</h4>
                    <p>Four keynotes, contributed talks, panel discussion, poster session, and a networking reception.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F331}'}</span>
                  <div>
                    <h4>Open to All</h4>
                    <p>Travel awards for students, K-12 outreach, and support for underrepresented groups. We expect 50&ndash;100 participants.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Call for Papers (unified: Topics + Dates + Submission) */}
      <section className="section section-alt" id="cfp">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Submit Your Work</div>
              <h2 className="section-title">Call for Papers</h2>
              <p className="section-description">
                We invite research paper submissions describing original, ongoing, or recently
                published work at the intersection of multi-agent systems, robotics, embodied AI,
                and foundation-model-based agents. All submissions are <strong>non-archival</strong>{' '}
                and managed via <strong>OpenReview</strong>.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="cfp-subheading" id="topics">Topics of Interest</h3>
            <p className="cfp-sub-desc">
              We welcome submissions on topics spanning the full range of multi-agent systems
              for embodied AI. Topics include, but are not limited to:
            </p>
          </FadeIn>

          <div className="topics-grid">
            {TOPICS.map((topic, i) => (
              <FadeIn key={i}>
                <div className="topic-card">
                  <span className="topic-icon">{topic.icon}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h3 className="cfp-subheading" id="dates">Important Dates</h3>
            <p className="cfp-sub-desc">All deadlines are 11:59 PM Anywhere on Earth (AoE).</p>
            <div className="timeline">
              {DATES.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className={`timeline-dot ${item.highlight ? 'highlight' : ''}`}></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-label">{item.label}</div>
                    {item.note && <div className="timeline-note">{item.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="cfp-subheading" id="submission">Submission Overview</h3>
            <div className="submission-card">
              <p>
                UniMAS solicits research paper submissions describing original, ongoing, or
                recently published work. All submissions are <strong>non-archival</strong> and
                hosted on <strong>OpenReview</strong> to ensure transparency and community
                engagement.
              </p>

              <div className="submission-details">
                <div className="submission-detail">
                  <h4>Format</h4>
                  <p>9 pages main text + unlimited references, using the NeurIPS 2026 LaTeX template. The main content must be self-contained.</p>
                </div>
                <div className="submission-detail">
                  <h4>Review Process</h4>
                  <p>Each paper receives at least two double-blind reviews from program committee members with expertise spanning robotics/control and AI/LLM agents.</p>
                </div>
                <div className="submission-detail">
                  <h4>Submission Platform</h4>
                  <p>OpenReview. All listed authors must have an up-to-date OpenReview profile with current institutional affiliation, homepage, and Google Scholar.</p>
                </div>
                <div className="submission-detail">
                  <h4>Evaluation Criteria</h4>
                  <p>Technical merit, originality, relevance, clarity, potential impact, and ethics.</p>
                </div>
                <div className="submission-detail">
                  <h4>Originality</h4>
                  <p>Submissions must present original work. Papers under review or already published in peer-reviewed venues cannot be submitted. Previously presented work in non-archival workshops is allowed.</p>
                </div>
                <div className="submission-detail">
                  <h4>Anonymity</h4>
                  <p>Submissions must follow double-blind review. No identifying information in the paper, supplementary material, or external links.</p>
                </div>
                <div className="submission-detail">
                  <h4>Authorship</h4>
                  <p>All listed authors must have contributed substantially. LLMs cannot be listed as authors but may be cited as tools.</p>
                </div>
                <div className="submission-detail">
                  <h4>Conflicts of Interest</h4>
                  <p>Managed following standard NeurIPS/OpenReview policies, with automatic conflict detection and manual verification by organizers.</p>
                </div>
              </div>

              <p>
                Both <strong>mature projects and early-stage work</strong> are welcome. Accepted
                papers will be presented as posters or oral talks. Authors are encouraged to
                discuss the ethical implications of their research where relevant.
              </p>
              <a
                href="https://openreview.net"
                className="btn-submit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit on OpenReview &#8599;
              </a>
              <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                OpenReview submission site link will be updated soon.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="cfp-subheading">Submission Guidelines</h3>
            <div className="cfp-guidelines">
              <p>
                Submissions must adhere to the <strong>NeurIPS 2026 submission format</strong> and
                be submitted as PDFs through the{' '}
                <a href="https://openreview.net" target="_blank" rel="noopener noreferrer">OpenReview platform</a>.
                All submissions will undergo a rigorous double-blind peer review process.
                Accepted papers will be included in the UniMAS workshop non-archival proceedings.
              </p>
              <ul>
                <li>
                  <strong>Deadlines:</strong> Submission deadlines are strict, and no extensions
                  will be granted. Placeholder/dummy abstracts are not allowed.
                </li>
                <li>
                  <strong>Formatting:</strong> Submissions must use the{' '}
                  <a href="https://neurips.cc/Conferences/2026/CallForPapers" target="_blank" rel="noopener noreferrer">NeurIPS 2026 LaTeX template</a>.
                  Papers are limited to <strong>9 pages of main content</strong>, with unlimited
                  space for references and an optional appendix. The first 9 pages must be
                  self-contained, as reviewers are not required to read beyond these.
                </li>
                <li>
                  <strong>Authorship:</strong> All listed authors must have contributed
                  substantially to the work and agree to its submission. Large Language Models
                  (LLMs) cannot be listed as authors but may be cited as tools if used appropriately.
                </li>
                <li>
                  <strong>Anonymity:</strong> Submissions must follow the double-blind review
                  process. Authors should ensure that no identifying information appears in the
                  paper, supplementary material, or any external links.
                </li>
                <li>
                  <strong>Originality:</strong> Submissions must present original work. Papers
                  under review at, or published in, other peer-reviewed venues cannot be
                  submitted. Previously presented work in workshops or non-archival formats is
                  allowed but must be appropriately anonymized.
                </li>
                <li>
                  <strong>Ethics:</strong> Authors are encouraged to include a section on the
                  ethical implications of their research and data use. Submissions must comply
                  with the{' '}
                  <a href="https://neurips.cc/public/EthicsGuidelines" target="_blank" rel="noopener noreferrer">NeurIPS Code of Ethics</a>.
                </li>
                <li>
                  <strong>Code of Conduct:</strong> Authors are required to adhere to the{' '}
                  <a href="https://neurips.cc/public/CodeOfConduct" target="_blank" rel="noopener noreferrer">NeurIPS Code of Conduct</a>.
                </li>
              </ul>
            </div>

            <h3 className="cfp-subheading">Reviewing Process</h3>
            <div className="cfp-guidelines">
              <p>
                Each submission will undergo a rigorous double-blind peer review process.
                Submissions will be evaluated on criteria such as <strong>technical merit,
                originality, potential impact, and ethics</strong>. Each paper will receive at
                least two reviews from program committee members with expertise spanning
                robotics/control and AI/LLM agents.
              </p>
              <p>Reviewers, including organizers, will not evaluate submissions from individuals who:</p>
              <ul>
                <li>Have been colleagues within the same organization in the past three years.</li>
                <li>Have co-authored publications within the last three years.</li>
                <li>Are currently affiliated with the same institution as the submitting authors.</li>
              </ul>
              <p>
                To ensure an unbiased review process, we recruit reviewers from diverse
                institutions and varying levels of expertise. Conflicts of interest are managed
                following standard NeurIPS/OpenReview policies, with automatic conflict detection
                and manual verification by organizers. Only unpublished work will be accepted;
                any submissions already published elsewhere will be desk-rejected.
              </p>
            </div>

            <h3 className="cfp-subheading">Publication and Presentation Policies</h3>
            <div className="cfp-guidelines">
              <p>
                Accepted papers will be hosted on the workshop website as part of the
                non-archival proceedings. At least one author of each accepted paper is required
                to register for NeurIPS 2026 and present their work at the workshop, either as an
                oral talk or a poster, as determined by the organizers. Presenters are
                encouraged to clearly explain the contributions and implications of their work.
                Virtual presentation options may be considered for authors unable to attend in
                person, in line with NeurIPS&rsquo;s participation policy.
              </p>
              <p>
                <strong>Camera-Ready and Poster Guidelines.</strong> Detailed camera-ready
                instructions and poster size guidelines will be shared with authors after
                acceptance notifications.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="section" id="speakers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Confirmed Speakers</div>
              <h2 className="section-title">Keynote Speakers</h2>
              <p className="section-description">
                Leading researchers working across multi-agent systems, robotics, and foundation models.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {SPEAKERS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Schedule */}
      <section className="section section-alt" id="schedule">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Program</div>
              <h2 className="section-title">Tentative Schedule</h2>
              <p className="section-description">
                December 12 or 13, 2026 | Atlanta, GA, USA
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="schedule-table">
              {SCHEDULE.map((item, i) => (
                <div className={`schedule-row ${item.isBreak ? 'break-row' : ''}`} key={i}>
                  <div className="schedule-time">{item.time}</div>
                  <div className="schedule-event">
                    <div className="schedule-event-title">{item.title}</div>
                    {item.speaker && !item.isBreak && (
                      <div className="schedule-event-speaker">{item.speaker}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Organizers */}
      <section className="section" id="organizers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Team</div>
              <h2 className="section-title">Workshop Organizers</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {ORGANIZERS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sponsors — hidden until finalized */}
      {false && (
      <section className="section section-alt" id="sponsors">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Support</div>
              <h2 className="section-title">Sponsors</h2>
              <p className="section-description">
                We are grateful to our sponsors for supporting this workshop.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="sponsor-note">
              <p>
                We have secured initial sponsorship from <strong>Cisco</strong>, <strong>Nvidia</strong>, <strong>EigenAI</strong>, and <strong>Abaka AI</strong>.
                We are also pursuing additional support from the <strong>Commonwealth Cyber Initiative</strong> and the <strong>Virginia Tech AI Center</strong> to fund student travel awards.
              </p>
              <p style={{ marginTop: '12px' }}>
                Interested in sponsoring? Please <a href="mailto:unimas-workshop@googlegroups.com">get in touch</a>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
      )}

      {/* Contact */}
      <section className="section" id="contact">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Get in Touch</div>
              <h2 className="section-title">Contact</h2>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="contact-card">
              <p>
                For questions about submissions, the program, or sponsorship, reach out to us at:
              </p>
              <a href="mailto:unimas-workshop@googlegroups.com" className="contact-email">
                unimas-workshop@googlegroups.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>UniMAS</span> Workshop
          </div>
          <p className="footer-text">
            Co-located with NeurIPS 2026 | December 12 or 13, 2026 | Atlanta, GA, USA
          </p>
          <div className="footer-links">
            <a href="https://neurips.cc/Conferences/2026" target="_blank" rel="noopener noreferrer">NeurIPS 2026</a>
            <a href="https://neurips.cc/Conferences/2026/CallForPapers" target="_blank" rel="noopener noreferrer">Call for Papers</a>
            <a href="#cfp">Submit a Paper</a>
            <a href="mailto:unimas-workshop@googlegroups.com">Contact</a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            &copy; 2026 UniMAS Workshop. All participants must follow the{' '}
            <a href="https://neurips.cc/public/CodeOfConduct" target="_blank" rel="noopener noreferrer">
              NeurIPS Code of Conduct
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
