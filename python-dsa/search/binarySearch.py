from typing import TypeVar


T = TypeVar("T")


def binary_search(items: list[T], target: T) -> int:
    """Return the index of target in a sorted list, or -1 when not found."""
    left = 0
    right = len(items) - 1

    while left <= right:
        middle = left + (right - left) // 2

        if items[middle] == target:
            return middle
        if items[middle] < target:
            left = middle + 1
        else:
            right = middle - 1

    return -1


if __name__ == "__main__":
    numbers = [1, 2, 3, 4, 5, 6, 7]
    print(binary_search(numbers, 5))
