import pandas as pd

employees = pd.read_csv("static_data/employees.csv")
performance = pd.read_csv("static_data/performance_reviews.csv")
policy = pd.read_csv("static_data/promotion_policy.csv")


def check_promotion(employee_id):

    emp = employees[
        employees["employee_id"] == employee_id
    ]

    if emp.empty:
        return {
            "eligible": False,
            "reason": "Employee not found"
        }

    emp = emp.iloc[0]

    perf = performance[
        performance["employee_id"] == employee_id
    ].iloc[0]

    matching_policy = policy[
        policy["designation"] ==
        emp["designation"]
    ]

    if matching_policy.empty:
        return {
            "eligible": False,
            "reason": "No promotion policy found"
        }

    rule = matching_policy.iloc[0]

    rating = perf["rating"]

    eligible = bool(
    rating >= rule["min_rating"]
)

    return {
    "employee_id": str(employee_id),
    "designation": str(emp["designation"]),
    "current_band": str(rule["current_band"]),
    "next_band": str(rule["next_band"]),
    "rating": float(rating),
    "required_rating": float(rule["min_rating"]),
    "eligible": bool(eligible)
}