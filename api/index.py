from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# =========================
# API
# =========================

@app.route("/api")
def api():
    return {
        "status": "success",
        "developer": "Maheswaran B",
        "role": "Full Stack Python Developer"
    }


# =========================
# CHATBOT
# =========================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json() or {}
    message = data.get("message", "").lower().strip()

    # Skills
    if "skill" in message or "technology" in message:
        reply = (
            "Maheswaran's technical skills include Python, React, "
            "JavaScript, HTML, CSS, Bootstrap, MySQL, MongoDB, "
            "AWS, GitHub and Full Stack Web Development."
        )

    # Projects
    elif "project" in message:
        reply = (
            "Maheswaran has worked on projects including "
            "Real-Time Object Detection using YOLOv4, "
            "Notes Sharing Web Application and Data Science Project."
        )

    # Education
    elif (
        "education" in message
        or "degree" in message
        or "college" in message
    ):
        reply = (
            "Maheswaran completed a B.Tech in Information Technology "
            "from Park College of Engineering and Technology, Coimbatore."
        )

    # Course
    elif "course" in message or "training" in message:
        reply = (
            "Maheswaran completed a Full Stack Python Developer "
            "course at IIE."
        )

    # About
    elif "about" in message or "who are you" in message:
        reply = (
            "Maheswaran B is a Full Stack Python Developer who enjoys "
            "building modern, responsive and user-friendly web applications."
        )

    # Python
    elif "python" in message:
        reply = (
            "Maheswaran has Full Stack Python development skills "
            "and experience working with Python-based web applications."
        )

    # React
    elif "react" in message:
        reply = (
            "Maheswaran works with React for building responsive "
            "and interactive frontend applications."
        )

    # YOLO
    elif "yolo" in message or "object detection" in message:
        reply = (
            "The main B.Tech project was Real-Time Object Detection "
            "using YOLOv4 and OpenCV."
        )

    # Experience
    elif "experience" in message:
        reply = (
            "Maheswaran is focused on Full Stack Python development, "
            "frontend development and backend development."
        )

    # Contact
    elif "contact" in message or "email" in message:
        reply = (
            "You can use the Contact section of this portfolio "
            "to connect with Maheswaran."
        )

    # Resume
    elif "resume" in message or "cv" in message:
        reply = (
            "You can download Maheswaran's resume from the "
            "Resume button in the portfolio."
        )

    # Greeting
    elif (
        "hello" in message
        or "hi" in message
        or "hey" in message
    ):
        reply = (
            "Hi 👋 Welcome to Maheswaran's portfolio! "
            "You can ask me about his skills, education, "
            "projects, experience or resume."
        )

    # Default
    else:
        reply = (
            "I can tell you about Maheswaran's skills, education, "
            "projects, experience or resume."
        )

    return {
        "reply": reply
    }


# =========================
# CONTACT FORM
# =========================

@app.route("/contact", methods=["POST"])
def contact():

    data = request.get_json() or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    print("===== NEW CONTACT MESSAGE =====")
    print("Name:", name)
    print("Email:", email)
    print("Message:", message)
    print("===============================")

    return {
        "status": "success",
        "message": "Thank you! Your message has been received. 🚀"
    }