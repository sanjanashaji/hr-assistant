import mysql.connector
from urllib.parse import parse_qs, unquote, urlparse

from config import (
    DATABASE_URL,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
)

def get_connection():
    if DATABASE_URL:
        parsed = urlparse(DATABASE_URL)
        query = parse_qs(parsed.query)
        ssl_mode = query.get(
            "ssl-mode",
            query.get("ssl_mode", [""])
        )[0].upper()

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

    connection = mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE
    )

    return connection
