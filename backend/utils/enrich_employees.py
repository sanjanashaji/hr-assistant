import pandas as pd
import random

EMPLOYEE_NAMES = [
    "Rahul Sharma",
    "Priya Reddy",
    "Arjun Kumar",
    "Sneha Gupta",
    "Vikas Singh",
    "Neha Patel",
    "Rohit Verma",
    "Ananya Das",
    "Kiran Rao",
    "Amit Joshi",
    "Pooja Nair",
    "Sanjay Mehta",
    "Deepak Yadav",
    "Kavya Menon",
    "Nikhil Jain",
]

MANAGERS = [
    "Michael Scott",
    "Sarah Johnson",
    "David Miller",
    "Emma Wilson",
    "Robert Brown",
    "Sophia Davis",
    "James Clark",
    "Olivia Taylor"
]

INPUT_FILE = "../static_data/employees.csv"
OUTPUT_FILE = "../static_data/employees.csv"

df = pd.read_csv(INPUT_FILE)

employee_names = []

for i in range(len(df)):
    employee_names.append(
        f"{random.choice(EMPLOYEE_NAMES)} {i+1}"
    )

df["Employee_Name"] = employee_names

df["Manager_Name"] = [
    random.choice(MANAGERS)
    for _ in range(len(df))
]

df.to_csv(
    OUTPUT_FILE,
    index=False
)

print("employees.csv created successfully")