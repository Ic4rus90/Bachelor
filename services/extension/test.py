# Generate a random python function
# Usage: python test.py
# Output: random python function

import random
import string

def random_string(length):
    return ''.join(random.choice(string.ascii_letters) for i in range(length))
