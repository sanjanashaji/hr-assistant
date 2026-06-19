import requests

OLLAMA_URL = "http://localhost:11434/api/embed"

EMBEDDING_MODEL = "nomic-embed-text"


def get_embedding(text):

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": EMBEDDING_MODEL,
            "input": text,
            "keep_alive": -1
        }
    )

    response.raise_for_status()

    data = response.json()

    return data["embeddings"][0]