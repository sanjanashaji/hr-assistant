import re

from database.employee_repository import (
    get_employee_by_name,
    get_employee_by_id,
    get_top_employees
)


def format_employee(employee):

    return f"""
Employee Name: {employee['employee_name']}
Manager: {employee['manager_name']}
Department: {employee['department']}
Job Title: {employee['job_title']}
Performance Score: {employee['performance_score']}
Monthly Salary: {employee['monthly_salary']}
Years At Company: {employee['years_at_company']}
Employee Satisfaction: {employee['employee_satisfaction_score']}
"""


def get_employee_answer(question):

    question_lower = question.lower()

    # TOP EMPLOYEES

    if (
        "top employees" in question_lower
        or "top 15" in question_lower
        or "best employees" in question_lower
        or "top performers" in question_lower
    ):

        employees = get_top_employees(
            15
        )

        result = "🏆 TOP 15 EMPLOYEES\n\n"

        for index, emp in enumerate(
            employees,
            start=1
        ):

            result += (
                f"{index}. "
                f"{emp['employee_name']} | "
                f"{emp['department']} | "
                f"Score: {emp['performance_score']}\n"
            )

        return result

    # EMPLOYEE ID SEARCH

    match = re.search(
        r"\b\d+\b",
        question
    )

    if match:

        employee_id = (
            match.group()
        )

        employee = (
            get_employee_by_id(
                employee_id
            )
        )

        if employee:

            return format_employee(
                employee
            )

    # EMPLOYEE NAME SEARCH

    keywords = [
        "manager of",
        "salary of",
        "performance of",
        "details of",
        "employee"
    ]

    employee_name = None

    for keyword in keywords:

        if keyword in question_lower:

            position = (
                question_lower.find(
                    keyword
                )
                + len(keyword)
            )

            employee_name = (
                question[position:]
                .strip()
            )

            break

    if not employee_name:

        return (
            "Employee not found."
        )

    employee = (
        get_employee_by_name(
            employee_name
        )
    )

    if not employee:

        return (
            "Employee not found."
        )

    return format_employee(
        employee
    )