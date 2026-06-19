from flask import Blueprint
from flask import jsonify

from services.audit_service import (
    audit
)

audit_bp = Blueprint(
    "audit",
    __name__
)


@audit_bp.route(
    "/audit",
    methods=["GET"]
)
def run_audit():

    return jsonify(
        audit()
    )