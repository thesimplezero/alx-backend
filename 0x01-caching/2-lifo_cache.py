#!/usr/bin/env python3
"""LIFOCache module"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """LIFOCache class that inherits from BaseCaching"""

    def __init__(self):
        """Initialize"""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            self.evict_last()

        self.cache_data[key] = item

    def evict_last(self):
        """Evict the last item inserted (LIFO)"""
        last_key = next(reversed(self.cache_data))
        del self.cache_data[last_key]
        print("DISCARD:", last_key)

    def get(self, key):
        """Get an item by key"""
        return self.cache_data.get(key, None)
