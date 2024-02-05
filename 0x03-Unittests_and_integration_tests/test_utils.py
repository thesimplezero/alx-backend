#!/usr/bin/env python3
"""
Module containing unit tests for utils.py
"""

import unittest
from unittest.mock import patch
from utils import memoize


class TestMemoize(unittest.TestCase):
    """
    Test cases for memoize decorator
    """

    class TestClass:
        """
        Test class with a_method and a_property decorated with memoize
        """

        def a_method(self):
            return 42

        @memoize
        def a_property(self):
            return self.a_method()

    def test_memoize(self):
        """
        Test memoize decorator
        """
        # Create instance of TestClass
        test_instance = self.TestClass()

        # Patch a_method to return expected value
        with patch.object(test_instance, 'a_method') as mock_a_method:
            mock_a_method.return_value = 42

            # Call a_property twice
            result1 = test_instance.a_property
            result2 = test_instance.a_property

            # Assert that a_method is called once
            mock_a_method.assert_called_once()

            # Assert that results are correct
            self.assertEqual(result1, 42)
            self.assertEqual(result2, 42)