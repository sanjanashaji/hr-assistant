import pandas as pd
from mysql.connector import Error
from database.db import get_connection

CSV_FILE = "static_data/employees.csv"


def safe_float(value):
    try:
        return float(value)
    except:
        return None


def safe_int(value):
    try:
        return int(value)
    except:
        return None


try:

    print("Loading CSV...")

    df = pd.read_csv(CSV_FILE)

    print(f"Rows Found: {len(df)}")

    connection = get_connection()

    cursor = connection.cursor()

    insert_query = """
    INSERT INTO employees(
        employee_id,
        employee_name,
        manager_name,
        department,
        gender,
        age,
        job_title,
        hire_date,
        years_at_company,
        education_level,
        performance_score,
        monthly_salary,
        work_hours_per_week,
        projects_handled,
        overtime_hours,
        sick_days,
        remote_work_frequency,
        team_size,
        training_hours,
        promotions,
        employee_satisfaction_score,
        resigned
    )
    VALUES(
        %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
        %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
        %s,%s
    )
    """

    batch_size = 5000

    batch = []

    for _, row in df.iterrows():

        batch.append(
            (
                str(row["Employee_ID"]),
                str(row["Employee_Name"]),
                str(row["Manager_Name"]),
                str(row["Department"]),
                str(row["Gender"]),
                safe_int(row["Age"]),
                str(row["Job_Title"]),
                None,
                safe_float(row["Years_At_Company"]),
                str(row["Education_Level"]),
                safe_float(row["Performance_Score"]),
                safe_float(row["Monthly_Salary"]),
                safe_float(row["Work_Hours_Per_Week"]),
                safe_int(row["Projects_Handled"]),
                safe_float(row["Overtime_Hours"]),
                safe_int(row["Sick_Days"]),
                safe_float(row["Remote_Work_Frequency"]),
                safe_int(row["Team_Size"]),
                safe_float(row["Training_Hours"]),
                safe_int(row["Promotions"]),
                safe_float(
                    row["Employee_Satisfaction_Score"]
                ),
                bool(row["Resigned"])
            )
        )

        if len(batch) >= batch_size:

            cursor.executemany(
                insert_query,
                batch
            )

            connection.commit()

            print(
                f"Inserted {len(batch)} rows..."
            )

            batch.clear()

    if batch:

        cursor.executemany(
            insert_query,
            batch
        )

        connection.commit()

    cursor.close()

    connection.close()

    print("Import Completed Successfully")

except Error as e:

    print("MySQL Error:", e)

except Exception as e:

    print("Error:", e)
