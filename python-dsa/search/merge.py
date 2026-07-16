from typing import TypeVar


T = TypeVar("T")


def merge_sort(items: list[T]) -> list[T]:
    """Return a sorted copy of items using merge sort."""
    if len(items) <= 1:
        return items.copy()

    middle = len(items) // 2
    left = merge_sort(items[:middle])
    right = merge_sort(items[middle:])
    return merge(left, right)


def merge(left: list[T], right: list[T]) -> list[T]:
    """Merge two sorted lists into one sorted list."""
    result: list[T] = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result


if __name__ == "__main__":
    numbers = [1, 4, 5, 2, 10, 22]
    print(merge_sort(numbers))
