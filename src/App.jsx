import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaPython,
  FaReact,
  FaNodeJs,
  FaAws,
  FaCss3Alt,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTypescript,
  SiDjango,
  SiFlask,
  SiMongodb,
  SiMysql,
  SiBootstrap,
  SiHtml5,
  SiVite,
} from "react-icons/si";

import {
  MdEmail,
  MdChat,
  MdArrowOutward,
} from "react-icons/md";

import "./App.css";

import profile from "./assets/profile.jpeg";

function App() {
  /* =========================
     CHATBOT STATE
  ========================= */

  const [chatOpen, setChatOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text:
        "Hi 👋 I'm Maheswaran's AI assistant. Ask me about his skills, projects, education or certifications.",
    },
  ]);

  /* =========================
     CONTACT STATE
  ========================= */

  const [contactStatus, setContactStatus] = useState("");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* =========================
     SKILLS
  ========================= */

  const skills = [
    ["Python", FaPython],
    ["React", FaReact],
    ["JavaScript", SiJavascript],
    ["TypeScript", SiTypescript],
    ["Node.js", FaNodeJs],
    ["HTML", SiHtml5],
    ["CSS", FaCss3Alt],
    ["Bootstrap", SiBootstrap],
    ["Django", SiDjango],
    ["Flask", SiFlask],
    ["MySQL", SiMysql],
    ["MongoDB", SiMongodb],
    ["AWS", FaAws],
    ["Vite", SiVite],
  ];

  /* =========================
     PROJECTS
  ========================= */

  const projects = [
    {
      number: "01",
      title: "Real-Time Object Detection",
      text:
        "Real-time object detection using YOLOv4, Python and OpenCV.",
      link:
        "https://github.com/maheswaranmaheswaran/Real-Time-object-Detection-Using-YOLOv4",
    },

    {
      number: "02",
      title: "Notes Sharing Web Application",
      text:
        "A Django web application for sharing and managing notes.",
      link:
        "https://github.com/maheswaranmaheswaran/Notes-Sharing-Web-Application-using-Django-Framework-Maheswaran_B-5015-PCET",
    },

    {
      number: "03",
      title: "Data Science Project",
      text:
        "A data science project involving data analysis and machine learning.",
      link:
        "https://github.com/maheswaranmaheswaran/Data-science-project-",
    },
  ];

  /* =========================
     CERTIFICATIONS
  ========================= */

  const certifications = [
    "Cisco Networking Essentials",
    "EY Full Stack Web Technology using Django",
    "IIE Full Stack Development using Python",
    "IBM Machine Learning with Python",
    "IBM Data Science",
    "Microsoft Advanced Level",
    "NSS",
  ];

  /* =========================
     SMOOTH SCROLL
  ========================= */

  const goTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  /* =========================
     CHATBOT
  ========================= */

  const sendMessage = async () => {
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

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            "⚠️ Backend connection failed. Start Flask on port 5000.",
        },
      ]);
    }
  };

  /* =========================
     CONTACT INPUT
  ========================= */

  const handleContactChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     CONTACT FORM
  ========================= */

  const submitContact = async (e) => {
    e.preventDefault();

    setContactStatus("Sending...");

    try {
      const response = await fetch(
  "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(contact),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setContactStatus(data.message);

      setContact({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setContactStatus(
        "⚠️ Unable to send message. Please try again."
      );
    }
  };

  return (
    <div className="space-portfolio">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="space-bg">
        <div className="stars-layer stars-one" />
        <div className="stars-layer stars-two" />

        <div className="nebula nebula-one" />
        <div className="nebula nebula-two" />
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}

      <header className="space-nav">

        <div className="brand">
          <span>MB</span>

          <small>
            PORTFOLIO
          </small>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#certifications">
            Certifications
          </a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="nav-contact"
          onClick={() => goTo("contact")}
        >
          Let's Talk
        </button>

      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main>

        {/* =========================
            HERO
        ========================= */}

        <section
          className="hero-space"
          id="home"
        >

          <div className="hero-copy">

            <motion.div
              className="eyebrow"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <span />
              AVAILABLE FOR OPPORTUNITIES
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              MAHESWARAN

              <strong>
                B
              </strong>
            </motion.h1>

            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              FULL STACK

              <span>
                {" "}PYTHON DEVELOPER
              </span>
            </motion.h2>

            <p>
              I build modern digital experiences by combining
              Python backend development with interactive,
              responsive frontend technologies.
            </p>

            <div className="hero-actions">

  <button
    className="primary-btn"
    onClick={() => goTo("projects")}
  >
    Explore My Work
    <MdArrowOutward />
  </button>

  <button
    className="outline-btn"
    onClick={() => goTo("contact")}
  >
    Contact Me
  </button>

  <a
    href="/public/Maheswaran_Resume.pdf"
    download
    className="resume-btn"
  >
    📄 Resume
  </a>

</div>

            {/* HERO SOCIAL LINKS */}

            <div className="hero-socials">

              <a
                href="https://github.com/maheswaranmaheswaran"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/i-maheswaran"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/917812835200"
                target="_blank"
                rel="noreferrer"
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

              <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=maheswaran2004.b@gmail.com"
  target="_blank"
  rel="noreferrer"
  aria-label="Email Maheswaran"
>
  <MdEmail />
</a>

            </div>

          </div>

          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="planet">

              <div className="planet-light" />
              <div className="planet-shadow" />

              <div className="planet-crater crater-one" />
              <div className="planet-crater crater-two" />
              <div className="planet-crater crater-three" />

            </div>

            <div className="floating-dot dot-one" />
            <div className="floating-dot dot-two" />
            <div className="floating-dot dot-three" />

            <div className="code-card">

              <span>
                &lt;/&gt;
              </span>

              <p>
                BUILDING
                <br />
                DIGITAL WORLDS
              </p>

            </div>

            <div className="profile-ring">

              <img
                src={profile}
                alt="Maheswaran B"
              />

            </div>

          </div>

        </section>

        {/* =========================
            ABOUT
        ========================= */}

        <section
          className="space-section"
          id="about"
        >

          <div className="section-label">
            01 / ABOUT
          </div>

          <div className="section-heading">

            <span>
              ABOUT
            </span>

            <h2>
              A DEVELOPER
              <br />
              <em>
                BEYOND EARTH.
              </em>
            </h2>

          </div>

          <div className="about-grid">

            <div className="about-large">

              <p>
  I'm Maheswaran B, a Full Stack Python Developer
  passionate about building modern and responsive web
  applications.
</p>

<p>
  I combine React and JavaScript frontend development
  with Python-based backend technologies like Django
  and Flask. I enjoy creating clean, interactive, and
  user-friendly digital experiences.
</p>

            </div>

            <div className="info-card">

              <span>01</span>

              <h3>
                FRONTEND
              </h3>

              <p>
                React, JavaScript, TypeScript, HTML, CSS,
                Bootstrap and Vite.
              </p>

            </div>

            <div className="info-card">

              <span>02</span>

              <h3>
                BACKEND
              </h3>

              <p>
                Python, Django, Flask, Node.js and databases.
              </p>

            </div>

          </div>

        </section>

        {/* =========================
            SKILLS
        ========================= */}

        <section
          className="space-section"
          id="skills"
        >

          <div className="section-label">
            02 / TECHNOLOGY
          </div>

          <div className="section-heading">

            <span>
              SKILLS
            </span>

            <h2>
              MY TECH
              <br />
              <em>
                UNIVERSE.
              </em>
            </h2>

          </div>

          <div className="skill-grid">

            {skills.map(
              ([name, Icon], index) => (

                <motion.div
                  className="skill-item"
                  key={name}

                  initial={{
                    opacity: 0,
                    y: 25,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: index * 0.04,
                  }}
                >

                  <div className="skill-icon">
                    <Icon />
                  </div>

                  <span>
                    {name}
                  </span>

                </motion.div>

              )
            )}

          </div>

        </section>

        {/* =========================
            PROJECTS
        ========================= */}

        <section
          className="space-section"
          id="projects"
        >

          <div className="section-label">
            03 / PROJECTS
          </div>

          <div className="section-heading">

            <span>
              PROJECTS
            </span>

            <h2>
              MISSIONS
              <br />
              <em>
                COMPLETED.
              </em>
            </h2>

          </div>

          <div className="project-list">

            {projects.map(
              (project) => (

                <motion.article
                  className="project-card"
                  key={project.number}

                  whileHover={{
                    y: -8,
                  }}
                >

                  <div className="project-number">
                    {project.number}
                  </div>

                  <div className="project-content">

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.text}
                    </p>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      VIEW PROJECT
                      <MdArrowOutward />
                    </a>

                  </div>

                  <div className="project-glow" />

                </motion.article>

              )
            )}

          </div>

        </section>

        {/* =========================
            EDUCATION
        ========================= */}

        <section
          className="space-section"
          id="education"
        >

          <div className="section-label">
            04 / JOURNEY
          </div>

          <div className="section-heading">

            <span>
              EDUCATION
            </span>

            <h2>
              MY
              <br />
              <em>
                JOURNEY.
              </em>
            </h2>

          </div>

          <div className="timeline">

            <div className="timeline-item">

              <span>
                2021 — 2025
              </span>

              <div>

                <h3>
                  B.Tech Information Technology
                </h3>

                <p>
                  Park College of Engineering and Technology,
                  Coimbatore.
                </p>

              </div>

            </div>

            <div className="timeline-item">

              <span>
                TRAINING 
              </span>

              <div>

                <h3>
                  Full Stack Python Developer
                </h3>

                <p>
                  Full Stack Python Developer training at IIE.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            CERTIFICATIONS
        ========================= */}

        <section
          className="space-section"
          id="certifications"
        >

          <div className="section-label">
            05 / ACHIEVEMENTS
          </div>

          <div className="section-heading">

            <span>
              CERTIFICATIONS
            </span>

            <h2>
              CREDENTIALS
              <br />
              <em>
                ACQUIRED.
              </em>
            </h2>

          </div>

          <div className="cert-grid">

            {certifications.map(
              (certificate, index) => (

                <motion.div
                  className="cert-card"
                  key={certificate}

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: index * 0.08,
                  }}
                >

                  <div className="cert-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="cert-content">

                    <h3>
                      {certificate}
                    </h3>

                    <div className="cert-line" />

                  </div>

                </motion.div>

              )
            )}

          </div>

        </section>

        {/* =========================
            CONTACT
        ========================= */}

        <section
          className="contact-space"
          id="contact"
        >

          <div className="section-label">
            06 / CONTACT
          </div>

          <div className="contact-heading">

            <span>
              READY TO
            </span>

            <h2>
              START A
              <br />
              <em>
                MISSION?
              </em>
            </h2>

            <p>
              Have a project, opportunity or just want to
              connect? Send me a transmission.
            </p>

          </div>

          <form
            className="space-form"
            onSubmit={submitContact}
          >

            <div className="form-row">

              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                value={contact.name}
                onChange={handleContactChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                value={contact.email}
                onChange={handleContactChange}
                required
              />

            </div>

            <textarea
              name="message"
              placeholder="YOUR MESSAGE"
              rows="6"
              value={contact.message}
              onChange={handleContactChange}
              required
            />

            <button
              className="send-btn"
              type="submit"
            >
              SEND TRANSMISSION
              <MdArrowOutward />
            </button>

            {contactStatus && (
              <p className="contact-status">
                {contactStatus}
              </p>
            )}

          </form>

        </section>

      </main>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="space-footer">

        <div className="footer-brand">

          <strong>
            MB
          </strong>

          <span>
            FULL STACK PYTHON DEVELOPER
          </span>

        </div>

        <div className="footer-links">

          

          {/* GITHUB */}

          <a
            href="https://github.com/maheswaranmaheswaran"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          {/* LINKEDIN */}

          <a
            href="https://linkedin.com/in/i-maheswaran"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          {/* WHATSAPP */}

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

          {/* EMAIL */}

         <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=maheswaran2004.b@gmail.com"
  target="_blank"
  rel="noreferrer"
  aria-label="Email Maheswaran"
>
  <MdEmail />
</a>

        </div>

        <p>
          © {new Date().getFullYear()} MAHESWARAN B
        </p>

      </footer>

      {/* =========================
          CHATBOT
      ========================= */}

      <div className="space-chat">

        {chatOpen && (

          <div className="space-chat-box">

            <div className="chat-top">

              <div>
                <span className="online-dot" />
                MAHESWARAN AI
              </div>

              <button
                onClick={() => setChatOpen(false)}
              >
                ×
              </button>

            </div>

            <div className="chat-messages">

              {messages.map(
                (msg, index) => (

                  <div
                    className={
                      msg.type === "user"
                        ? "message user"
                        : "message bot"
                    }
                    key={index}
                  >
                    {msg.text}
                  </div>

                )
              )}

            </div>

            <div className="chat-bottom">

              <input
                value={message}
                placeholder="Ask something..."

                onChange={(e) =>
                  setMessage(e.target.value)
                }

                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    sendMessage();
                  }

                }}
              />

              <button
                onClick={sendMessage}
              >
                →
              </button>

            </div>

          </div>

        )}

        <button
          className="chat-launcher"
          onClick={() =>
            setChatOpen(!chatOpen)
          }
        >
          {chatOpen
            ? "×"
            : <MdChat />
          }
        </button>

      </div>

    </div>
  );
}

export default App;
