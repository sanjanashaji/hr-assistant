import os
import pandas as pd
from datetime import datetime

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
DATA_DIR = os.path.join(BASE_DIR, "static_data")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")

employees = pd.read_csv(
    os.path.join(DATA_DIR, "employees.csv")
)

performance = pd.read_csv(
    os.path.join(DATA_DIR, "performance_reviews.csv")
)

attendance = pd.read_csv(
    os.path.join(DATA_DIR, "attendance.csv")
)

compliance = pd.read_csv(
    os.path.join(DATA_DIR, "compliance.csv")
)

leave_records = pd.read_csv(
    os.path.join(DATA_DIR, "leave_records.csv")
)


def generate_report_data():

    dept_counts = (
        employees["department"]
        .value_counts()
        .to_dict()
    )

    missing_pan = int(
        len(
            compliance[
                compliance["pan_status"] == "Missing"
            ]
        )
    )

    missing_nda = int(
        len(
            compliance[
                compliance["nda_status"] == "Missing"
            ]
        )
    )

    avg_rating = round(
        performance["rating"].mean(),
        2
    )

    avg_present = round(
        attendance["present_days"].mean(),
        2
    )

    total_leave_days = int(
        leave_records["days"].sum()
    )

    report = {
        "generated_on": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        ),
        "total_employees": int(len(employees)),
        "total_departments": int(
            employees["department"].nunique()
        ),
        "average_rating": avg_rating,
        "average_present_days": avg_present,
        "total_leave_days": total_leave_days,
        "average_leave_days": round(
            leave_records["days"].mean(),
            2
        ),
        "missing_pan": missing_pan,
        "missing_nda": missing_nda,
        "department_headcount": dept_counts,
        "top_departments": list(dept_counts.keys())[:5],
        "leave_type_distribution": (
            leave_records["leave_type"]
            .value_counts()
            .to_dict()
        ),
        "performance_summary": {
            "highest_rating": round(
                performance["rating"].max(),
                2
            ),
            "lowest_rating": round(
                performance["rating"].min(),
                2
            ),
            "employees_reviewed": int(
                len(performance)
            )
        }
    }

    return report


def get_department_headcount_rows():

    counts = (
        employees["department"]
        .value_counts()
        .reset_index()
    )

    counts.columns = ["Department", "Employee Count"]

    return counts


def get_leave_summary_rows():

    summary = (
        leave_records
        .groupby("leave_type")["days"]
        .agg(["count", "sum"])
        .reset_index()
    )

    summary.columns = [
        "Leave Type",
        "Records",
        "Total Days"
    ]

    return summary


def get_performance_summary_rows():

    top_performers = (
        performance
        .merge(
            employees[["employee_id", "full_name", "department"]],
            on="employee_id",
            how="left"
        )
        .sort_values("rating", ascending=False)
        .head(10)
        [["employee_id", "full_name", "department", "rating", "goal_completion"]]
    )

    top_performers.columns = [
        "Employee ID",
        "Name",
        "Department",
        "Rating",
        "Goal Completion %"
    ]

    return top_performers


def ensure_reports_dir():

    os.makedirs(REPORTS_DIR, exist_ok=True)

    return REPORTS_DIR
