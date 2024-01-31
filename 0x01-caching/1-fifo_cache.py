#!/usr/bin/env python3
"""FIFOCache module"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache class that inherits from BaseCaching"""

    def __init__(self):
        """Initialize"""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            self.evict()

        self.cache_data[key] = item

    def evict(self):
        """Evict the first item inserted (FIFO)"""
        discarded_key, _ = self.cache_data.popitem(last=False)
        print("DISCARD:", discarded_key)

    def get(self, key):
        """Get item by key"""
        return self.cache_data.get(key, None)
