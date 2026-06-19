from database.db import get_connection


def get_employee_by_name(name):

    conn = get_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    query = """
    SELECT *
    FROM employees
    WHERE employee_name LIKE %s
    LIMIT 1
    """

    cursor.execute(
        query,
        (f"%{name}%",)
    )

    employee = cursor.fetchone()

    cursor.close()
    conn.close()

    return employee


def get_employee_by_id(employee_id):

    conn = get_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    query = """
    SELECT *
    FROM employees
    WHERE employee_id = %s
    LIMIT 1
    """

    cursor.execute(
        query,
        (employee_id,)
    )

    employee = cursor.fetchone()

    cursor.close()
    conn.close()

    return employee


def get_top_employees(limit=15):

    conn = get_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    query = """
    SELECT
        employee_id,
        employee_name,
        department,
        manager_name,
        performance_score
    FROM employees
    ORDER BY performance_score DESC
    LIMIT %s
    """

    cursor.execute(
        query,
        (limit,)
    )

    employees = cursor.fetchall()

    cursor.close()
    conn.close()

    return employees