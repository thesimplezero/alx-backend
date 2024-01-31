#!/usr/bin/env python3
"""MRUCache module"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRUCache class, inherits BaseCaching"""

    def __init__(self):
        """Initialize MRU cache"""
        super().__init__()

    def put(self, key, item):
        """Add item, remove MRU"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            # Remove most recently used
            mru_key = next(reversed(list(self.cache_data.keys())))
            del self.cache_data[mru_key]
            print("DISCARD:", mru_key)

        self.cache_data[key] = item

    def get(self, key):
        """Retrieve item by key"""
        if key is None or key not in self.cache_data:
            return None
        # No need to update order
        return self.cache_data[key]
