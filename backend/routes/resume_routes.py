from flask import Blueprint, jsonify, request

from services.resume_service import (
    screen_candidate,
    screen_uploaded_resumes
)

resume_bp = Blueprint(
    "resume",
    __name__
)


@resume_bp.route(
    "/resume/<candidate_id>",
    methods=["GET"]
)
def resume(candidate_id):

    result = screen_candidate(candidate_id)

    if result.get("error"):
        return jsonify(result), 404

    return jsonify(result)


@resume_bp.route(
    "/resume/screen",
    methods=["POST"]
)
def screen_resumes():

    files = request.files.getlist("resumes")

    if not files:
        return jsonify({
            "error": "Please upload at least one resume file."
        }), 400

    job_title = request.form.get("job_title", "").strip()
    job_description = request.form.get("job_description", "").strip()
    required_experience = request.form.get("required_experience", "0")
    required_skills = request.form.get("required_skills", "").strip()

    if not job_title:
        return jsonify({
            "error": "Job title is required."
        }), 400

    if not required_skills:
        return jsonify({
            "error": "Required skills are required."
        }), 400

    result = screen_uploaded_resumes(
        files,
        job_title,
        job_description,
        required_experience,
        required_skills
    )

    if result["total_candidates"] == 0:
        return jsonify({
            "error": "Could not read any resume files. Upload PDF or TXT files."
        }), 400

    return jsonify(result)
