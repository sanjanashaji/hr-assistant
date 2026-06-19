import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

# ==========================================
# MYSQL
# ==========================================

DATABASE_URL = os.getenv("DATABASE_URL")
MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "hr_assistant")

# ==========================================
# GROQ
# ==========================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = os.getenv(
    "GROQ_API_URL",
    "https://api.groq.com/openai/v1/chat/completions"
)
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

# ==========================================
# VECTOR DB
# ==========================================

FAISS_INDEX_PATH = os.path.join(
    BASE_DIR,
    "faiss_index",
    "index.faiss"
)

FAISS_METADATA_PATH = os.path.join(
    BASE_DIR,
    "faiss_index",
    "metadata.pkl"
)

# ==========================================
# FILES
# ==========================================

EMPLOYEE_DATA_PATH = os.path.join(
    BASE_DIR,
    "static_data",
    "employees.csv"
)

POLICY_PDF_PATH = os.path.join(
    BASE_DIR,
    "static_data",
    "hr_policy.pdf"
)

# ==========================================
# EMBEDDINGS
# ==========================================

EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"
