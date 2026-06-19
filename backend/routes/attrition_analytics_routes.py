from flask import Blueprint
from flask import jsonify
import pandas as pd

analytics_bp = Blueprint(
    "attrition_analytics",
    __name__
)

df = pd.read_csv(
    "static_data/attrition.csv"
)


@analytics_bp.route(
    "/attrition-analytics",
    methods=["GET"]
)
def analytics():

    high_risk = len(

        df[
            (
                df["rating"] < 3
            )
            &
            (
                df["overtime"] == 1
            )
        ]

    )

    return jsonify({

        "total_employees":
        len(df),

        "high_risk":
        high_risk,

        "average_salary":
        round(
            df["salary"].mean(),
            2
        )

    })