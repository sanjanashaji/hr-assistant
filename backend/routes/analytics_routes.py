from flask import Blueprint
from flask import jsonify

from services.analytics_service import (
    get_dashboard_metrics
)

analytics_bp = Blueprint(
    "analytics",
    __name__
)


@analytics_bp.route(
    "/analytics",
    methods=["GET"]
)
def analytics():

    return jsonify(
        get_dashboard_metrics()
    )