"""Copy the employees table from a local MySQL database to DATABASE_URL."""

import os
from urllib.parse import parse_qs, unquote, urlparse

import mysql.connector


def connection_from_url(url):
    parsed = urlparse(url)
    query = parse_qs(parsed.query)
    ssl_mode = query.get("ssl-mode", [""])[0].upper()
    config = {
        "host": parsed.hostname,
        "port": parsed.port or 3306,
        "user": unquote(parsed.username or ""),
        "password": unquote(parsed.password or ""),
        "database": parsed.path.lstrip("/"),
    }
    if ssl_mode:
        config["ssl_disabled"] = ssl_mode == "DISABLED"
    return mysql.connector.connect(**config)


def main():
    destination_url = os.environ["DATABASE_URL"]
    source = mysql.connector.connect(
        host=os.getenv("SOURCE_MYSQL_HOST", "localhost"),
        port=int(os.getenv("SOURCE_MYSQL_PORT", "3306")),
        user=os.getenv("SOURCE_MYSQL_USER", "root"),
        password=os.environ["SOURCE_MYSQL_PASSWORD"],
        database=os.getenv("SOURCE_MYSQL_DATABASE", "hr_assistant"),
    )
    destination = connection_from_url(destination_url)

    source_cursor = source.cursor()
    destination_cursor = destination.cursor()

    source_cursor.execute("SHOW CREATE TABLE employees")
    create_sql = source_cursor.fetchone()[1]
    destination_cursor.execute(create_sql)
    destination.commit()

    source_cursor.execute("SELECT * FROM employees")
    columns = [column[0] for column in source_cursor.description]
    placeholders = ", ".join(["%s"] * len(columns))
    column_names = ", ".join(f"`{column}`" for column in columns)
    insert_sql = (
        f"INSERT INTO employees ({column_names}) "
        f"VALUES ({placeholders})"
    )

    copied = 0
    while True:
        rows = source_cursor.fetchmany(1000)
        if not rows:
            break
        destination_cursor.executemany(insert_sql, rows)
        destination.commit()
        copied += len(rows)
        if copied % 10000 == 0:
            print(f"Copied {copied} rows")

    print(f"Migration complete: {copied} rows")
    destination_cursor.close()
    source_cursor.close()
    destination.close()
    source.close()


if __name__ == "__main__":
    main()
