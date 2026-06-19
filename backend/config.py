import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ==========================================
# MYSQL
# ==========================================

MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASSWORD = "Nous@12345"
MYSQL_DATABASE = "hr_assistant"

# ==========================================
# OLLAMA
# ==========================================

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "qwen2.5:latest"

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