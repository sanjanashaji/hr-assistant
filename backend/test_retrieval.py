from rag.retriever import retrieve

question = "What is the work life balance policy?"

results = retrieve(question)

for i, result in enumerate(results, start=1):
    print(f"\n--- Result {i} ---\n")
    print(result[:1000])