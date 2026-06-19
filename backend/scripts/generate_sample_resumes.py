import os

SAMPLE_RESUMES_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "static_data",
    "sample_resumes"
)

os.makedirs(SAMPLE_RESUMES_DIR, exist_ok=True)

SAMPLES = [
    {
        "filename": "alice_johnson_resume.txt",
        "content": """Alice Johnson
Software Engineer
Email: alice.johnson@email.com | Phone: +91 9876543210

PROFESSIONAL SUMMARY
Software engineer with 5 years of experience building scalable web applications
using React, Python, Flask, and SQL. Strong background in API development,
Docker deployment, and agile delivery.

SKILLS
React, Python, Flask, SQL, Docker, Java, Spring Boot, Machine Learning, Azure

EXPERIENCE
Senior Software Engineer | TechCorp | 2021 - Present
- Built React dashboards and Flask REST APIs for HR analytics platform
- Deployed services using Docker and Azure with 99.9% uptime
- 5 years of experience in full-stack development

Software Developer | InnovateLabs | 2019 - 2021
- Developed Java and Spring Boot microservices
- Optimized SQL queries reducing report generation time by 40%

EDUCATION
B.Tech Computer Science | IIT Delhi | 2019
"""
    },
    {
        "filename": "bob_smith_resume.txt",
        "content": """Bob Smith
Data Analyst
Email: bob.smith@email.com

SUMMARY
Analytical professional with 2 years of experience in data reporting,
Power BI dashboards, and SQL-based analytics for business teams.

SKILLS
Power BI, SQL, Excel, Python, React

EXPERIENCE
Data Analyst | AnalyticsHub | 2023 - Present
- Created Power BI reports for HR and finance stakeholders
- 2 years of experience in business intelligence

Junior Analyst | DataWorks | 2022 - 2023
- Built Excel models and SQL queries for monthly KPI tracking

EDUCATION
BCA | Mumbai University | 2022
"""
    },
    {
        "filename": "carol_davis_resume.txt",
        "content": """Carol Davis
AI Engineer
Email: carol.davis@email.com

SUMMARY
AI engineer with 4.5 years of experience in machine learning pipelines,
LLM integration, Flask APIs, and cloud-native deployments.

SKILLS
Python, Machine Learning, LLM, Flask, Docker, SQL, React, Azure, Power BI

EXPERIENCE
AI Engineer | NeuralSystems | 2022 - Present
- Developed LLM-powered HR assistant using Flask and React
- Built ML scoring models with 4.5 years of experience in AI engineering

ML Developer | CloudAI | 2020 - 2022
- Implemented Docker-based model serving and SQL feature stores

EDUCATION
MCA | Pune University | 2020
"""
    },
    {
        "filename": "david_lee_resume.txt",
        "content": """David Lee
HR Executive
Email: david.lee@email.com

SUMMARY
HR professional with 3 years of experience in recruitment, employee relations,
and HR policy administration.

SKILLS
Flask, Spring Boot, Python, Excel, Communication

EXPERIENCE
HR Executive | PeopleFirst | 2022 - Present
- Managed onboarding, compliance tracking, and policy rollouts
- 3 years of experience in human resources operations

HR Coordinator | TalentBridge | 2021 - 2022
- Supported recruitment drives and employee documentation

EDUCATION
MBA HR | Delhi University | 2021
"""
    },
    {
        "filename": "emma_wilson_resume.txt",
        "content": """Emma Wilson
Full Stack Developer
Email: emma.wilson@email.com

SUMMARY
Developer with 1 year of experience in React frontends and basic Python scripting.

SKILLS
React, JavaScript, HTML, CSS, Excel

EXPERIENCE
Junior Developer | WebStart | 2024 - Present
- Built React components for internal tools
- 1 year of experience in frontend development

EDUCATION
B.Tech IT | Bangalore University | 2024
"""
    }
]

for sample in SAMPLES:
    path = os.path.join(SAMPLE_RESUMES_DIR, sample["filename"])
    with open(path, "w", encoding="utf-8") as f:
        f.write(sample["content"])

print(f"Created {len(SAMPLES)} sample resumes in {SAMPLE_RESUMES_DIR}")
