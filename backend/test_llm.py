from rag.retriever import retrieve_context
from llm.prompt_template import build_prompt
from llm.ollama_client import generate_response

question = "What is the work life balance policy?"

context = retrieve_context(question)

prompt = build_prompt(
    context,
    question
)

response = generate_response(
    prompt
)

print("\n")
print(response)
