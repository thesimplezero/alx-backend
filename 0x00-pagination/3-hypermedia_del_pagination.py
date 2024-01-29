#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Paginates a database."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self._dataset = None
        self._indexed_dataset = None

    def dataset(self) -> List[List]:
        """Retrieve cached dataset."""
        if self._dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                self._dataset = [row for row in reader][1:]
        return self._dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Return dataset indexed."""
        if self._indexed_dataset is None:
            dataset = self.dataset()
            self._indexed_dataset = {i: dataset[i] for i in range(len(dataset))}
        return self._indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Return hypermedia information."""
        indexed_dataset = self.indexed_dataset()
        if index is None:
            index = 0
        data = [indexed_dataset[i] for i in range(index, index + page_size)
                if i in indexed_dataset]
        next_index = index + page_size
        if index not in indexed_dataset:
            return {"index": index, "data": [], "page_size": 0, "next_index": None}
        data = [indexed_dataset[i] for i in range(index, index + page_size)
                if i in indexed_dataset]
        next_index = index + page_size
        return {"index": index, "data": data, "page_size": len(data),
                "next_index": next_index if next_index in indexed_dataset else None}


if __name__ == "__main__":
    server = Server()
    server.indexed_dataset()
    try:
        server.get_hyper_index(300000, 100)
    except AssertionError:
        print("AssertionError raised")
    index = 3
    page_size = 2
    print("Nb items: {}".format(len(server.indexed_dataset())))
    res = server.get_hyper_index(index, page_size)
    print(res)
    print(server.get_hyper_index(res.get('next_index'), page_size))
    del server.indexed_dataset()[res.get('index')]
    print("Nb items: {}".format(len(server.indexed_dataset())))
    print(server.get_hyper_index(index, page_size))
    print(server.get_hyper_index(res.get('next_index'), page_size))
