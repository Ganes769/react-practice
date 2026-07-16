from dataclasses import dataclass
from typing import Generic, Iterator, TypeVar


T = TypeVar("T")


@dataclass
class Node(Generic[T]):
    value: T
    next: "Node[T] | None" = None


class LinkedList(Generic[T]):
    """Singly linked list with common insert, delete, and search operations."""

    def __init__(self) -> None:
        self.head: Node[T] | None = None

    def append(self, value: T) -> None:
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return

        current = self.head
        while current.next is not None:
            current = current.next
        current.next = new_node

    def prepend(self, value: T) -> None:
        self.head = Node(value, self.head)

    def delete(self, value: T) -> bool:
        if self.head is None:
            return False

        if self.head.value == value:
            self.head = self.head.next
            return True

        current = self.head
        while current.next is not None:
            if current.next.value == value:
                current.next = current.next.next
                return True
            current = current.next

        return False

    def find(self, value: T) -> Node[T] | None:
        current = self.head
        while current is not None:
            if current.value == value:
                return current
            current = current.next
        return None

    def to_list(self) -> list[T]:
        return [value for value in self]

    def __iter__(self) -> Iterator[T]:
        current = self.head
        while current is not None:
            yield current.value
            current = current.next


if __name__ == "__main__":
    linked_list = LinkedList[int]()
    linked_list.append(10)
    linked_list.append(20)
    linked_list.prepend(5)
    print(linked_list.to_list())
