from config import (
    EMPLOYEE_DATA_PATH,
    POLICY_PDF_PATH,
    FAISS_INDEX_PATH,
    FAISS_METADATA_PATH
)

from rag.document_loader import (
    load_employee_csv,
    load_pdf
)

from rag.embeddings import (
    get_embedding
)

from rag.faiss_store import (
    FaissStore
)


def main():

    print(
        "Loading documents..."
    )

    employee_docs = load_employee_csv(
        EMPLOYEE_DATA_PATH
    )

    policy_docs = load_pdf(
        POLICY_PDF_PATH
    )

    all_docs = (
        employee_docs +
        policy_docs
    )

    print(
        f"Total Docs: {len(all_docs)}"
    )

    vectors = []

    for i, doc in enumerate(all_docs):

        print(
            f"Embedding {i+1}/{len(all_docs)}"
        )

        vector = get_embedding(
            doc[:8000]
        )

        vectors.append(
            vector
        )

    dimension = len(
        vectors[0]
    )

    store = FaissStore(
        dimension
    )

    store.add(
        vectors,
        all_docs
    )

    store.save(
        FAISS_INDEX_PATH,
        FAISS_METADATA_PATH
    )

    print(
        "FAISS Index Created"
    )


if __name__ == "__main__":
    main()