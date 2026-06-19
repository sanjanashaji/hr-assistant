import pickle
from rank_bm25 import BM25Okapi

from config import (
    FAISS_METADATA_PATH
)

with open(
    FAISS_METADATA_PATH,
    "rb"
) as file:
    documents = pickle.load(file)

tokenized_corpus = [doc.lower().split() for doc in documents]
bm25 = BM25Okapi(tokenized_corpus)

def retrieve_context(
    question,
    top_k=2
):
    tokenized_query = question.lower().split()
    results = bm25.get_top_n(tokenized_query, documents, n=top_k)
    
    return "\n\n".join(results)

def retrieve(
    question,
    top_k=2
):
    return retrieve_context(
        question,
        top_k
    )