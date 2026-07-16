from typing import TypeVar


T = TypeVar("T")


def bubble_sort(items: list[T]) -> list[T]:
    """Return a sorted copy of items using bubble sort."""
    result = items.copy()
    n = len(result)

    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True

        if not swapped:
            break

    return result


if __name__ == "__main__":
    numbers = [5, 1, 4, 2, 8]
    print(bubble_sort(numbers))