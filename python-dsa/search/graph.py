from collections import deque
from typing import Deque, Hashable


class Graph:
    """Undirected graph represented with an adjacency list."""

    def __init__(self) -> None:
        self.adjacency_list: dict[Hashable, set[Hashable]] = {}

    def add_vertex(self, vertex: Hashable) -> None:
        self.adjacency_list.setdefault(vertex, set())

    def add_edge(self, first: Hashable, second: Hashable) -> None:
        self.add_vertex(first)
        self.add_vertex(second)
        self.adjacency_list[first].add(second)
        self.adjacency_list[second].add(first)

    def remove_edge(self, first: Hashable, second: Hashable) -> None:
        self.adjacency_list.get(first, set()).discard(second)
        self.adjacency_list.get(second, set()).discard(first)

    def breadth_first_search(self, start: Hashable) -> list[Hashable]:
        if start not in self.adjacency_list:
            return []

        visited = {start}
        order: list[Hashable] = []
        queue: Deque[Hashable] = deque([start])

        while queue:
            vertex = queue.popleft()
            order.append(vertex)

            for neighbor in sorted(self.adjacency_list[vertex]):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        return order

    def depth_first_search(self, start: Hashable) -> list[Hashable]:
        if start not in self.adjacency_list:
            return []

        visited: set[Hashable] = set()
        order: list[Hashable] = []

        def dfs(vertex: Hashable) -> None:
            visited.add(vertex)
            order.append(vertex)

            for neighbor in sorted(self.adjacency_list[vertex]):
                if neighbor not in visited:
                    dfs(neighbor)

        dfs(start)
        return order


if __name__ == "__main__":
    graph = Graph()
    graph.add_edge("A", "B")
    graph.add_edge("A", "C")
    graph.add_edge("B", "D")
    print(graph.breadth_first_search("A"))
