from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import logging

app = Flask(__name__)

# Load environment variables safely
load_dotenv()

# Email configuration
mail = None
if all(k in os.environ for k in ['GMAIL_USER', 'GMAIL_APP_PASSWORD']):
    app.config.update(
        MAIL_SERVER='smtp.gmail.com',
        MAIL_PORT=587,
        MAIL_USE_TLS=True,
        MAIL_USERNAME=os.getenv('GMAIL_USER'),
        MAIL_PASSWORD=os.getenv('GMAIL_APP_PASSWORD'),
        MAIL_DEFAULT_SENDER=os.getenv('GMAIL_USER')
    )
    mail = Mail(app)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    if mail:
        try:
            msg = Message(
                subject=f"New message from {request.form['name']}",
                recipients=['cyndoli34@gmail.com'], 
                body=f"""Name: {request.form['name']}
Email: {request.form['email']}
Message: {request.form['message']}"""
            )
            mail.send(msg)
            logging.info("✅ Email sent successfully!")
        except Exception as e:
            logging.error(f"❌ Email sending failed: {e}")
            return "Email sending failed", 500
    return redirect(url_for('home'))

# Ensure compatibility with Vercel
if __name__ == "__main__":
    app.run()
