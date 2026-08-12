import "./App.css";
import profile from "./assets/profile.jpeg";

import { useState } from "react";

import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

import { motion } from "framer-motion";


function App() {

  // =====================================================
  // CHATBOT
  // =====================================================

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text:
        "Hi 👋 Welcome to Maheswaran's portfolio! Ask me about my skills, projects, education, experience or resume.",
    },
  ]);

  const [message, setMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);


  // =====================================================
  // CONTACT
  // =====================================================

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactStatus, setContactStatus] = useState("");


  // =====================================================
  // CHAT MESSAGE
  // =====================================================

  const sendMessage = async () => {

    const text = message.trim();

    if (!text || chatLoading) {
      return;
    }


    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: text,
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


      if (!response.ok) {
        throw new Error(
          `Chat API failed: ${response.status}`
        );
      }


      const data = await response.json();


      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            data.reply ||
            "Sorry, I could not understand that.",
        },
      ]);

    } catch (error) {

      console.error("CHAT ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            "⚠️ Backend connection failed. Please try again.",
        },
      ]);

    } finally {

      setChatLoading(false);

    }
  };


  // =====================================================
  // CHAT ENTER
  // =====================================================

  const handleChatKeyDown = (event) => {

    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }

  };


  // =====================================================
  // CONTACT INPUT
  // =====================================================

  const handleContactChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =====================================================
  // CONTACT SUBMIT
  // =====================================================

  const submitContact = async (event) => {

    event.preventDefault();

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
        throw new Error(
          data.message || "Contact API failed"
        );
      }


      setContactStatus(
        data.message ||
        "Thank you! Your message has been received. 🚀"
      );


      setContact({
        name: "",
        email: "",
        message: "",
      });


    } catch (error) {

      console.error(
        "CONTACT ERROR:",
        error
      );


      setContactStatus(
        "⚠️ Unable to send message. Please try again."
      );

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="portfolio">

      {/* =================================================
          GALAXY BACKGROUND
      ================================================= */}

      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>


      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="navbar">

        <div className="logo">
          Maheswaran<span>.</span>
        </div>


        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#skills">
            Skills
          </a>

          <a href="#projects">
            Projects
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>

      </nav>


      {/* =================================================
          HERO
      ================================================= */}

      <section
        id="home"
        className="hero"
      >

        <motion.div
          className="hero-content"
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

          <p className="hero-subtitle">
            Hello, I'm
          </p>


          <h1>
            Maheswaran B
          </h1>


          <h2>
            Full Stack Python Developer
          </h2>


          <p className="hero-description">
            I build modern, responsive and
            user-friendly web applications
            using Python, React, JavaScript
            and modern web technologies.
          </p>


          <div className="hero-buttons">

            <a
              href="#projects"
              className="btn-primary"
            >
              View Projects
            </a>


            <a
              href="#contact"
              className="btn-secondary"
            >
              Contact Me
            </a>

          </div>


          <div className="social-icons">

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


            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>


            <a href="mailto:maheswaran2004.b@gmail.com">
              <MdEmail />
            </a>

          </div>

        </motion.div>


        <motion.div
          className="hero-image"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <img
            className="profile-img"
            src={profile}
            alt="Maheswaran B"
          />

        </motion.div>

      </section>


      {/* =================================================
          ABOUT
      ================================================= */}

      <section
        id="about"
        className="section"
      >

        <h2 className="section-title">
          About Me
        </h2>


        <div className="card">

          <p>
            I'm Maheswaran B, a Full Stack
            Python Developer passionate about
            building modern, responsive and
            interactive web applications.
          </p>


          <p>
            I enjoy working with both frontend
            and backend technologies and
            continuously improving my technical
            skills.
          </p>

        </div>

      </section>


      {/* =================================================
          SKILLS
      ================================================= */}

      <section
        id="skills"
        className="section"
      >

        <h2 className="section-title">
          Skills
        </h2>


        <div className="cards">

          <div className="card">
            Python
          </div>

          <div className="card">
            React
          </div>

          <div className="card">
            JavaScript
          </div>

          <div className="card">
            TypeScript
          </div>

          <div className="card">
            HTML
          </div>

          <div className="card">
            CSS
          </div>

          <div className="card">
            Bootstrap
          </div>

          <div className="card">
            MySQL
          </div>

          <div className="card">
            MongoDB
          </div>

          <div className="card">
            AWS
          </div>

          <div className="card">
            GitHub
          </div>

          <div className="card">
            Full Stack Web Development
          </div>

        </div>

      </section>


      {/* =================================================
          PROJECTS
      ================================================= */}

      <section
        id="projects"
        className="section"
      >

        <h2 className="section-title">
          Projects
        </h2>


        <div className="cards">

          <div className="card">

            <h3>
              Real-Time Object Detection
            </h3>

            <p>
              Real-Time Object Detection
              using YOLOv4 and OpenCV.
            </p>

          </div>


          <div className="card">

            <h3>
              Notes Sharing Web Application
            </h3>

            <p>
              A web application for
              sharing and managing notes.
            </p>

          </div>


          <div className="card">

            <h3>
              Data Science Project
            </h3>

            <p>
              A Python based data science
              and analysis project.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          CHATBOT
      ================================================= */}

      <section className="section">

        <h2 className="section-title">
          AI Portfolio Assistant
        </h2>


        <div className="chatbox">

          <div className="chat-messages">

            {messages.map(
              (item, index) => (

                <div
                  key={index}
                  className={
                    item.type === "user"
                      ? "chat-message user"
                      : "chat-message bot"
                  }
                >
                  {item.text}
                </div>

              )
            )}


            {chatLoading && (

              <div className="chat-message bot">
                Typing...
              </div>

            )}

          </div>


          <div className="chat-input">

            <input
              type="text"
              value={message}
              placeholder="Ask about my skills, projects..."
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={handleChatKeyDown}
              disabled={chatLoading}
            />


            <button
              type="button"
              onClick={sendMessage}
              disabled={chatLoading}
            >
              {chatLoading ? "..." : "Send"}
            </button>

          </div>

        </div>

      </section>


      {/* =================================================
          CONTACT
      ================================================= */}

      <section
        id="contact"
        className="section"
      >

        <h2 className="section-title">
          Start a Mission
        </h2>


        <form
          className="contact-form"
          onSubmit={submitContact}
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contact.name}
            onChange={handleContactChange}
            required
          />


          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contact.email}
            onChange={handleContactChange}
            required
          />


          <textarea
            name="message"
            placeholder="Your Message"
            value={contact.message}
            onChange={handleContactChange}
            rows="6"
            required
          />


          <button type="submit">
            Send Message
          </button>


          {contactStatus && (

            <p className="contact-status">
              {contactStatus}
            </p>

          )}

        </form>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <p>
          © {new Date().getFullYear()}
          {" "}
          Maheswaran B. All Rights Reserved.
        </p>

      </footer>

    </div>

  );
}


export default App;