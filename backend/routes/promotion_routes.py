from flask import Blueprint
from flask import jsonify

from services.promotion_service import (
    check_promotion
)

promotion_bp = Blueprint(
    "promotion",
    __name__
)


@promotion_bp.route(
    "/promotion/<employee_id>",
    methods=["GET"]
)
def promotion_check(employee_id):

    result = check_promotion(
        employee_id
    )

    return jsonify(result)