import "./App.css";
import { useState } from "react";
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
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { SiMysql, SiDjango, SiVite } from "react-icons/si";

import profile from "./assets/profile.jpeg";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm Maheswaran's AI portfolio assistant. Ask me about his skills, projects, or experience.",
    },
  ]);

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text,
      },
    ]);

    setMessage("");

    setTimeout(() => {
      let reply =
        "Thanks for your message! You can contact Maheswaran directly through the Contact section.";

      const lower = text.toLowerCase();

      if (
        lower.includes("skill") ||
        lower.includes("technology") ||
        lower.includes("tech")
      ) {
        reply =
          "Maheswaran works with Python, React, JavaScript, HTML, CSS, Bootstrap, MySQL, Git and modern web technologies.";
      } else if (lower.includes("project")) {
        reply =
          "His projects include Real-Time Object Detection using YOLOv4, a Music Web App, Anime Streaming Website and Workforce Administration.";
      } else if (
        lower.includes("python") ||
        lower.includes("developer")
      ) {
        reply =
          "Maheswaran is a Full Stack Python Developer with frontend and backend development skills.";
      } else if (
        lower.includes("contact") ||
        lower.includes("email")
      ) {
        reply =
          "You can reach Maheswaran through the contact section or the email/social links available on this portfolio.";
      } else if (lower.includes("hello") || lower.includes("hi")) {
        reply =
          "Hello! 🚀 Welcome to Maheswaran's portfolio. What would you like to know?";
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: reply,
        },
      ]);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

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
      tech: ["Python", "Database", "Web"],
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

  return (
    <div className="portfolio">
      {/* SPACE BACKGROUND */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="scan-lines"></div>

      <div className="space-orb orb-one"></div>
      <div className="space-orb orb-two"></div>
      <div className="space-orb orb-three"></div>

      <div className="planet planet-one"></div>
      <div className="planet planet-two"></div>

      {/* NAVBAR */}
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

        <div className="nav-status">
          <span></span>
          AVAILABLE
        </div>
      </nav>

      {/* HERO */}
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
          </div>

          <div className="social-icons">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:yourmail@example.com"
              aria-label="Email"
            >
              <MdEmail />
            </a>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="mailto:yourmail@example.com"
              aria-label="Contact"
            >
              <FaEnvelope />
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

      {/* ABOUT */}
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

      {/* SKILLS */}
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

      {/* PROJECTS */}
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

      {/* CERTIFICATIONS */}
<section className="section" id="certifications">

  <div className="section-heading">
    <span>04</span>

    <h2>
      CERTIFICATIONS <b>ACHIEVED</b>
    </h2>

    <div className="heading-line"></div>
  </div>

  <div className="tech-grid">

    <div className="tech-card">
      <FaAward />
      <span>Cisco – Networking Essentials</span>
    </div>

    <div className="tech-card">
      <FaAward />
      <span>EY – Web Technology Full Stack Using Django</span>
    </div>

    <div className="tech-card">
      <FaAward />
      <span>IIE – Full Stack Development (Python)</span>
    </div>

    <div className="tech-card">
      <FaAward />
      <span>Microsoft – Advanced Level Certification</span>
    </div>

    <div className="tech-card">
      <FaAward />
      <span>IBM – Machine Learning with Python</span>
    </div>

    <div className="tech-card">
      <FaAward />
      <span>IBM – Data Science</span>
    </div>

    <div className="tech-card">
      <FaAward />
      <span>NSS – National Service Scheme Certificate</span>
    </div>

  </div>

</section>

      {/* CONTACT */}
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
              href="mailto:yourmail@example.com"
              className="email-link"
            >
              <MdEmail />
              yourmail@example.com
            </a>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="input-group">
              <label>NAME</label>

              <input
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="input-group">
              <label>EMAIL</label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label>MESSAGE</label>

              <textarea
                rows="5"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button className="mission-button" type="submit">
              SEND MESSAGE
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </section>

      {/* CHAT */}
      <div className="chat-widget">
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <div>
                <strong>PORTFOLIO AI</strong>
                <small>● ONLINE ASSISTANT</small>
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
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Ask something..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={sendMessage}
                disabled={!message.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}

        <button
          className="chat-launcher"
          onClick={() => setChatOpen(!chatOpen)}
        >
          {chatOpen ? <FaTimes /> : <FaCode />}
          <span className="chat-pulse"></span>
        </button>
      </div>

      {/* FOOTER */}
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
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <h4>CONNECT</h4>

            <div className="footer-social">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>

              <a href="mailto:yourmail@example.com">
                <MdEmail />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
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