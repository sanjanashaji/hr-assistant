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


def get_dashboard_metrics():

    dept_counts = (
        employees["department"]
        .value_counts()
    )

    total_employees = int(len(employees))

    department_breakdown = [
        {
            "department": dept,
            "count": int(count),
            "percentage": round(
                (count / total_employees) * 100,
                1
            ) if total_employees else 0
        }
        for dept, count
        in dept_counts.items()
    ]

    return {
        "total_employees": total_employees,
        "avg_rating": round(
            performance["rating"].mean(),
            2
        ),
        "departments": dept_counts.to_dict(),
        "total_departments": int(
            employees["department"].nunique()
        ),
        "department_breakdown": department_breakdown,
        "highest_rated": round(
            performance["rating"].max(),
            2
        ),
        "employees_reviewed": int(len(performance))
    }
