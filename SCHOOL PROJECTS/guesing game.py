import random

def guess(x):
    random_no = random.randint(1, x)
    while guess  != random_no:
        guess = int(input(f"guess another number"))
    