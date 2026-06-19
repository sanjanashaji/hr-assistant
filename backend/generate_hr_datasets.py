
import pandas as pd
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

NUM_EMPLOYEES = 500

departments = [
    "Engineering",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
    "Sales"
]

designations = [
    "Associate",
    "Executive",
    "Senior Executive",
    "Analyst",
    "Manager",
    "Senior Manager"
]

salary_bands = [
    "B1",
    "B2",
    "B3",
    "B4"
]

leave_types = [
    "Sick Leave",
    "Casual Leave",
    "Earned Leave"
]

skills_pool = [
    "Python",
    "SQL",
    "Power BI",
    "Excel",
    "React",
    "Flask",
    "Machine Learning",
    "LLM",
    "Azure",
    "Docker",
    "Java",
    "Spring Boot"
]

# -----------------------------
# Employees
# -----------------------------

employees = []

for i in range(1, NUM_EMPLOYEES + 1):

    emp_id = f"EMP{i:03d}"

    employees.append({
        "employee_id": emp_id,
        "full_name": fake.name(),
        "email": fake.email(),
        "department": random.choice(departments),
        "designation": random.choice(designations),
        "salary_band": random.choice(salary_bands),
        "joining_date": fake.date_between(
            start_date="-8y",
            end_date="today"
        ),
        "manager_id": f"EMP{random.randint(1,50):03d}"
    })

employees_df = pd.DataFrame(employees)

# -----------------------------
# Attendance
# -----------------------------

attendance = []

for _ in range(1000):

    attendance.append({
        "employee_id": random.choice(
            employees_df["employee_id"].tolist()
        ),
        "month": random.choice([
            "2025-01",
            "2025-02",
            "2025-03",
            "2025-04",
            "2025-05"
        ]),
        "present_days": random.randint(18, 23),
        "absent_days": random.randint(0, 5),
        "late_logins": random.randint(0, 6)
    })

attendance_df = pd.DataFrame(attendance)

# -----------------------------
# Leave Records
# -----------------------------

leave_records = []

for _ in range(500):

    start = fake.date_between(
        start_date="-1y",
        end_date="today"
    )

    leave_records.append({
        "employee_id": random.choice(
            employees_df["employee_id"].tolist()
        ),
        "leave_type": random.choice(
            leave_types
        ),
        "start_date": start,
        "end_date": start + timedelta(
            days=random.randint(1,5)
        ),
        "status": random.choice([
            "Approved",
            "Rejected",
            "Pending"
        ])
    })

leave_df = pd.DataFrame(leave_records)

# -----------------------------
# Performance
# -----------------------------

performance = []

for emp in employees_df["employee_id"]:

    performance.append({
        "employee_id": emp,
        "review_year": 2025,
        "rating": round(
            random.uniform(2.5,5.0),
            1
        ),
        "goal_completion": random.randint(
            60,
            100
        ),
        "training_completed": random.randint(
            0,
            10
        )
    })

performance_df = pd.DataFrame(performance)

# -----------------------------
# Candidates
# -----------------------------

candidates = []

for i in range(200):

    candidates.append({
        "candidate_id": f"CAND{i+1:03d}",
        "name": fake.name(),
        "email": fake.email(),
        "experience_years": round(
            random.uniform(0,8),
            1
        ),
        "skills": ", ".join(
            random.sample(
                skills_pool,
                random.randint(3,6)
            )
        )
    })

candidates_df = pd.DataFrame(candidates)

# -----------------------------
# Job Descriptions
# -----------------------------

jobs = []

job_titles = [
    "Data Analyst",
    "HR Executive",
    "AI Engineer",
    "Software Engineer",
    "Recruiter"
]

for i in range(20):

    jobs.append({
        "job_id": f"JD{i+1:03d}",
        "title": random.choice(
            job_titles
        ),
        "required_skills": ", ".join(
            random.sample(
                skills_pool,
                random.randint(3,5)
            )
        )
    })

jobs_df = pd.DataFrame(jobs)

# -----------------------------
# Promotion Policy
# -----------------------------

promotion_df = pd.DataFrame([
    {
        "designation":"Associate",
        "current_band":"B1",
        "next_band":"B2",
        "min_rating":4.0,
        "min_tenure":2
    },
    {
        "designation":"Executive",
        "current_band":"B2",
        "next_band":"B3",
        "min_rating":4.2,
        "min_tenure":3
    },
    {
        "designation":"Manager",
        "current_band":"B3",
        "next_band":"B4",
        "min_rating":4.5,
        "min_tenure":4
    }
])

# -----------------------------
# Compliance
# -----------------------------

compliance = []

for emp in employees_df["employee_id"]:

    compliance.append({
        "employee_id": emp,
        "pan_status": random.choice([
            "Available",
            "Missing"
        ]),
        "aadhaar_status": random.choice([
            "Available",
            "Missing"
        ]),
        "nda_status": random.choice([
            "Available",
            "Missing"
        ])
    })

compliance_df = pd.DataFrame(compliance)

# -----------------------------
# Save Files
# -----------------------------

path = "static_data"

employees_df.to_csv(
    f"{path}/employees.csv",
    index=False
)

attendance_df.to_csv(
    f"{path}/attendance.csv",
    index=False
)

leave_df.to_csv(
    f"{path}/leave_records.csv",
    index=False
)

performance_df.to_csv(
    f"{path}/performance_reviews.csv",
    index=False
)

candidates_df.to_csv(
    f"{path}/candidates.csv",
    index=False
)

jobs_df.to_csv(
    f"{path}/job_descriptions.csv",
    index=False
)

promotion_df.to_csv(
    f"{path}/promotion_policy.csv",
    index=False
)

compliance_df.to_csv(
    f"{path}/compliance.csv",
    index=False
)

print("All datasets generated successfully!")

