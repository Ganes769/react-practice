from typing import TypeVar


T = TypeVar("T")


def heap_sort(items: list[T]) -> list[T]:
    """Return a sorted copy of items using heap sort."""
    result = items.copy()
    n = len(result)

    for i in range(n // 2 - 1, -1, -1):
        heapify(result, n, i)

    for end in range(n - 1, 0, -1):
        result[0], result[end] = result[end], result[0]
        heapify(result, end, 0)

    return result


def heapify(items: list[T], heap_size: int, root_index: int) -> None:
    """Move the value at root_index down until the max-heap property is restored."""
    largest = root_index
    left = 2 * root_index + 1
    right = 2 * root_index + 2

    if left < heap_size and items[left] > items[largest]:
        largest = left

    if right < heap_size and items[right] > items[largest]:
        largest = right

    if largest != root_index:
        items[root_index], items[largest] = items[largest], items[root_index]
        heapify(items, heap_size, largest)


if __name__ == "__main__":
    numbers = [12, 11, 13, 5, 6, 7]
    print(heap_sort(numbers))
