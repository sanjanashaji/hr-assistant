import pandas as pd

candidates = pd.read_csv(
    "static_data/candidates.csv"
)

jobs = pd.read_csv(
    "static_data/job_descriptions.csv"
)


def rank_candidates(job_title):

    job = jobs[
        jobs["title"] ==
        job_title
    ]

    if job.empty:

        return []

    job = job.iloc[0]

    required_skills = set(

        skill.strip()

        for skill in
        job["required_skills"]
        .split(",")

    )

    ranked = []

    for _, candidate in candidates.iterrows():

        candidate_skills = set(

            skill.strip()

            for skill in
            candidate["skills"]
            .split(",")

        )

        skill_score = len(
            required_skills &
            candidate_skills
        ) * 10

        exp_score = (
            candidate[
                "experience_years"
            ] * 5
        )

        cert_score = 0

        if candidate[
            "certifications"
        ] != "None":

            cert_score = 10

        total_score = (
            skill_score +
            exp_score +
            cert_score
        )

        ranked.append({

            "candidate_id":
            candidate[
                "candidate_id"
            ],

            "name":
            candidate[
                "name"
            ],

            "score":
            round(
                total_score,
                2
            )

        })

    ranked = sorted(

        ranked,

        key=lambda x:
        x["score"],

        reverse=True

    )

    return ranked[:10]