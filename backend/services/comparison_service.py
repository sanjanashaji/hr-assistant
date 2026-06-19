import os
import pandas as pd

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
DATA_DIR = os.path.join(BASE_DIR, "static_data")

employees = pd.read_csv(
    os.path.join(DATA_DIR, "employees.csv")
)

performance = pd.read_csv(
    os.path.join(DATA_DIR, "performance_reviews.csv")
)

attendance = pd.read_csv(
    os.path.join(DATA_DIR, "attendance.csv")
)


def _build_employee_profile(emp_id):

    emp = employees[
        employees["employee_id"] == emp_id
    ]

    if emp.empty:
        return None

    emp = emp.iloc[0]

    perf = performance[
        performance["employee_id"] == emp_id
    ]

    att = attendance[
        attendance["employee_id"] == emp_id
    ]

    perf_row = perf.iloc[0] if not perf.empty else None
    att_row = att.iloc[0] if not att.empty else None

    return {
        "id": emp_id,
        "name": emp["full_name"],
        "email": emp["email"],
        "department": emp["department"],
        "designation": emp["designation"],
        "salary_band": emp["salary_band"],
        "joining_date": emp["joining_date"],
        "rating": float(perf_row["rating"]) if perf_row is not None else 0,
        "goal_completion": int(perf_row["goal_completion"]) if perf_row is not None else 0,
        "training_completed": int(perf_row["training_completed"]) if perf_row is not None else 0,
        "present_days": int(att_row["present_days"]) if att_row is not None else 0,
        "absent_days": int(att_row["absent_days"]) if att_row is not None else 0,
        "late_logins": int(att_row["late_logins"]) if att_row is not None else 0
    }


def _winner(metric, higher_is_better=True):

    val1 = metric["employee_1"]
    val2 = metric["employee_2"]

    if val1 == val2:
        return "tie"

    if higher_is_better:
        return "employee_1" if val1 > val2 else "employee_2"

    return "employee_1" if val1 < val2 else "employee_2"


def compare_employees(emp1, emp2):

    profile1 = _build_employee_profile(emp1)
    profile2 = _build_employee_profile(emp2)

    if profile1 is None:
        return {"error": f"Employee {emp1} not found"}

    if profile2 is None:
        return {"error": f"Employee {emp2} not found"}

    metrics = [
        {"key": "rating", "label": "Performance Rating", "higher_is_better": True},
        {"key": "goal_completion", "label": "Goal Completion", "higher_is_better": True},
        {"key": "training_completed", "label": "Training Completed", "higher_is_better": True},
        {"key": "present_days", "label": "Present Days", "higher_is_better": True},
        {"key": "absent_days", "label": "Absent Days", "higher_is_better": False},
        {"key": "late_logins", "label": "Late Logins", "higher_is_better": False},
    ]

    comparison_rows = []

    wins = {"employee_1": 0, "employee_2": 0, "tie": 0}

    for metric in metrics:

        key = metric["key"]
        winner = _winner(
            {
                "employee_1": profile1[key],
                "employee_2": profile2[key]
            },
            metric["higher_is_better"]
        )

        wins[winner] += 1

        comparison_rows.append({
            "metric": key,
            "label": metric["label"],
            "employee_1_value": profile1[key],
            "employee_2_value": profile2[key],
            "winner": winner,
            "higher_is_better": metric["higher_is_better"]
        })

    overall_winner = "tie"

    if wins["employee_1"] > wins["employee_2"]:
        overall_winner = "employee_1"
    elif wins["employee_2"] > wins["employee_1"]:
        overall_winner = "employee_2"

    return {
        "employee_1": profile1,
        "employee_2": profile2,
        "comparison": comparison_rows,
        "summary": {
            "employee_1_wins": wins["employee_1"],
            "employee_2_wins": wins["employee_2"],
            "ties": wins["tie"],
            "overall_winner": overall_winner
        }
    }
