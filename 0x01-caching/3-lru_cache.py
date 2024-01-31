#!/usr/bin/env python3
"""LRUCache module"""

from collections import OrderedDict
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """LRUCache class that inherits from BaseCaching"""

    def __init__(self):
        """Initialize"""
        super().__init__()
        self.used_order = OrderedDict()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            # Remove LRU item
            lru_key = next(iter(self.used_order))
            del self.cache_data[lru_key]
            del self.used_order[lru_key]
            print("DISCARD:", lru_key)

        self.cache_data[key] = item
        self.used_order[key] = None

    def get(self, key):
        """Get an item by key"""
        if key is None or key not in self.cache_data:
            return None
        # Move key to end to mark it as most recently used
        self.used_order.move_to_end(key)
        return self.cache_data[key]
