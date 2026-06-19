import pandas as pd
import random

employees = pd.read_csv(
    "static_data/employees.csv"
)

rows = []

for _, emp in employees.iterrows():

    salary = random.randint(
        30000,
        180000
    )

    rating = round(
        random.uniform(
            2.0,
            5.0
        ),
        1
    )

    years = round(
        random.uniform(
            0,
            12
        ),
        1
    )

    overtime = random.choice(
        [0, 1]
    )

    attrition = random.choice(
        [0, 1]
    )

    rows.append({

        "employee_id":
        emp["employee_id"],

        "salary":
        salary,

        "rating":
        rating,

        "years_at_company":
        years,

        "overtime":
        overtime,

        "attrition":
        attrition

    })

df = pd.DataFrame(rows)

df.to_csv(
    "static_data/attrition.csv",
    index=False
)

print(
    "attrition.csv generated"
)