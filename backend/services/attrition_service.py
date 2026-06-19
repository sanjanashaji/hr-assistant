import os
import pandas as pd

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
DATA_DIR = os.path.join(BASE_DIR, "static_data")

attrition_df = pd.read_csv(
    os.path.join(DATA_DIR, "attrition.csv")
)

employees = pd.read_csv(
    os.path.join(DATA_DIR, "employees.csv")
)


def predict_attrition(employee_id):

    employee = attrition_df[
        attrition_df["employee_id"] == employee_id
    ]

    if employee.empty:
        return {"error": "Employee not found"}

    employee = employee.iloc[0]

    emp_info = employees[
        employees["employee_id"] == employee_id
    ]

    name = emp_info.iloc[0]["full_name"] if not emp_info.empty else "Unknown"
    department = emp_info.iloc[0]["department"] if not emp_info.empty else "Unknown"
    designation = emp_info.iloc[0]["designation"] if not emp_info.empty else "Unknown"

    risk_factors = []

    if employee["rating"] < 3:
        risk_factors.append({
            "factor": "Low Performance Rating",
            "detail": f"Rating {employee['rating']} is below 3.0",
            "impact": 40
        })

    if employee["overtime"] == 1:
        risk_factors.append({
            "factor": "Frequent Overtime",
            "detail": "Employee regularly works overtime",
            "impact": 30
        })

    if employee["years_at_company"] > 5:
        risk_factors.append({
            "factor": "Long Tenure",
            "detail": f"{employee['years_at_company']} years at company",
            "impact": 20
        })

    if employee["salary"] < 50000:
        risk_factors.append({
            "factor": "Below-Market Salary",
            "detail": f"Salary ₹{int(employee['salary']):,} is under threshold",
            "impact": 10
        })

    risk = sum(f["impact"] for f in risk_factors)

    if not risk_factors:
        risk_factors.append({
            "factor": "Stable Profile",
            "detail": "No major attrition indicators detected",
            "impact": 0
        })

    if risk >= 70:
        level = "High"
        recommendation = "Immediate retention intervention recommended"
    elif risk >= 40:
        level = "Medium"
        recommendation = "Schedule check-in and review engagement drivers"
    else:
        level = "Low"
        recommendation = "Continue regular monitoring and career development"

    return {
        "employee_id": employee_id,
        "full_name": name,
        "department": department,
        "designation": designation,
        "salary": int(employee["salary"]),
        "rating": float(employee["rating"]),
        "years_at_company": float(employee["years_at_company"]),
        "overtime": bool(employee["overtime"]),
        "historical_attrition": bool(employee["attrition"]),
        "risk_score": min(risk, 100),
        "risk_level": level,
        "recommendation": recommendation,
        "risk_factors": risk_factors
    }
