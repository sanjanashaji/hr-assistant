from flask import Blueprint
from flask import jsonify

from services.comparison_service import (
    compare_employees
)

comparison_bp = Blueprint(
    "comparison",
    __name__
)


@comparison_bp.route(
    "/compare/<emp1>/<emp2>",
    methods=["GET"]
)
def compare(emp1, emp2):

    result = compare_employees(emp1, emp2)

    if result.get("error"):
        return jsonify(result), 404

    return jsonify(result)