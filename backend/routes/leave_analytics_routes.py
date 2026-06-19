from flask import Blueprint
from flask import jsonify

from services.leave_analytics_service import (
    get_leave_analytics
)

leave_bp = Blueprint(
    "leave",
    __name__
)


@leave_bp.route(
    "/leave-analytics",
    methods=["GET"]
)
def leave_analytics():

    return jsonify(

        get_leave_analytics()

    )