from typing import TypeVar


T = TypeVar("T")


def selection_sort(items: list[T]) -> list[T]:
    """Return a sorted copy of items using selection sort."""
    result = items.copy()

    for i in range(len(result)):
        min_index = i
        for j in range(i + 1, len(result)):
            if result[j] < result[min_index]:
                min_index = j

        result[i], result[min_index] = result[min_index], result[i]

    return result


if __name__ == "__main__":
    numbers = [64, 25, 12, 22, 11]
    print(selection_sort(numbers))
