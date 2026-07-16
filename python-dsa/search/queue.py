from collections import deque
from typing import Deque, Generic, TypeVar


T = TypeVar("T")


class Queue(Generic[T]):
    """FIFO queue implementation backed by collections.deque."""

    def __init__(self) -> None:
        self._items: Deque[T] = deque()

    def enqueue(self, item: T) -> None:
        self._items.append(item)

    def dequeue(self) -> T:
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self._items.popleft()

    def front(self) -> T:
        if self.is_empty():
            raise IndexError("front from empty queue")
        return self._items[0]

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)

    def to_list(self) -> list[T]:
        return list(self._items)


if __name__ == "__main__":
    queue = Queue[int]()
    queue.enqueue(10)
    queue.enqueue(20)
    print(queue.dequeue())
