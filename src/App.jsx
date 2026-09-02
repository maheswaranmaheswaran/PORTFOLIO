import "./App.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaGitAlt,
  FaCode,
  FaDatabase,
  FaArrowRight,
  FaPaperPlane,
  FaTimes,
  FaRocket,
  FaUserAstronaut,
  FaAward,
  FaHeart,
  FaInstagram,
  FaMicrophone,
  FaStop,
  FaTerminal,
  FaSearch,
  FaDownload,
  FaKeyboard,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { SiMysql, SiDjango, SiVite } from "react-icons/si";

import profile from "./assets/profile.jpeg";

function App() {
  // =====================================================
  // CHAT STATE
  // =====================================================

  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm Maheswaran's AI portfolio assistant. Ask me about his skills, projects, education, certifications or experience.",
    },
  ]);

  // =====================================================
  // ADVANCED PORTFOLIO STATE
  // =====================================================

  const [booting, setBooting] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState([
    "MB.OS v2.0 — developer terminal ready",
    'Type "help" to view available commands.',
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => setBooting(false), 1800);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleShortcut);
    handleScroll();

    return () => {
      window.clearTimeout(bootTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleShortcut);
      recognitionRef.current?.stop?.();
      window.speechSynthesis?.cancel?.();
    };
  }, []);

  const navigateTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setCommandOpen(false);
  };

  const speakAIResponse = (text) => {
    if (!("speechSynthesis" in window) || !text) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      text.replace(/[*#_`]/g, "").replace(/\n+/g, " ")
    );

    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1;

    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  const stopAIResponse = () => {
    window.speechSynthesis?.cancel?.();
    recognitionRef.current?.stop?.();
    setIsSpeaking(false);
    setIsListening(false);
  };

  const startVoiceAssistant = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Voice recognition is not supported in this browser. Please use Chrome or Edge, or continue with text chat.",
        },
      ]);
      setChatOpen(true);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop?.();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setChatOpen(true);
      setIsListening(true);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = async (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (!transcript) return;

      setMessages((prev) => [...prev, { type: "user", text: transcript }]);
      setChatLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Chat request failed");

        const reply =
          data.reply || "Sorry, I couldn't understand that. Please try again.";

        setMessages((prev) => [...prev, { type: "bot", text: reply }]);
        speakAIResponse(reply);
      } catch (error) {
        console.error("Voice AI Error:", error);
        const fallback =
          "I'm unable to connect to the portfolio assistant right now.";
        setMessages((prev) => [...prev, { type: "bot", text: fallback }]);
        speakAIResponse(fallback);
      } finally {
        setChatLoading(false);
      }
    };

    recognition.start();
  };

  const runTerminalCommand = (event) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    const outputMap = {
      help: "Commands: whoami, skills, projects, contact, resume, clear",
      whoami: "Maheswaran B — Full Stack Python Developer",
      skills: "Python • React • JavaScript • Django • MySQL • Git • Vite",
      projects: "6 project modules detected. Opening PROJECTS section...",
      contact: "Email: maheswaran2004.b@gmail.com | Chennai, Tamil Nadu",
      resume: "Opening Maheswaran's resume...",
    };

    if (command === "clear") {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    }

    const output =
      outputMap[command] || `Command not found: ${command}. Type "help".`;

    setTerminalLines((prev) => [...prev, `> ${terminalInput}`, output]);
    setTerminalInput("");

    if (command === "projects") navigateTo("projects");
    if (command === "contact") navigateTo("contact");
    if (command === "resume") {
      window.open("/Maheswaran_Resume.pdf", "_blank", "noopener,noreferrer");
    }
  };

  // =====================================================
  // CONTACT STATE
  // =====================================================

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  // =====================================================
  // CHATBOT
  // =====================================================

  const sendMessage = async () => {
    const text = message.trim();

    if (!text || chatLoading) return;

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
    ]);

    setMessage("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Chat request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            data.reply ||
            "Sorry, I couldn't understand that. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Chat API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "⚠️ Unable to connect to the backend right now. Please try again later.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // =====================================================
  // CHAT ENTER KEY
  // =====================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // =====================================================
  // CONTACT INPUT
  // =====================================================

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CONTACT FORM
  // =====================================================

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (
      !contactData.name.trim() ||
      !contactData.email.trim() ||
      !contactData.message.trim()
    ) {
      setContactStatus("⚠️ Please fill all fields.");
      return;
    }

    setContactLoading(true);
    setContactStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Contact API failed");
      }

      setContactStatus(
        data.message ||
          "✅ Thank you! Your message has been received."
      );

      setContactData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact API Error:", error);

      setContactStatus(
        "⚠️ Unable to send message. Please try again."
      );
    } finally {
      setContactLoading(false);
    }
  };

  // =====================================================
  // SKILLS
  // =====================================================

  const skills = [
    { name: "Python", icon: <FaPython /> },
    { name: "React", icon: <FaReact /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "Bootstrap", icon: <FaBootstrap /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "Django", icon: <SiDjango /> },
    { name: "Vite", icon: <SiVite /> },
    { name: "Database", icon: <FaDatabase /> },
    { name: "Frontend", icon: <FaCode /> },
  ];

  // =====================================================
  // PROJECTS
  // =====================================================

  const projects = [
    {
      number: "01",
      icon: <FaCode />,
      title: "Real-Time Object Detection",
      description:
        "Real-time object detection system developed using YOLOv4 and computer vision concepts.",
      tech: ["Python", "YOLOv4", "OpenCV"],
    },
    {
      number: "02",
      icon: <FaCode />,
      title: "Music Web Application",
      description:
        "Modern music web application with an interactive interface and dynamic content.",
      tech: ["Python", "Django", "HTML", "CSS"],
    },
    {
      number: "03",
      icon: <FaRocket />,
      title: "Anime Streaming Website",
      description:
        "Responsive anime streaming platform designed with a modern user experience.",
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      number: "04",
      icon: <FaDatabase />,
      title: "Workforce Administration",
      description:
        "Web-based workforce administration system for managing organizational data.",
      tech: ["Python", "React", "AWS"],
    },
    {
      number: "05",
      icon: <FaReact />,
      title: "Modern React Portfolio",
      description:
        "Futuristic animated developer portfolio with responsive UI and interactive effects.",
      tech: ["React", "Vite", "Bootstrap"],
    },
    {
      number: "06",
      icon: <FaCode />,
      title: "Full Stack Web Solutions",
      description:
        "Full-stack web development solutions combining modern frontend and backend technologies.",
      tech: ["Python", "React", "MySQL"],
    },
  ];

  // =====================================================
  // CERTIFICATIONS
  // =====================================================

  const certifications = [
    "Cisco – Networking Essentials",
    "EY – Web Technology Full Stack Using Django",
    "IIE – Full Stack Development (Python)",
    "Microsoft – Advanced Level Certification",
    "IBM – Machine Learning with Python",
    "IBM – Data Science",
    "NSS – National Service Scheme Certificate",
  ];

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="portfolio">

      {/* =================================================
          ADVANCED BOOT + SCROLL HUD
      ================================================= */}

      {booting && (
        <div className="boot-screen">
          <div className="boot-core">
            <div className="boot-logo">MB<span>.</span>OS</div>
            <div className="boot-title">INITIALIZING PORTFOLIO</div>
            <div className="boot-bar"><span></span></div>
            <div className="boot-log">
              <span>&gt; Loading developer interface</span>
              <span>&gt; Connecting project modules</span>
              <span>&gt; Initializing portfolio AI</span>
              <strong>SYSTEM ONLINE</strong>
            </div>
          </div>
        </div>
      )}

      <div className="scroll-hud" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }}></span>
      </div>

      {/* =================================================
          SPACE BACKGROUND
      ================================================= */}

      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="scan-lines"></div>

      <div className="space-orb orb-one"></div>
      <div className="space-orb orb-two"></div>
      <div className="space-orb orb-three"></div>

      <div className="planet planet-one"></div>
      <div className="planet planet-two"></div>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="navbar">

        <a href="#home" className="logo">
          MB<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#certifications">CERTIFICATIONS</a>
          <a href="#contact">CONTACT</a>
        </div>

        <button
          className="command-trigger"
          type="button"
          onClick={() => setCommandOpen(true)}
          title="Open Command Center (Ctrl + K)"
        >
          <FaSearch />
          <span>CTRL K</span>
        </button>

        <div className="nav-status">
          <span></span>
          AVAILABLE
        </div>

      </nav>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero" id="home">

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="system-label">
            <span>●</span> SYSTEM ONLINE
          </div>

          <div className="hero-subtitle">
            FULL STACK DEVELOPER
          </div>

          <h1>
            Hi, I'm <span>Maheswaran</span>
          </h1>

          <div className="hero-line"></div>

          <h2>
            <span>Full Stack Python Developer</span>
          </h2>

          <p className="hero-description">
            I build modern, responsive and interactive web applications
            using Python, React, JavaScript and modern web technologies.
            I enjoy transforming ideas into clean, functional and
            visually impressive digital experiences.
          </p>

          <div className="hero-buttons">

            <a href="#projects" className="btn-primary">
              VIEW PROJECTS <FaArrowRight />
            </a>

            <a href="#contact" className="btn-secondary">
              CONTACT ME
            </a>

            <a
              href="/Maheswaran_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-resume"
            >
              RESUME <FaDownload />
            </a>

          </div>

          {/* SOCIAL LINKS */}

          <div className="social-icons">

            <a
              href="https://github.com/maheswaranmaheswaran"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/i-maheswaran"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=maheswaran2004.b@gmail.com"
  target="_blank"
  rel="noreferrer"
  aria-label="Gmail"
>
  <MdEmail />
</a>

            <a
              href="https://wa.me/917812835200"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.instagram.com/_______.spark._______/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

          </div>

        </motion.div>

        {/* HERO IMAGE */}

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >

          <div className="image-ring ring-one"></div>
          <div className="image-ring ring-two"></div>
          <div className="image-ring ring-three"></div>

          <div className="profile-frame">

            <img
              src={profile}
              alt="Maheswaran"
              className="profile-img"
            />

            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>

          </div>

          <div className="floating-tech tech-python">
            <FaPython />
          </div>

          <div className="floating-tech tech-react">
            <FaReact />
          </div>

          <div className="floating-tech tech-code">
            <FaCode />
          </div>

        </motion.div>

      </section>

      {/* =================================================
          ABOUT
      ================================================= */}

      <section className="section" id="about">

        <div className="section-heading">

          <span>01</span>

          <h2>
            ABOUT <b>ME</b>
          </h2>

          <div className="heading-line"></div>

        </div>

        <div className="about-grid">

          <motion.div
            className="about-card"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <div className="card-icon">
              <FaUserAstronaut />
            </div>

            <div>

              <h3>WHO AM I?</h3>

              <p>
                I am Maheswaran B, a Full Stack Python Developer
                passionate about creating modern and efficient web
                applications.
              </p>

              <p>
                I have experience working with frontend technologies
                such as React, JavaScript, HTML, CSS and Bootstrap,
                along with backend and database technologies.
              </p>

              <p>
                My goal is to continuously improve my development
                skills and build meaningful real-world applications.
              </p>

            </div>

          </motion.div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>EDUCATION</span>
              <strong>B.Tech IT</strong>
              <small>INFORMATION TECHNOLOGY</small>
            </div>

            <div className="stat-card">
              <span>ROLE</span>
              <strong>FULL STACK</strong>
              <small>PYTHON DEVELOPER</small>
            </div>

            <div className="stat-card">
              <span>FOCUS</span>
              <strong>WEB DEV</strong>
              <small>FRONTEND + BACKEND</small>
            </div>

            <div className="stat-card">
              <span>LOCATION</span>
              <strong>CHENNAI</strong>
              <small>TAMIL NADU, INDIA</small>
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          SKILLS
      ================================================= */}

      <section className="section" id="skills">

        <div className="section-heading">

          <span>02</span>

          <h2>
            TECH <b>ARSENAL</b>
          </h2>

          <div className="heading-line"></div>

        </div>

        <div className="skills-grid">

          {skills.map((skill, index) => (

            <motion.div
              className="skill-card"
              key={skill.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
            >

              {skill.icon}

              <span>{skill.name}</span>

            </motion.div>

          ))}

        </div>

      </section>

      {/* =================================================
          DEVELOPER TERMINAL — ADVANCED ADDITION
      ================================================= */}

      <section className="section terminal-section" id="terminal">
        <div className="section-heading">
          <span>SYS</span>
          <h2>DEVELOPER <b>TERMINAL</b></h2>
          <div className="heading-line"></div>
        </div>

        <motion.div
          className={`dev-terminal ${terminalOpen ? "expanded" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span></span><span></span><span></span>
            </div>
            <strong>MAHESWARAN://PORTFOLIO</strong>
            <button type="button" onClick={() => setTerminalOpen((prev) => !prev)}>
              <FaTerminal />
            </button>
          </div>

          <div className="terminal-body">
            {terminalLines.map((line, index) => (
              <div className="terminal-line" key={`${line}-${index}`}>{line}</div>
            ))}

            <form className="terminal-command" onSubmit={runTerminalCommand}>
              <span>MB@portfolio:~$</span>
              <input
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder='try "help"'
                autoComplete="off"
              />
            </form>
          </div>
        </motion.div>
      </section>

      {/* =================================================
          PROJECTS
      ================================================= */}

      <section className="section" id="projects">

        <div className="section-heading">

          <span>03</span>

          <h2>
            MY <b>PROJECTS</b>
          </h2>

          <div className="heading-line"></div>

        </div>

        <div className="project-grid">

          {projects.map((project, index) => (

            <motion.div
              className="project-card"
              key={project.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
            >

              <div className="project-number">
                {project.number}
              </div>

              <div className="project-icon">
                {project.icon}
              </div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-tech">

                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}

              </div>

              <div className="project-arrow">
                <FaArrowRight />
              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* =================================================
          CERTIFICATIONS
      ================================================= */}

      <section
        className="section"
        id="certifications"
      >

        <div className="section-heading">

          <span>04</span>

          <h2>
            CERTIFICATIONS <b>ACHIEVED</b>
          </h2>

          <div className="heading-line"></div>

        </div>

        <div className="tech-grid">

          {certifications.map((certificate, index) => (

            <motion.div
              className="tech-card"
              key={certificate}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >

              <FaAward />

              <span>{certificate}</span>

            </motion.div>

          ))}

        </div>

      </section>

      {/* =================================================
          CONTACT
      ================================================= */}

      <section
        className="section mission-section"
        id="contact"
      >

        <div className="section-heading">

          <span>05</span>

          <h2>
            <b>CONTACT</b>
          </h2>

          <div className="heading-line"></div>

        </div>

        <div className="mission-box">

          <div className="mission-info">

            <div className="mission-icon">
              <FaRocket />
            </div>

            <h3>
              LET'S BUILD
              <span> SOMETHING</span>
            </h3>

            <p>
              Have an idea, project or opportunity? Let's
              connect and turn it into something awesome.
            </p>

            <a
              href="mailto:maheswaran2004.b@gmail.com"
              className="email-link"
            >
              <MdEmail />
              maheswaran2004.b@gmail.com
            </a>

          </div>

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >

            <div className="input-group">

              <label>NAME</label>

              <input
                type="text"
                name="name"
                value={contactData.name}
                onChange={handleContactChange}
                placeholder="Enter your name"
                disabled={contactLoading}
              />

            </div>

            <div className="input-group">

              <label>EMAIL</label>

              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleContactChange}
                placeholder="Enter your email"
                disabled={contactLoading}
              />

            </div>

            <div className="input-group">

              <label>MESSAGE</label>

              <textarea
                rows="5"
                name="message"
                value={contactData.message}
                onChange={handleContactChange}
                placeholder="Write your message..."
                disabled={contactLoading}
              />

            </div>

            <button
              className="mission-button"
              type="submit"
              disabled={contactLoading}
            >

              {contactLoading
                ? "SENDING..."
                : "SEND MESSAGE"}

              {!contactLoading && <FaPaperPlane />}

            </button>

            {contactStatus && (
              <div className="contact-status">
                {contactStatus}
              </div>
            )}

          </form>

        </div>

      </section>

      {/* =================================================
          COMMAND CENTER — CTRL + K
      ================================================= */}

      {commandOpen && (
        <div className="command-overlay" onMouseDown={() => setCommandOpen(false)}>
          <motion.div
            className="command-center"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="command-head">
              <div>
                <small>MB.OS / NAVIGATION</small>
                <h3>COMMAND CENTER</h3>
              </div>
              <kbd>ESC</kbd>
            </div>

            <div className="command-search">
              <FaSearch />
              <span>Jump anywhere in the portfolio</span>
              <kbd>CTRL K</kbd>
            </div>

            <div className="command-grid">
              <button onClick={() => navigateTo("about")}><FaUserAstronaut /> About Me</button>
              <button onClick={() => navigateTo("skills")}><FaCode /> Skills</button>
              <button onClick={() => navigateTo("projects")}><FaRocket /> Projects</button>
              <button onClick={() => navigateTo("certifications")}><FaAward /> Certifications</button>
              <button onClick={() => navigateTo("terminal")}><FaTerminal /> Developer Terminal</button>
              <button onClick={() => { setChatOpen(true); setCommandOpen(false); }}><FaMicrophone /> AI Assistant</button>
              <button onClick={() => window.open("/Maheswaran_Resume.pdf", "_blank", "noopener,noreferrer")}><FaDownload /> Resume</button>
              <button onClick={() => navigateTo("contact")}><MdEmail /> Contact</button>
            </div>

            <div className="command-footer">
              <FaKeyboard /> Keyboard powered navigation
            </div>
          </motion.div>
        </div>
      )}

      {/* =================================================
          CHATBOT
      ================================================= */}

      <div className="chat-widget">

        {chatOpen && (

          <div className="chat-panel">

            <div className="chat-header">

              <div>

                <strong>PORTFOLIO AI</strong>

                <small>
                  ● ONLINE ASSISTANT
                </small>

              </div>

              <button
                className="chat-close"
                onClick={() => setChatOpen(false)}
              >
                <FaTimes />
              </button>

            </div>

            <div className="chat-messages">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`chat-message ${msg.type}`}
                >
                  {msg.text}
                </div>

              ))}

              {chatLoading && (
                <div className="chat-message bot">
                  Typing...
                </div>
              )}

            </div>

            <div className="chat-quick-actions">
              {["Skills", "Projects", "Education"].map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => setMessage(`Tell me about Maheswaran's ${prompt.toLowerCase()}`)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="chat-input">

              <input
                type="text"
                placeholder="Ask something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={chatLoading}
              />

              <button
                className={`voice-button ${isListening ? "listening" : ""}`}
                onClick={isListening ? stopAIResponse : startVoiceAssistant}
                disabled={chatLoading}
                type="button"
                title={isListening ? "Stop listening" : "Voice assistant"}
              >
                {isListening ? <FaStop /> : <FaMicrophone />}
              </button>

              {isSpeaking && (
                <button
                  className="voice-stop-button"
                  onClick={stopAIResponse}
                  type="button"
                  title="Stop AI voice"
                >
                  <FaStop />
                </button>
              )}

              <button
                onClick={sendMessage}
                disabled={
                  !message.trim() || chatLoading
                }
              >
                <FaPaperPlane />
              </button>

            </div>

          </div>

        )}

        <button
          className="chat-launcher"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label="Open portfolio AI"
        >

          {chatOpen ? <FaTimes /> : <FaCode />}

          <span className="chat-pulse"></span>

        </button>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand">

            <a href="#home" className="logo">
              MB<span>.</span>
            </a>

            <p>
              Full Stack Python Developer building modern,
              responsive and futuristic digital experiences.
            </p>

          </div>

          <div>

            <h4>NAVIGATION</h4>

            <div className="footer-links">

              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#certifications">Certifications</a>
              <a href="#contact">Contact</a>

            </div>

          </div>

          <div>

            <h4>CONNECT</h4>

            <div className="footer-social">

              <a
                href="https://github.com/maheswaranmaheswaran"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/i-maheswaran"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=maheswaran2004.b@gmail.com"
  target="_blank"
  rel="noreferrer"
  aria-label="Gmail"
>
  <MdEmail />
</a>

              <a
                href="https://wa.me/917812835200"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.instagram.com/_______.spark._______/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 MAHESWARAN B. ALL RIGHTS RESERVED.
          </span>

          <span>
            MADE WITH <FaHeart /> & CODE
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;