
from flask import Flask, jsonify
from flask_cors import CORS
import os

# ----------------------------------
# Route Imports
# ----------------------------------

from routes.chat_routes import chat_bp
from routes.promotion_routes import promotion_bp
from routes.comparison_routes import comparison_bp
from routes.analytics_routes import analytics_bp
from routes.audit_routes import audit_bp
from routes.resume_routes import resume_bp
from routes.report_routes import report_bp
from routes.candidate_ranking_routes import candidate_ranking_bp
from routes.attrition_routes import attrition_bp
from routes.attrition_analytics_routes import (
    analytics_bp as attrition_analytics_bp
)
from routes.leave_analytics_routes import (
    leave_bp
)



# ----------------------------------
# App Initialization
# ----------------------------------

app = Flask(__name__)

# ----------------------------------
# CORS
# ----------------------------------

allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "*").split(",")
    if origin.strip()
]
CORS(app, resources={r"/*": {"origins": allowed_origins}})


# ----------------------------------
# Blueprints
# ----------------------------------

app.register_blueprint(chat_bp)

app.register_blueprint(
    promotion_bp
)

app.register_blueprint(
    comparison_bp
)

app.register_blueprint(
    analytics_bp
)

app.register_blueprint(
    audit_bp
)
app.register_blueprint(
    resume_bp
)
app.register_blueprint(
    report_bp
)
app.register_blueprint(
    candidate_ranking_bp
)
app.register_blueprint(
    attrition_bp
)
app.register_blueprint(
    attrition_analytics_bp
)
app.register_blueprint(
    leave_bp
)


# ----------------------------------
# Health Check
# ----------------------------------

@app.route("/", methods=["GET"])
def health():

    return jsonify(
        {
            "status": "running",
            "application": "HR AI Assistant",
            "version": "2.0.0",
            "backend": "Flask",
            "database": "MySQL",
            "vector_store": "FAISS",
            "llm": "Groq",

            "modules": [
                "HR Chatbot",
                "Promotion Eligibility",
                "Employee Comparison",
                "HR Analytics",
                "HR Audit"
            ]
        }
    )

# ----------------------------------
# Error Handlers
# ----------------------------------

@app.errorhandler(404)
def not_found(error):

    return jsonify(
        {
            "success": False,
            "message": "Endpoint not found"
        }
    ), 404


@app.errorhandler(500)
def internal_server_error(error):

    return jsonify(
        {
            "success": False,
            "message": "Internal server error"
        }
    ), 500


# ----------------------------------
# Startup
# ----------------------------------

if __name__ == "__main__":

    print("\n" + "=" * 60)
    print("HR AI Assistant Backend Started")
    print("=" * 60)

    print("URL         : http://127.0.0.1:5000")
    print("Database    : MySQL")
    print("Vector DB   : FAISS")
    print("LLM         : Groq")

    print("\nEnabled Modules:")
    print("1. HR Chatbot")
    print("2. Promotion Eligibility")
    print("3. Employee Comparison")
    print("4. HR Analytics")
    print("5. HR Audit")

    print("=" * 60 + "\n")

    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5000")),
        debug=os.getenv("FLASK_DEBUG", "false").lower() == "true"
    )

