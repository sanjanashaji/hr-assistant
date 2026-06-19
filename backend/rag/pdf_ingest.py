import os
import pickle
import faiss
import numpy as np

from pypdf import PdfReader

from rag.embeddings import (
    get_embedding
)

from config import (
    POLICY_PDF_PATH,
    FAISS_INDEX_PATH,
    FAISS_METADATA_PATH
)


def chunk_text(
    text,
    chunk_size=700
):

    words = text.split()

    chunks = []

    for i in range(
        0,
        len(words),
        chunk_size
    ):

        chunk = " ".join(
            words[i:i + chunk_size]
        )

        chunks.append(chunk)

    return chunks


def build_index():

    reader = PdfReader(
        POLICY_PDF_PATH
    )

    full_text = ""

    for page in reader.pages:

        text = page.extract_text()

        if text:
            full_text += text + "\n"

    chunks = chunk_text(
        full_text
    )

    vectors = []

    for chunk in chunks:

        vectors.append(
            get_embedding(chunk)
        )

    dimension = len(
        vectors[0]
    )

    index = faiss.IndexFlatL2(
        dimension
    )

    index.add(
        np.array(vectors).astype(
            "float32"
        )
    )

    faiss.write_index(
        index,
        FAISS_INDEX_PATH
    )

    with open(
        FAISS_METADATA_PATH,
        "wb"
    ) as file:

        pickle.dump(
            chunks,
            file
        )

    print(
        "Policy Index Created"
    )


if __name__ == "__main__":

    build_index()