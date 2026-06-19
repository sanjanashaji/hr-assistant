import faiss
import numpy as np
import pickle


class FaissStore:

    def __init__(self, dimension):

        self.index = faiss.IndexFlatL2(
            dimension
        )

        self.documents = []

    def add(self, vectors, docs):

        self.index.add(
            np.array(vectors).astype("float32")
        )

        self.documents.extend(docs)

    def save(
        self,
        index_path,
        metadata_path
    ):

        faiss.write_index(
            self.index,
            index_path
        )

        with open(
            metadata_path,
            "wb"
        ) as file:

            pickle.dump(
                self.documents,
                file
            )

    @staticmethod
    def load(
        index_path,
        metadata_path
    ):

        index = faiss.read_index(
            index_path
        )

        with open(
            metadata_path,
            "rb"
        ) as file:

            docs = pickle.load(file)

        return index, docs