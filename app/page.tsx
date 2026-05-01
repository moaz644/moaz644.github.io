
'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type Project = {
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  tools: string[];
  image: string;
  link?: string;
  live?: string;
  status?: string;
};

type Service = {
  title: string;
  text: string;
  deliverables: string[];
  tools: string[];
};

const navItems = [
  ['Home', 'home'],
  ['About Me', 'about'],
  ['Projects', 'projects'],
  ['Skills', 'skills'],
  ['Services', 'services'],
  ['Contact Me', 'contact'],
] as const;

const projects: Project[] = [
  {
    name: 'ShiftX Secure Vault',
    category: 'Software & Systems',
    image: '/assets/project-doc/shiftx.jpg',
    summary: 'A cross-platform desktop application for private file and text workflows, pairing a modern Python interface with a high-performance C++ processing core.',
    problem: 'Users need a practical desktop tool that makes sensitive information workflows clear, fast, and easy to use across platforms.',
    solution: 'Built a dual-layer architecture with a Python GUI connected to a C++ backend using libsodium and Argon2 for authenticated encryption and responsible password-derived processing.',
    highlights: ['Python desktop interface', 'C++ processing core', 'Clean API between interface and backend', 'Cross-platform product structure'],
    tools: ['Python', 'C++', 'libsodium', 'Argon2'],
    link: 'https://github.com/abdelgadermoaz/ShiftX',
    status: 'Active development'
  },
  {
    name: 'KGL System',
    category: 'Web & Business Systems',
    image: '/assets/project-doc/kgl.png',
    summary: 'A deployed ERP-style web application for stock, sales, and operations management with role-based access and a clean login experience.',
    problem: 'Organizations need centralized inventory and sales workflows with controlled access for different team responsibilities.',
    solution: 'Designed and built a full-stack operations system with authentication, role-based access logic, inventory workflows, sales tracking, and deployment-ready structure.',
    highlights: ['Role-based access', 'Stock and sales workflows', 'Modern dashboard structure', 'Deployed web application'],
    tools: ['Full-stack web', 'Database design', 'Vercel', 'Authentication'],
    link: 'https://github.com/abdelgadermoaz/Kgl_System',
    live: 'https://kgl-system.vercel.app',
    status: 'Live'
  },
  {
    name: 'Resistor Color Code Calculator',
    category: 'Web & Business Systems',
    image: '/assets/project-doc/resistor.png',
    summary: 'A lightweight web tool that calculates and formats resistance values for 4-band and 5-band through-hole resistors with real-time feedback.',
    problem: 'Hardware learners and electronics builders need a quick way to translate resistor color bands into readable engineering notation.',
    solution: 'Built a zero-dependency ES6 module application with dynamic dropdown feedback and automatic formatting into standard electronics notation.',
    highlights: ['4-band and 5-band modes', 'Dynamic color feedback', 'Engineering notation', 'Modular JavaScript codebase'],
    tools: ['JavaScript', 'HTML', 'CSS', 'ES6 Modules'],
    link: 'https://github.com/abdelgadermoaz/resistor-calculator',
    status: 'Completed'
  },
  {
    name: 'Tic-Tac-Toe CLI',
    category: 'Software & Systems',
    image: '/assets/project-visuals/tictactoe.svg',
    summary: 'A C++ command-line game with robust input validation, alternating turns, and automatic win or tie detection.',
    problem: 'A terminal game needs reliable state handling so every move is checked, recorded, and resolved correctly.',
    solution: 'Implemented a structured C++ game loop with board-state management, input validation, and efficient line-checking logic.',
    highlights: ['C++ game loop', 'Input validation', 'Automatic game-state detection', 'Terminal interface'],
    tools: ['C++', 'CLI', 'Game logic'],
    link: 'https://github.com/abdelgadermoaz/Tic-Tac-Toe',
    status: 'Completed'
  },
  {
    name: 'Multi-Agent Warehouse Simulation',
    category: 'Robotics & Autonomous Systems',
    image: '/assets/project-visuals/warehouse.svg',
    summary: 'A ROS 2 and Gazebo simulation where multiple robotic agents navigate warehouse-style tasks in a structured logistics environment.',
    problem: 'Robotics workflows need simulation-first validation to test coordination, navigation behavior, and task flow before hardware implementation.',
    solution: 'Created a ROS 2 simulation structure with C++ behavior logic, Gazebo environment setup, and multi-agent task execution patterns.',
    highlights: ['ROS 2 architecture', 'Gazebo simulation', 'Multi-agent task flow', 'Warehouse-style robotics'],
    tools: ['ROS 2', 'C++', 'Gazebo', 'Linux'],
    link: 'https://github.com/abdelgadermoaz/warehouse_bot_ros2',
    status: 'In progress'
  },
  {
    name: 'Marine Robot Simulation',
    category: 'Robotics & Autonomous Systems',
    image: '/assets/project-visuals/marine.svg',
    summary: 'A Python simulation of an autonomous marine robot with environment modeling, virtual sensors, waypoint control, and energy-aware speed logic.',
    problem: 'Marine robotics concepts need accessible simulation tools to study environment, energy, sensing, and control behavior before physical testing.',
    solution: 'Built a pure Python simulation with ocean current, wind, solar, wave, battery, sensor, controller, logging, and plotting modules.',
    highlights: ['2D marine robot model', 'Virtual sensors', 'Energy-aware control', 'Trajectory and battery plots'],
    tools: ['Python', 'Kinematics', 'Virtual sensors', 'Plotting'],
    link: 'https://github.com/abdelgadermoaz/marine-drone-sim',
    status: 'Completed'
  },
  {
    name: 'Energy-Aware Robot + Microgrid Planner',
    category: 'Renewable Energy & Smart Systems',
    image: '/assets/project-visuals/microgrid.svg',
    summary: 'A Python planner connecting robot task scheduling with solar generation, battery dispatch, grid cost, and energy availability over a 24-hour horizon.',
    problem: 'Energy-aware autonomous systems need mission planning that considers renewable availability, battery state, task timing, and operating cost.',
    solution: 'Developed baseline and energy-aware planning logic with time-series simulation, CSV exports, JSON summaries, visual plots, and a Markdown report.',
    highlights: ['24-hour time-series model', 'Solar and storage planning', 'Task schedule logic', 'Reports and visual outputs'],
    tools: ['Python', 'PV modeling', 'Planning logic', 'Optimization'],
    link: 'https://github.com/abdelgadermoaz/energy-aware-robot-microgrid',
    status: 'Completed'
  },
  {
    name: 'Water Entry Dynamics Simulation',
    category: 'Simulation & Physics Modeling',
    image: '/assets/project-doc/water-entry.png',
    summary: 'A Python-based 2D physics simulation for studying rigid-body water-entry behavior with gravity, drag, buoyancy, and surface-response visualization.',
    problem: 'Fluid-response behavior is difficult to understand without a visual model that shows motion and surface displacement over time.',
    solution: 'Built a custom NumPy and Matplotlib simulation loop that models motion, transition through a fluid interface, and simplified surface displacement.',
    highlights: ['2D physics model', 'Buoyancy and drag behavior', 'Surface-response visualization', 'Matplotlib animation output'],
    tools: ['Python', 'NumPy', 'Matplotlib', 'Physics modeling'],
    status: 'Completed'
  },
  {
    name: 'Wave-Vibration Energy Harvester Simulation Tool',
    category: 'Renewable Energy & Smart Systems',
    image: '/assets/project-doc/wave-harvester.png',
    summary: 'A Python toolkit for modeling wave-induced ship-hull vibrations and evaluating piezoelectric energy harvesting layouts.',
    problem: 'Marine energy harvesting requires simulation support to compare vessel response, local vibration behavior, and placement options.',
    solution: 'Created a pipeline for wave spectra, RAO-informed synthetic vibration, SDOF harvester response, and power-map visualization for placement decisions.',
    highlights: ['Wave spectrum input', 'Vibration time-series modeling', 'Harvester response calculation', 'Placement dashboard'],
    tools: ['Python', 'NumPy', 'SciPy', 'Matplotlib'],
    link: 'https://github.com/abdelgadermoaz/wave_harvester_tool',
    status: 'Completed'
  },
  {
    name: '3D Thermal Tracking Guidance Simulation',
    category: 'Simulation & Physics Modeling',
    image: '/assets/project-visuals/thermal-tracking.svg',
    summary: 'A MATLAB-based aerospace research simulation focused on 3D relative motion, thermal tracking, path estimation, and guidance visualization.',
    problem: 'Thermal tracking and guidance studies need configurable 3D visualization to understand estimation behavior and path planning in a controlled research environment.',
    solution: 'Built a MATLAB simulation environment with 3D kinematics, configurable initial conditions, path visualization, and smooth demonstration animations.',
    highlights: ['3D kinematics', 'Thermal tracking visualization', 'Path estimation', 'Configurable simulation cases'],
    tools: ['MATLAB', '3D modeling', 'Tracking simulation', 'Visualization'],
    status: 'Completed'
  },
  {
    name: 'Factory Digital Twin',
    category: 'Digital Twin & Industrial Systems',
    image: '/assets/project-visuals/factory.svg',
    summary: 'A full-stack MVP that simulates a time-stepped production line and reports utilization, energy use, and maintenance health.',
    problem: 'Industrial teams need early visibility into system behavior before full deployment, especially for utilization, energy, and maintenance planning.',
    solution: 'Built a simulation-backed dashboard with a Python engine, API layer, React interface, and production-line metrics.',
    highlights: ['Production-line simulation', 'Utilization metrics', 'Energy monitoring', 'Maintenance health indicators'],
    tools: ['Python', 'FastAPI', 'React', 'TypeScript', 'Vite'],
    status: 'MVP'
  },
  {
    name: 'Fixed-Wing UAV CAD Model',
    category: 'CAD & Mechanical Design',
    image: '/assets/project-doc/fixed-wing-uav.jpg',
    summary: 'A detailed fixed-wing UAV CAD model with aerodynamic surfaces, integrated control surfaces, and a clean mechanical assembly structure.',
    problem: 'Fixed-wing UAV concepts require precise surfacing and component integration before CFD analysis or prototyping.',
    solution: 'Created a full mechanical assembly including fuselage, wings, control surfaces, V-tail empennage, and front-mounted propulsion layout.',
    highlights: ['External aerodynamic surfacing', 'Assembly constraints', 'Detailed render', 'Ready for downstream analysis'],
    tools: ['SOLIDWORKS', 'CAD modeling', 'Rendering'],
    status: 'Completed'
  },
  {
    name: 'Custom Articulated Robotic Arm',
    category: 'CAD & Mechanical Design',
    image: '/assets/project-doc/robotic-arm.jpg',
    summary: 'A multi-axis robotic manipulator CAD assembly with rotational base joints, articulated linkages, motor housings, and end-effector interface.',
    problem: 'Robotic manipulator concepts require a rigid mechanical architecture that supports multi-axis motion and later workspace analysis.',
    solution: 'Modeled the full assembly with kinematic linkages, mechanical joints, enclosure geometry, and final rendering materials.',
    highlights: ['Kinematic linkage modeling', 'Joint assembly layout', 'Rigid-body structure', 'Workspace-analysis ready'],
    tools: ['SOLIDWORKS', 'Mechanical design', 'Robotics CAD'],
    status: 'Completed'
  },
  {
    name: 'Custom Truss-Frame Quadcopter',
    category: 'CAD & Mechanical Design',
    image: '/assets/project-doc/truss-quadcopter.jpg',
    summary: 'A mechanical CAD assembly of a quadcopter using lightweight truss arms and an integrated central electronics housing.',
    problem: 'Drone frames must balance low mass, structural rigidity, motor layout, and manufacturable geometry.',
    solution: 'Designed triangular truss arms, central housing, propulsion components, and assembly structure suitable for mass and stiffness review.',
    highlights: ['Truss frame architecture', 'Central electronics housing', 'Propulsion layout', 'Structural review ready'],
    tools: ['SOLIDWORKS', 'Drone design', 'Mechanical CAD'],
    status: 'Completed'
  },
  {
    name: 'Heavy-Duty Mechanical Pipe Vise',
    category: 'CAD & Mechanical Design',
    image: '/assets/project-doc/pipe-vise.jpg',
    summary: 'A detailed mechanical vise CAD model with baseplate, threaded spindle, V-jaw grips, and lateral locking mechanism.',
    problem: 'Mechanical clamping devices require precise component interaction, reliable alignment, and clear manufacturing-ready detailing.',
    solution: 'Modeled all individual components, applied mechanical mates, configured textures, and produced a polished product render.',
    highlights: ['Threaded spindle model', 'Interlocking jaw geometry', 'Mechanical mates', 'Photorealistic render'],
    tools: ['SOLIDWORKS', 'Mechanical assembly', 'Rendering'],
    status: 'Completed'
  }
];

const services: Service[] = [
  {
    title: 'Mechanical CAD Design',
    text: 'Precise mechanical models for prototypes, assemblies, product concepts, and manufacturable engineering layouts.',
    deliverables: ['3D models', 'Assemblies', '2D drawings', 'Design revisions'],
    tools: ['SOLIDWORKS', '3DEXPERIENCE', 'DraftSight']
  },
  {
    title: 'Robotics Development',
    text: 'Simulation-first robotics workflows for navigation behavior, multi-agent logic, and structured robot testing.',
    deliverables: ['ROS 2 packages', 'Simulation environments', 'Robot behaviors', 'Test scenarios'],
    tools: ['ROS 2', 'Gazebo', 'C++', 'Python']
  },
  {
    title: 'Simulation & Analysis',
    text: 'Python and MATLAB tools for motion, energy, vibration, tracking, and physical-system behavior.',
    deliverables: ['Simulation scripts', 'Plots', 'Reports', 'CSV / JSON outputs'],
    tools: ['Python', 'MATLAB', 'NumPy', 'Matplotlib']
  },
  {
    title: 'Engineering Software',
    text: 'Software products and web applications that combine usable interfaces with engineering logic.',
    deliverables: ['Web apps', 'Desktop tools', 'Dashboards', 'Automation tools'],
    tools: ['Next.js', 'React', 'Node.js', 'FastAPI']
  },
  {
    title: 'Engineering Consulting',
    text: 'Technical planning for teams and inventors who need feasibility review, architecture, or prototype strategy.',
    deliverables: ['Concept review', 'Technical roadmap', 'Tool selection', 'Prototype plan'],
    tools: ['Systems engineering', 'CAD', 'Simulation']
  }
];

const skillGroups = [
  {
    title: 'Engineering & Robotics',
    skills: ['SOLIDWORKS Expert / CSWE', '3DEXPERIENCE', 'DraftSight', 'CAD Modeling', 'Mechanical Design', 'ROS 2', 'Gazebo', 'Robotics Simulation', 'Systems Engineering', '3D Printing', 'Material Analysis', 'Digital Twins']
  },
  {
    title: 'Software Development & Simulation',
    skills: ['Python', 'MATLAB', 'C', 'C++', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'Node.js', 'NumPy', 'SciPy', 'Matplotlib', 'Plotly', 'Linux', 'Git', 'GitHub']
  },
  {
    title: 'Energy & Intelligent Systems',
    skills: ['Renewable Energy Integration', 'Microgrid Planning', 'Cyber-Physical Systems', 'IoT', 'Multi-Agent Simulations', 'Game Theory', 'Data Visualization', 'Control Logic', 'Optimization Thinking']
  }
];

function ThemeToggle({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="theme-toggle" aria-label="Toggle color theme">
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
      <span className="theme-dot" />
    </button>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  useEffect(() => {
    const saved = window.localStorage.getItem('moaz-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const nextTheme = saved === 'light' || saved === 'dark' ? saved : preferred;
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.dataset.theme = nextTheme;

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('revealed')),
      { threshold: 0.14 }
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  const filters = useMemo(() => ['All', ...Array.from(new Set(projects.map((project) => project.category)))], []);
  const visibleProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('moaz-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (formEndpoint) return;
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const subject = String(formData.get('subject') || 'Portfolio inquiry');
    const message = String(formData.get('message') || '');

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:abdelgadermoaz@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <main>
      <div className="background-grid" />
      <div className="background-orb background-orb-one" />
      <div className="background-orb background-orb-two" />
      <div className="robotic-background" aria-hidden="true">
        <span className="scanline scanline-one" />
        <span className="scanline scanline-two" />
        <span className="circuit-node node-one" />
        <span className="circuit-node node-two" />
        <span className="circuit-node node-three" />
        <span className="gear-shape gear-one" />
        <span className="gear-shape gear-two" />
        <span className="drone-path drone-path-one" />
        <span className="drone-path drone-path-two" />
      </div>

      <header className="site-header">
        <div className="section-shell header-inner">
          <a className="brand" href="#home" aria-label="Moaz Alnor home">
            <span className="brand-mark">MA</span>
            <span>Moaz Alnor</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, target]) => (
              <a key={target} href={`#${target}`}>{label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-contact" href="#contact">Contact Me</a>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <section id="home" className="section-shell hero-section">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow">Robotics Engineer • Mechanical Design Engineer</div>
          <h1>
            Moaz Alnor
            <span>Robotic systems, mechanical design, simulation, and software in one smooth engineering workflow.</span>
          </h1>
          <p className="hero-text">
            I build clean engineering experiences that connect CAD, robotics, simulation, and software into tested, useful, and visually clear systems.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="primary-button">Contact Me</a>
            <a href="#projects" className="secondary-button">View Projects</a>
          </div>

          <div className="hero-tags">
            {['Robotic systems', 'CAD design', 'Simulation tools', 'Software interfaces'].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="hero-visual" data-reveal>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="portrait-card">
            <img src="/assets/images/profile.png" alt="Moaz Alnor professional portrait" />
            <div className="portrait-caption">
              <strong>Mechanical Design Engineer</strong>
              <span>Simulation & Intelligent Systems Developer</span>
            </div>
          </div>
          <div className="floating-panel panel-code">
            <span>Python</span>
            <code>simulate → validate → build</code>
          </div>
          <div className="floating-panel panel-ros">
            <span>ROS 2</span>
            <code>navigation · agents · control</code>
          </div>
          <div className="floating-panel panel-cad">
            <span>CAD</span>
            <code>parts · assemblies · drawings</code>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell about-section" data-reveal>
        <div>
          <p className="section-kicker">About Me</p>
          <h2>Mechanical design, robotics, simulation, and software in one workflow.</h2>
        </div>
        <div className="about-copy">
          <p>
            I am a Mechanical Design Engineer with a strong cross-disciplinary focus in robotics, simulation, and robotics programming. I combine mechanical design and computational modeling to build practical, testable systems rather than static concepts.
          </p>
          <p>
            My work spans SOLIDWORKS, MATLAB, Python, ROS 2, Gazebo, and full-stack engineering tools. I am interested in autonomous systems, marine renewable energy, cyber-physical systems, and the intersection where mechanical engineering meets intelligent software.
          </p>
          <p>
            I am open to global freelance, contract, full-time, remote, hybrid, and on-site opportunities, especially across the UAE, KSA, and Gulf regions.
          </p>
        </div>
      </section>

      <section id="projects" className="section-shell projects-section">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Projects</p>
          <h2>Robotic portfolio projects with working filters, clear visuals, and detailed views.</h2>
          <p>Project visuals are pulled from your project document where available. Software, simulation, robotics, and CAD work are separated clearly so filters switch categories without hiding cards.</p>
        </div>

        <div className="filters" data-reveal>
          {filters.map((filter) => (
            <button key={filter} type="button" className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article key={project.name} className="project-card" tabIndex={0} onClick={() => setActiveProject(project)} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveProject(project);
              }
            }}>
              <div className="project-media">
                <img src={project.image} alt={`${project.name} visual`} />
                <span>{project.category}</span>
              </div>
              <div className="project-content">
                <div className="project-status-row">
                  <span>{project.status || 'Project'}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="tool-row">
                  {project.tools.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <button type="button">View Details</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section-shell skills-section">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Skills</p>
          <h2>Technical range across mechanical engineering and software delivery.</h2>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-group" data-reveal>
              <h3>{group.title}</h3>
              <div>
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="section-shell services-section">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Services</p>
          <h2>Services for clients who need design, simulation, robotics, or engineering software.</h2>
        </div>

        <div className="service-grid">
          {services.map((service, index) => (
            <article key={service.title} className="service-card" data-reveal style={{ '--delay': `${index * 60}ms` } as React.CSSProperties}>
              <div className="service-index">{String(index + 1).padStart(2, '0')}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <h4>Deliverables</h4>
              <div className="mini-tags">{service.deliverables.map((item) => <span key={item}>{item}</span>)}</div>
              <h4>Tools</h4>
              <div className="mini-tags muted">{service.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell contact-section" data-reveal>
        <div className="contact-info">
          <p className="section-kicker">Contact Me</p>
          <h2>Let’s discuss your engineering or software project.</h2>
          <p>
            Share the project goal, required deliverables, timeline, and preferred tools. The form uses Formspree when configured, otherwise it opens your email app as a fallback.
          </p>

          <div className="contact-links">
            <a href="mailto:abdelgadermoaz@gmail.com">abdelgadermoaz@gmail.com</a>
            <a href="https://wa.me/256705684555" target="_blank" rel="noreferrer">WhatsApp: +256705684555</a>
            <a href="https://github.com/abdelgadermoaz" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/moaz-abdelgader-alnor-422676192/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <form action={formEndpoint || undefined} method="POST" onSubmit={handleSubmit} className="contact-form">
          <input type="hidden" name="_subject" value="New portfolio inquiry" />
          <label>
            <span>Name</span>
            <input required name="name" type="text" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input required name="email" type="email" placeholder="you@example.com" />
          </label>
          <label>
            <span>Subject</span>
            <input required name="subject" type="text" placeholder="Project inquiry" />
          </label>
          <label>
            <span>Message</span>
            <textarea required name="message" rows={6} placeholder="Tell me about the project..." />
          </label>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <div className="section-shell footer-inner">
          <span>© {new Date().getFullYear()} Moaz Alnor</span>
        </div>
      </footer>

      {activeProject && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={activeProject.name}>
          <button type="button" className="modal-backdrop" aria-label="Close modal" onClick={() => setActiveProject(null)} />
          <div className="modal-card">
            <button className="modal-close" type="button" onClick={() => setActiveProject(null)}>×</button>
            <div className="modal-layout">
              <div className="modal-image"><img src={activeProject.image} alt={`${activeProject.name} visual`} /></div>
              <div>
                <span className="modal-category">{activeProject.category}</span>
                <h3>{activeProject.name}</h3>
                <p>{activeProject.summary}</p>
                <h4>Problem</h4>
                <p>{activeProject.problem}</p>
                <h4>Solution</h4>
                <p>{activeProject.solution}</p>
                <h4>Technical Highlights</h4>
                <ul>{activeProject.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="tool-row modal-tools">{activeProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                <div className="modal-actions">
                  {activeProject.link && <a href={activeProject.link} target="_blank" rel="noreferrer">GitHub Project</a>}
                  {activeProject.live && <a href={activeProject.live} target="_blank" rel="noreferrer">Live Site</a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
