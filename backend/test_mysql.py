from database.db import get_connection

conn = get_connection()

cursor = conn.cursor()

cursor.execute(
    "SELECT COUNT(*) FROM employees"
)

count = cursor.fetchone()

print(
    f"Employees: {count[0]}"
)

cursor.close()
conn.close()