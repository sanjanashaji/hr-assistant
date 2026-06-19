import requests

from config import (
    OLLAMA_URL,
    OLLAMA_MODEL
)

print("LOADED OLLAMA CLIENT")
print("OLLAMA_URL =", OLLAMA_URL)
print("OLLAMA_MODEL =", OLLAMA_MODEL)


def generate_response(prompt):

    print("GENERATE RESPONSE CALLED (STREAMING)")

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": True,
        "keep_alive": -1,
        "options": {
            "num_ctx": 4096
        }
    }

    try:
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            stream=True,
            timeout=120
        )
        response.raise_for_status()

        import json
        for line in response.iter_lines():
            if line:
                chunk = json.loads(line.decode('utf-8'))
                if "response" in chunk:
                    yield chunk["response"]

    except Exception as e:
        yield f" Backend Error: {str(e)}"