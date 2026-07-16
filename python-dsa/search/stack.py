from typing import Generic, TypeVar


T = TypeVar("T")


class Stack(Generic[T]):
    """LIFO stack implementation backed by a Python list."""

    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self) -> T:
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self._items[-1]

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)

    def to_list(self) -> list[T]:
        return self._items.copy()


if __name__ == "__main__":
    stack = Stack[int]()
    stack.push(10)
    stack.push(20)
    print(stack.pop())
