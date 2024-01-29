#!/usr/bin/env python3

import csv
from typing import List, Tuple

"""
Simple pagination using index_range and Server class
"""

def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Calculate start and end indexes for pagination.

    Args:
        page (int): Page number (1-indexed).
        page_size (int): Number of items per page.

    Returns:
        Tuple[int, int]: Start and end indexes.
    """
    start = (page - 1) * page_size
    end = start + page_size
    return start, end


class Server:
    """Server class for managing pagination of baby names dataset.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self._dataset = None

    def dataset(self) -> List[List]:
        """Retrieve dataset from CSV file.

        Returns:
            List[List]: Dataset as list of lists.
        """
        if self._dataset is None:
            with open(self.DATA_FILE) as file:
                reader = csv.reader(file)
                self._dataset = [row for row in reader][1:]
        return self._dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Retrieve specified page of dataset.

        Args:
            page (int, optional): Page number (1-indexed). Defaults to 1.
            page_size (int, optional): Number of items per page.
                Defaults to 10.

        Returns:
            List[List]: List of rows for the specified page.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start, end = index_range(page, page_size)
        return self.dataset()[start:end]


if __name__ == "__main__":
    server = Server()

    try:
        should_err = server.get_page(-10, 2)
    except AssertionError:
        print("AssertionError raised with negative values")

    try:
        should_err = server.get_page(0, 0)
    except AssertionError:
        print("AssertionError raised with 0")

    try:
        should_err = server.get_page(2, 'Bob')
    except AssertionError:
        print("AssertionError raised when page and/or page_size are not ints")

    print(server.get_page(1, 3))
    print(server.get_page(3, 2))
    print(server.get_page(3000, 100))
