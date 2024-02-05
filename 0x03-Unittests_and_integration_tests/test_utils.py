#!/usr/bin/env python3

import unittest
from parameterized import parameterized
from utils import access_nested_map

class TestAccessNestedMap(unittest.TestCase):
    """Class that tests if the access_nested_map function works"""

    @parameterized.expand([
        ({"a": {"b": {"c": 4}}}, ["a", "b", "c"], 4),
        ({"a": {"b": {"c": 4}}}, ["a", "b", "d"], None),
        ({"a": {"b": {"c": 4}}}, ["x", "y", "z"], None)
    ])
    def test_access_nested_map(self, nested_map, path, expected):
        """Tests if the function returns the correct value"""
        self.assertEqual(access_nested_map(nested_map, path), expected)

if __name__ == '__main__':
    unittest.main()
