EMPLOYEE_KEYWORDS = [

    "manager",
    "salary",
    "performance",
    "employee",
    "department",
    "details",
    "satisfaction",
    "promotion",
    "age",
    "job title",

    "top employees",
    "top performer",
    "top performers",
    "best employees",

    "employee id",

    "manager of",

    "show employee"
]


def is_employee_query(
    question
):

    question = (
        question.lower()
    )

    return any(
        keyword in question
        for keyword
        in EMPLOYEE_KEYWORDS
    )