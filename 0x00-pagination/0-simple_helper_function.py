#!/usr/bin/env python3
"""
Simple pagination helper function
"""

from typing import Tuple

def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return start and end indexes for pagination.

    Args:
        page (int): Page number (1-indexed).
        page_size (int): Items per page.

    Returns:
        Tuple[int, int]: Start and end indexes.
    """
    start_index = (page - 1) * page_size
    return start_index, start_index + page_size
