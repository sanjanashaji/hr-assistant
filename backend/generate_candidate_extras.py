import pandas as pd
import random

df = pd.read_csv(
    "static_data/candidates.csv"
)

educations = [
    "B.Tech",
    "M.Tech",
    "MCA",
    "BCA",
    "MBA"
]

certifications = [
    "AWS Cloud Practitioner",
    "Azure Fundamentals",
    "Microsoft Power BI Associate",
    "Google Data Analytics",
    "Docker Certified Associate",
    "None"
]

df["education"] = [

    random.choice(
        educations
    )

    for _ in range(
        len(df)
    )

]

df["certifications"] = [

    random.choice(
        certifications
    )

    for _ in range(
        len(df)
    )

]

df.to_csv(
    "static_data/candidates.csv",
    index=False
)

print(
    "Candidates updated"
)