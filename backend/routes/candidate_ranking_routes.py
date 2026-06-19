from flask import Blueprint
from flask import jsonify

from services.candidate_ranking_service import (
    rank_candidates
)

candidate_ranking_bp = Blueprint(
    "candidate_ranking",
    __name__
)


@candidate_ranking_bp.route(
    "/candidate-ranking/<job_title>",
    methods=["GET"]
)
def ranking(job_title):

    return jsonify(

        rank_candidates(
            job_title
        )

    )