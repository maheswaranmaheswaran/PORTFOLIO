from flask import Flask, request, jsonify
from flask_cors import CORS
import os

try:
    import resend
except ImportError:
    resend = None


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

if resend and RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


# =========================================================
# HOME
# =========================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Maheswaran Portfolio Backend is running 🚀",
        "status": "online"
    })


# =========================================================
# API STATUS
# =========================================================

@app.route("/api", methods=["GET"])
def api_status():
    return jsonify({
        "status": "success",
        "developer": "Maheswaran B",
        "role": "Full Stack Python Developer",
        "backend": "online"
    })


# =========================================================
# PORTFOLIO AI CHATBOT
# =========================================================

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(silent=True) or {}

        message = str(data.get("message", "")).strip().lower()

        if not message:
            return jsonify({
                "reply": "Please type or say something so I can help you."
            }), 400


        # -------------------------------------------------
        # GREETING
        # -------------------------------------------------

        if any(word in message for word in [
            "hello",
            "hi",
            "hey",
            "hai"
        ]):
            reply = (
                "Hello! I'm Maheswaran's portfolio AI assistant. "
                "You can ask me about his skills, projects, education, "
                "experience, certifications or contact details."
            )


        # -------------------------------------------------
        # ABOUT
        # -------------------------------------------------

        elif any(word in message for word in [
            "about",
            "who is",
            "who are",
            "mahesh",
            "maheswaran"
        ]):
            reply = (
                "Maheswaran B is a Full Stack Python Developer "
                "from Chennai, Tamil Nadu. He builds modern, responsive "
                "and interactive web applications using Python, Django, "
                "React, JavaScript, databases and cloud technologies."
            )


        # -------------------------------------------------
        # SKILLS
        # -------------------------------------------------

        elif any(word in message for word in [
            "skill",
            "skills",
            "technology",
            "technologies",
            "tech stack",
            "stack"
        ]):
            reply = (
                "Maheswaran's technical skills include Python, Java, "
                "JavaScript, TypeScript, React.js, Django, "
                "Django REST Framework, HTML5, CSS3, Bootstrap, "
                "MySQL, SQLite, MongoDB, Git, GitHub, AWS, "
                "REST APIs, OpenCV and TensorFlow."
            )


        # -------------------------------------------------
        # PYTHON
        # -------------------------------------------------

        elif "python" in message:
            reply = (
                "Yes. Python is one of Maheswaran's main technologies. "
                "He uses Python for backend development, Django projects, "
                "REST APIs and computer vision applications."
            )


        # -------------------------------------------------
        # REACT
        # -------------------------------------------------

        elif "react" in message:
            reply = (
                "Maheswaran uses React.js to build responsive and "
                "interactive frontend applications. This portfolio itself "
                "is built using React and Vite."
            )


        # -------------------------------------------------
        # DJANGO
        # -------------------------------------------------

        elif "django" in message:
            reply = (
                "Maheswaran has experience with Django and "
                "Django REST Framework for backend development, "
                "database-driven applications and REST APIs."
            )


        # -------------------------------------------------
        # PROJECTS
        # -------------------------------------------------

        elif any(word in message for word in [
            "project",
            "projects",
            "work",
            "portfolio project"
        ]):
            reply = (
                "Maheswaran has worked on projects including "
                "Real-Time Object Detection using YOLOv4, "
                "Music Web Application using Python and Django, "
                "Anime Streaming Website, Workforce Administration System, "
                "and his modern React portfolio."
            )


        # -------------------------------------------------
        # YOLO
        # -------------------------------------------------

        elif any(word in message for word in [
            "yolo",
            "object detection",
            "opencv"
        ]):
            reply = (
                "Maheswaran developed a Real-Time Object Detection "
                "project using YOLOv4, Python and OpenCV. "
                "The system detects objects from real-time video input "
                "using computer vision."
            )


        # -------------------------------------------------
        # EDUCATION
        # -------------------------------------------------

        elif any(word in message for word in [
            "education",
            "college",
            "degree",
            "study",
            "university"
        ]):
            reply = (
                "Maheswaran completed his B.Tech in Information Technology "
                "from Park College of Engineering and Technology, Coimbatore, "
                "from 2021 to 2025."
            )


        # -------------------------------------------------
        # EXPERIENCE
        # -------------------------------------------------

        elif any(word in message for word in [
            "experience",
            "internship",
            "intern",
            "company"
        ]):
            reply = (
                "Maheswaran completed a Big Data Full Stack Development "
                "internship at Marcello Tech, Trichy. "
                "He worked with Python, Django, REST APIs "
                "and full-stack web development concepts."
            )


        # -------------------------------------------------
        # CERTIFICATIONS
        # -------------------------------------------------

        elif any(word in message for word in [
            "certificate",
            "certificates",
            "certification",
            "certifications"
        ]):
            reply = (
                "Maheswaran's certifications include Cisco Networking Essentials, "
                "EY Web Technology Full Stack Using Django, "
                "IIE Full Stack Development using Python, "
                "Microsoft Advanced Level Certification, "
                "IBM Machine Learning with Python, IBM Data Science "
                "and NSS National Service Scheme certification."
            )


        # -------------------------------------------------
        # CONTACT
        # -------------------------------------------------

        elif any(word in message for word in [
            "contact",
            "email",
            "gmail",
            "phone",
            "whatsapp",
            "hire"
        ]):
            reply = (
                "You can contact Maheswaran at "
                "maheswaran2004.b@gmail.com. "
                "You can also use the Contact section of this portfolio "
                "to send him a message."
            )


        # -------------------------------------------------
        # LOCATION
        # -------------------------------------------------

        elif any(word in message for word in [
            "location",
            "where",
            "city"
        ]):
            reply = (
                "Maheswaran is based in Chennai, Tamil Nadu, India."
            )


        # -------------------------------------------------
        # RESUME
        # -------------------------------------------------

        elif any(word in message for word in [
            "resume",
            "cv"
        ]):
            reply = (
                "Maheswaran's resume is available directly from this portfolio. "
                "Use the Resume button or Command Center to view it."
            )


        # -------------------------------------------------
        # JOB / ROLE
        # -------------------------------------------------

        elif any(word in message for word in [
            "role",
            "job",
            "position"
        ]):
            reply = (
                "Maheswaran is focused on Full Stack Python Developer, "
                "Python Developer, Web Developer and Full Stack Developer roles."
            )


        # -------------------------------------------------
        # DEFAULT RESPONSE
        # -------------------------------------------------

        else:
            reply = (
                "I can help you learn more about Maheswaran. "
                "Try asking about his skills, projects, Python experience, "
                "education, internship, certifications, resume or contact details."
            )


        return jsonify({
            "success": True,
            "reply": reply
        })


    except Exception as error:
        print("Chat error:", error)

        return jsonify({
            "success": False,
            "reply": "Sorry, the portfolio assistant encountered an error."
        }), 500


# =========================================================
# CONTACT FORM
# =========================================================

@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json(silent=True) or {}

        name = str(data.get("name", "")).strip()
        email = str(data.get("email", "")).strip()
        message = str(data.get("message", "")).strip()


        if not name or not email or not message:
            return jsonify({
                "success": False,
                "message": "Please fill all fields."
            }), 400


        # -------------------------------------------------
        # SEND EMAIL USING RESEND
        # -------------------------------------------------

        if resend and RESEND_API_KEY:

            params = {
                "from": "Portfolio Contact <onboarding@resend.dev>",
                "to": [RESEND_TO_EMAIL],
                "subject": f"Portfolio Message from {name}",
                "reply_to": email,
                "html": f"""
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: auto;
                    "
                >
                    <h2>New Portfolio Message</h2>

                    <p>
                        <strong>Name:</strong>
                        {name}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        {email}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>
                        {message}
                    </p>
                </div>
                """
            }

            resend.Emails.send(params)

            return jsonify({
                "success": True,
                "message": "✅ Message sent successfully!"
            })


        # -------------------------------------------------
        # NO RESEND KEY
        # -------------------------------------------------

        print("\n====================================")
        print("PORTFOLIO CONTACT MESSAGE")
        print("====================================")
        print("Name:", name)
        print("Email:", email)
        print("Message:", message)
        print("====================================\n")

        return jsonify({
            "success": True,
            "message": (
                "✅ Message received successfully. "
                "Email service is currently running in development mode."
            )
        })


    except Exception as error:
        print("Contact error:", error)

        return jsonify({
            "success": False,
            "message": "Unable to send message. Please try again."
        }), 500


# =========================================================
# LOCAL DEVELOPMENT
# =========================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )