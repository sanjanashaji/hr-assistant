import io
import os
import re
import pandas as pd
from pypdf import PdfReader

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
DATA_DIR = os.path.join(BASE_DIR, "static_data")

candidates = pd.read_csv(
    os.path.join(DATA_DIR, "candidates.csv")
)

jobs = pd.read_csv(
    os.path.join(DATA_DIR, "job_descriptions.csv")
)

ELIGIBILITY_THRESHOLD = 50


def _normalize_skill_name(name):

    name = name.lower()
    name = re.sub(r"[^a-z0-9]", "", name)
    return name


def _normalize_skills(skills_text):

    if not skills_text:
        return []

    return [
        skill.strip()
        for skill in re.split(r"[,;\n|]", skills_text)
        if skill.strip()
    ]


def extract_text_from_file(file_storage):

    filename = file_storage.filename.lower()

    buf = io.BytesIO()
    file_storage.save(buf)
    raw = buf.getvalue()

    print(f"[Resume] File: '{file_storage.filename}', Size: {len(raw)} bytes")

    if filename.endswith(".pdf"):
        try:
            buf.seek(0)
            reader = PdfReader(buf)
            print(f"[Resume] PDF pages: {len(reader.pages)}")
            pages = [page.extract_text() or "" for page in reader.pages]
            text = "\n".join(pages)
            print(f"[Resume] Extracted text length: {len(text.strip())} chars")
            return text
        except Exception as e:
            print(f"[Resume] Failed to read PDF '{file_storage.filename}': {e}")
            return ""

    if filename.endswith((".txt", ".md")):
        return raw.decode("utf-8", errors="ignore")

    return raw.decode("utf-8", errors="ignore")


def extract_experience_years(text):

    patterns = [
        r"(\d+(?:\.\d+)?)\s*\+?\s*years?\s*(?:of\s*)?experience",
        r"experience\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*years?",
        r"(\d+(?:\.\d+)?)\s*years?\s*in",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return float(match.group(1))

    return 0.0


def extract_name_from_text(text, fallback_filename):

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    if lines:
        candidate = lines[0]
        if len(candidate.split()) <= 5 and len(candidate) < 60:
            return candidate

    base = os.path.splitext(fallback_filename)[0]
    return base.replace("_", " ").replace("-", " ").title()


def match_skills(resume_text, required_skills):

    resume_normalized = _normalize_skill_name(resume_text)
    resume_lower = resume_text.lower()
    matched = []
    missing = []

    for skill in required_skills:
        skill_normalized = _normalize_skill_name(skill)

        if not skill_normalized:
            continue

        if skill_normalized in resume_normalized:
            matched.append(skill)
        elif skill.lower().strip() in resume_lower:
            matched.append(skill)
        else:
            missing.append(skill)

    return matched, missing


def score_resume(
    resume_text,
    required_skills,
    required_experience,
    job_description=""
):

    matched, missing = match_skills(
        resume_text,
        required_skills
    )

    skills_score = 0
    if required_skills:
        skills_score = (len(matched) / len(required_skills)) * 55

    candidate_experience = extract_experience_years(resume_text)

    experience_score = 0
    if required_experience > 0:
        ratio = min(candidate_experience / required_experience, 1.0)
        experience_score = ratio * 25
    elif candidate_experience > 0:
        experience_score = 15

    description_score = 0
    if job_description:
        desc_words = set(
            re.findall(r"[a-zA-Z]{4,}", job_description.lower())
        )
        resume_words = set(
            re.findall(r"[a-zA-Z]{4,}", resume_text.lower())
        )
        overlap = desc_words & resume_words
        if desc_words:
            description_score = min(
                (len(overlap) / len(desc_words)) * 20,
                20
            )

    total_score = round(
        skills_score + experience_score + description_score,
        1
    )

    experience_met = (
        candidate_experience >= required_experience
        if required_experience > 0
        else candidate_experience > 0
    )

    eligible = total_score >= ELIGIBILITY_THRESHOLD

    return {
        "match_score": total_score,
        "matched_skills": matched,
        "missing_skills": missing,
        "experience_years": candidate_experience,
        "experience_required": required_experience,
        "experience_met": experience_met,
        "eligible": eligible,
        "skills_score": round(skills_score, 1),
        "experience_score": round(experience_score, 1),
        "description_score": round(description_score, 1)
    }


def screen_uploaded_resumes(
    files,
    job_title,
    job_description,
    required_experience,
    required_skills_text
):

    required_skills = _normalize_skills(required_skills_text)
    required_experience = float(required_experience or 0)

    results = []

    for file_storage in files:

        if not file_storage or not file_storage.filename:
            continue

        resume_text = extract_text_from_file(file_storage)

        if not resume_text.strip():
            continue

        scoring = score_resume(
            resume_text,
            required_skills,
            required_experience,
            job_description
        )

        results.append({
            "filename": file_storage.filename,
            "candidate_name": extract_name_from_text(
                resume_text,
                file_storage.filename
            ),
            "job_title": job_title,
            **scoring
        })

    results.sort(
        key=lambda item: item["match_score"],
        reverse=True
    )

    for index, item in enumerate(results, start=1):
        item["rank"] = index

    return {
        "job_title": job_title,
        "required_experience": required_experience,
        "required_skills": required_skills,
        "total_candidates": len(results),
        "eligible_count": sum(1 for r in results if r["eligible"]),
        "candidates": results
    }


def screen_candidate(candidate_id):

    candidate = candidates[
        candidates["candidate_id"] == candidate_id
    ]

    if candidate.empty:
        return {"error": "Candidate not found"}

    candidate = candidate.iloc[0]

    candidate_skills = set(
        skill.strip()
        for skill in candidate["skills"].split(",")
    )

    best_job = None
    best_score = 0

    for _, job in jobs.iterrows():
        job_skills = set(
            skill.strip()
            for skill in job["required_skills"].split(",")
        )

        score = len(candidate_skills & job_skills)

        if score > best_score:
            best_score = score
            best_job = job

    required_skills = set(
        skill.strip()
        for skill in best_job["required_skills"].split(",")
    )

    missing_skills = list(required_skills - candidate_skills)
    match_score = round(
        best_score / len(required_skills) * 100,
        2
    )

    return {
        "candidate_id": candidate_id,
        "candidate_name": candidate["name"],
        "experience_years": float(candidate["experience_years"]),
        "recommended_role": best_job["title"],
        "match_score": match_score,
        "matched_skills": list(candidate_skills & required_skills),
        "missing_skills": missing_skills,
        "eligible": match_score >= ELIGIBILITY_THRESHOLD
    }
