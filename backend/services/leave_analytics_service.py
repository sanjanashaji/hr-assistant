import pandas as pd

df = pd.read_csv(
    "static_data/leave_records.csv"
)


def get_leave_analytics():

    department_leave = (
        df.groupby("department")["days"]
        .sum()
        .sort_values(ascending=False)
    )

    top_department = department_leave.index[0]

    avg_per_department = (
        df.groupby("department")["days"]
        .mean()
        .round(2)
        .sort_values(ascending=False)
    )

    employee_leave = (
        df.groupby("employee_id")["days"]
        .sum()
        .sort_values(ascending=False)
        .head(5)
    )

    leave_type_distribution = (
        df["leave_type"]
        .value_counts()
        .to_dict()
    )

    total_leave_days = int(df["days"].sum())
    max_type_count = max(
        leave_type_distribution.values()
    ) if leave_type_distribution else 1

    leave_type_breakdown = [
        {
            "type": leave_type,
            "count": count,
            "total_days": int(
                df[df["leave_type"] == leave_type]["days"].sum()
            ),
            "percentage": round(
                (count / max_type_count) * 100,
                1
            )
        }
        for leave_type, count
        in leave_type_distribution.items()
    ]

    department_breakdown = [
        {
            "department": dept,
            "total_days": int(days),
            "average_days": float(avg_per_department.get(dept, 0)),
            "percentage": round(
                (days / total_leave_days) * 100,
                1
            ) if total_leave_days else 0
        }
        for dept, days
        in department_leave.items()
    ]

    top_employees = [
        {
            "employee_id": emp_id,
            "total_days": int(days)
        }
        for emp_id, days
        in employee_leave.items()
    ]

    return {
        "total_leave_days": total_leave_days,
        "average_leave_days": round(df["days"].mean(), 2),
        "highest_leave_department": top_department,
        "total_leave_records": int(len(df)),
        "unique_employees_on_leave": int(
            df["employee_id"].nunique()
        ),
        "leave_type_distribution": leave_type_distribution,
        "leave_type_breakdown": leave_type_breakdown,
        "department_leave_breakdown": department_leave.to_dict(),
        "average_leave_per_department": avg_per_department.to_dict(),
        "department_breakdown": department_breakdown,
        "top_employees_by_leave": top_employees
    }
