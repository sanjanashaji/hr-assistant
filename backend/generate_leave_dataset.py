import pandas as pd
import random

employees = pd.read_csv(
    "static_data/employees.csv"
)

leave_types = [
    "Sick Leave",
    "Casual Leave",
    "Earned Leave",
    "Maternity Leave"
]

rows = []

for _, emp in employees.iterrows():

    for _ in range(
        random.randint(1, 5)
    ):

        rows.append({

            "employee_id":
            emp["employee_id"],

            "department":
            emp["department"],

            "leave_type":
            random.choice(
                leave_types
            ),

            "days":
            random.randint(
                1,
                10
            )

        })

leave_df = pd.DataFrame(rows)

leave_df.to_csv(
    "static_data/leave_records.csv",
    index=False
)

print("Generated")