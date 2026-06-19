import pandas as pd

from pypdf import PdfReader


def load_employee_csv(csv_path):

    df = pd.read_csv(csv_path)

    documents = []

    for _, row in df.iterrows():

        content = f"""
Employee ID: {row['Employee_ID']}
Department: {row['Department']}
Gender: {row['Gender']}
Age: {row['Age']}
Job Title: {row['Job_Title']}
Years At Company: {row['Years_At_Company']}
Education Level: {row['Education_Level']}
Performance Score: {row['Performance_Score']}
Monthly Salary: {row['Monthly_Salary']}
Work Hours Per Week: {row['Work_Hours_Per_Week']}
Projects Handled: {row['Projects_Handled']}
Overtime Hours: {row['Overtime_Hours']}
Sick Days: {row['Sick_Days']}
Remote Work Frequency: {row['Remote_Work_Frequency']}
Team Size: {row['Team_Size']}
Training Hours: {row['Training_Hours']}
Promotions: {row['Promotions']}
Employee Satisfaction Score: {row['Employee_Satisfaction_Score']}
Resigned: {row['Resigned']}
"""

        documents.append(content)

    return documents


def load_pdf(pdf_path):

    reader = PdfReader(pdf_path)

    pages = []

    for page in reader.pages:

        text = page.extract_text()

        if text:
            pages.append(text)

    return pages