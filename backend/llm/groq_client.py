import json

import requests

from config import GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL


def generate_response(prompt):
    if not GROQ_API_KEY:
        yield "Backend Error: GROQ_API_KEY is not configured."
        return

    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a helpful HR assistant. Use the supplied context, "
                    "be concise, and do not invent employee or policy details."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        "stream": True,
        "temperature": 0.2,
    }

    try:
        with requests.post(
            GROQ_API_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json=payload,
            stream=True,
            timeout=(15, 120),
        ) as response:
            response.raise_for_status()

            for line in response.iter_lines(decode_unicode=True):
                if not line or not line.startswith("data: "):
                    continue

                data = line[6:]
                if data == "[DONE]":
                    break

                chunk = json.loads(data)
                content = (
                    chunk.get("choices", [{}])[0]
                    .get("delta", {})
                    .get("content")
                )
                if content:
                    yield content

    except requests.RequestException as error:
        message = str(error)
        if error.response is not None:
            try:
                message = error.response.json().get("error", {}).get(
                    "message",
                    message,
                )
            except ValueError:
                pass
        yield f"Backend Error: {message}"
