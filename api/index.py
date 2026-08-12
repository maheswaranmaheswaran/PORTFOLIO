import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import resend


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)

CORS(app)


# =========================================================
# RESEND CONFIGURATION
# =========================================================

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
RESEND_TO_EMAIL = os.environ.get(
    "RESEND_TO_EMAIL",
    "maheswaran2004.b@gmail.com"
)

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


# =========================================================
# HOME
# =========================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome to Maheswaran's Portfolio 🚀",
        "status": "success"
    })


# =========================================================
# API
# =========================================================

@app.route("/api", methods=["GET"])
def api():
    return jsonify({
        "status": "success",
        "developer": "Maheswaran B",
        "role": "Full Stack Python Developer"
    })


# =========================================================
# CHATBOT
# =========================================================

@app.route("/api/chat", methods=["POST"])
def chat():

    data = request.get_json(silent=True) or {}

    message = str(
        data.get("message", "")
    ).lower().strip()

    if not message:
        return jsonify({
            "reply": "Please type a message."
        }), 400


    # -----------------------------------------------------
    # SKILLS
    # -----------------------------------------------------

    if (
        "skill" in message
        or "skills" in message
        or "technology" in message
        or "technologies" in message
    ):
        reply = (
            "Maheswaran's technical skills include "
            "Python, React, JavaScript, TypeScript, HTML, "
            "CSS, Bootstrap, MySQL, MongoDB, AWS, GitHub "
            "and Full Stack Web Development."
        )


    # -----------------------------------------------------
    # PROJECTS
    # -----------------------------------------------------

    elif (
        "project" in message
        or "projects" in message
    ):
        reply = (
            "Maheswaran has worked on projects including "
            "Real-Time Object Detection using YOLOv4, "
            "Notes Sharing Web Application and "
            "Data Science Project."
        )


    # -----------------------------------------------------
    # EDUCATION
    # -----------------------------------------------------

    elif (
        "education" in message
        or "degree" in message
        or "college" in message
        or "study" in message
    ):
        reply = (
            "Maheswaran completed a B.Tech in Information "
            "Technology from Park College of Engineering "
            "and Technology, Coimbatore."
        )


    # -----------------------------------------------------
    # COURSE
    # -----------------------------------------------------

    elif (
        "course" in message
        or "training" in message
    ):
        reply = (
            "Maheswaran completed a Full Stack Python "
            "Developer course at IIE."
        )


    # -----------------------------------------------------
    # ABOUT
    # -----------------------------------------------------

    elif (
        "about" in message
        or "who are you" in message
        or "about you" in message
    ):
        reply = (
            "Maheswaran B is a Full Stack Python Developer "
            "who enjoys building modern, responsive and "
            "user-friendly web applications."
        )


    # -----------------------------------------------------
    # PYTHON
    # -----------------------------------------------------

    elif "python" in message:
        reply = (
            "Maheswaran has Full Stack Python development "
            "skills and experience working with Python-based "
            "web applications."
        )


    # -----------------------------------------------------
    # REACT
    # -----------------------------------------------------

    elif "react" in message:
        reply = (
            "Maheswaran works with React for building "
            "responsive and interactive frontend applications."
        )


    # -----------------------------------------------------
    # YOLO
    # -----------------------------------------------------

    elif (
        "yolo" in message
        or "object detection" in message
    ):
        reply = (
            "The main B.Tech project was Real-Time Object "
            "Detection using YOLOv4 and OpenCV."
        )


    # -----------------------------------------------------
    # EXPERIENCE
    # -----------------------------------------------------

    elif (
        "experience" in message
        or "work" in message
    ):
        reply = (
            "Maheswaran is focused on Full Stack Python "
            "development, frontend development and backend "
            "development."
        )


    # -----------------------------------------------------
    # CONTACT
    # -----------------------------------------------------

    elif (
        "contact" in message
        or "email" in message
    ):
        reply = (
            "You can use the Contact section of this "
            "portfolio to connect with Maheswaran."
        )


    # -----------------------------------------------------
    # RESUME
    # -----------------------------------------------------

    elif (
        "resume" in message
        or "cv" in message
    ):
        reply = (
            "You can download Maheswaran's resume from "
            "the Resume button in the portfolio."
        )


    # -----------------------------------------------------
    # GREETING
    # -----------------------------------------------------

    elif (
        "hello" in message
        or message == "hi"
        or "hey" in message
        or "good morning" in message
        or "good evening" in message
    ):
        reply = (
            "Hi 👋 Welcome to Maheswaran's portfolio! "
            "You can ask me about his skills, education, "
            "projects, experience or resume."
        )


    # -----------------------------------------------------
    # DEFAULT
    # -----------------------------------------------------

    else:
        reply = (
            "I can tell you about Maheswaran's skills, "
            "education, projects, Full Stack Python course, "
            "experience or resume."
        )


    return jsonify({
        "reply": reply
    })


# =========================================================
# CONTACT FORM + RESEND EMAIL
# =========================================================

@app.route("/api/contact", methods=["POST"])
def contact():

    data = request.get_json(silent=True) or {}

    name = str(
        data.get("name", "")
    ).strip()

    email = str(
        data.get("email", "")
    ).strip()

    message = str(
        data.get("message", "")
    ).strip()


    # -----------------------------------------------------
    # VALIDATION
    # -----------------------------------------------------

    if not name:
        return jsonify({
            "status": "error",
            "message": "Please enter your name."
        }), 400

    if not email:
        return jsonify({
            "status": "error",
            "message": "Please enter your email."
        }), 400

    if not message:
        return jsonify({
            "status": "error",
            "message": "Please enter your message."
        }), 400


    # -----------------------------------------------------
    # LOCAL LOG
    # -----------------------------------------------------

    print("\n===== NEW CONTACT MESSAGE =====")
    print("Name:", name)
    print("Email:", email)
    print("Message:", message)
    print("===============================\n")


    # -----------------------------------------------------
    # CHECK RESEND KEY
    # -----------------------------------------------------

    if not RESEND_API_KEY:
        print("WARNING: RESEND_API_KEY is not configured.")

        return jsonify({
            "status": "success",
            "message": (
                "Thank you! Your message has been received. 🚀"
            )
        })


    # -----------------------------------------------------
    # SEND EMAIL USING RESEND
    # -----------------------------------------------------

    try:

        params = {
            "from": "onboarding@resend.dev",
            "to": [RESEND_TO_EMAIL],
            "subject": f"Portfolio Contact - {name}",
            "reply_to": email,
            "html": f"""
                <h2>New Portfolio Contact Message</h2>

                <p>
                    <strong>Name:</strong>
                    {name}
                </p>

                <p>
                    <strong>Email:</strong>
                    {email}
                </p>

                <hr>

                <p>
                    <strong>Message:</strong>
                </p>

                <p>
                    {message}
                </p>

                <hr>

                <p>
                    Sent from Maheswaran's Portfolio.
                </p>
            """
        }

        result = resend.Emails.send(params)

        print("Resend response:", result)


        return jsonify({
            "status": "success",
            "message": (
                "Thank you! Your message has been received "
                "and sent successfully. 🚀"
            )
        })


    except Exception as error:

        print("RESEND ERROR:", error)

        return jsonify({
            "status": "error",
            "message": (
                "Your message was received, but the email "
                "could not be sent right now."
            )
        }), 500


# =========================================================
# LOCAL DEVELOPMENT
# =========================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )