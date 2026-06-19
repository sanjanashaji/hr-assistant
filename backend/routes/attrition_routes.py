from flask import Blueprint
from flask import jsonify

from services.attrition_service import (
    predict_attrition
)

attrition_bp = Blueprint(
    "attrition",
    __name__
)


@attrition_bp.route(
    "/attrition/<employee_id>",
    methods=["GET"]
)
def attrition(
    employee_id
):

    return jsonify(

        predict_attrition(
            employee_id
        )

    )