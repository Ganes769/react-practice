from dataclasses import dataclass


@dataclass
class TreeNode:
    value: int
    left: "TreeNode | None" = None
    right: "TreeNode | None" = None


class BinarySearchTree:
    """Binary search tree with insert, search, delete, and traversal methods."""

    def __init__(self) -> None:
        self.root: TreeNode | None = None

    def insert(self, value: int) -> None:
        self.root = self._insert(self.root, value)

    def _insert(self, node: TreeNode | None, value: int) -> TreeNode:
        if node is None:
            return TreeNode(value)

        if value < node.value:
            node.left = self._insert(node.left, value)
        elif value > node.value:
            node.right = self._insert(node.right, value)

        return node

    def search(self, value: int) -> bool:
        current = self.root
        while current is not None:
            if value == current.value:
                return True
            if value < current.value:
                current = current.left
            else:
                current = current.right
        return False

    def delete(self, value: int) -> None:
        self.root = self._delete(self.root, value)

    def _delete(self, node: TreeNode | None, value: int) -> TreeNode | None:
        if node is None:
            return None

        if value < node.value:
            node.left = self._delete(node.left, value)
        elif value > node.value:
            node.right = self._delete(node.right, value)
        else:
            if node.left is None:
                return node.right
            if node.right is None:
                return node.left

            successor = self._min_node(node.right)
            node.value = successor.value
            node.right = self._delete(node.right, successor.value)

        return node

    def inorder(self) -> list[int]:
        result: list[int] = []
        self._inorder(self.root, result)
        return result

    def preorder(self) -> list[int]:
        result: list[int] = []
        self._preorder(self.root, result)
        return result

    def postorder(self) -> list[int]:
        result: list[int] = []
        self._postorder(self.root, result)
        return result

    def _inorder(self, node: TreeNode | None, result: list[int]) -> None:
        if node is None:
            return
        self._inorder(node.left, result)
        result.append(node.value)
        self._inorder(node.right, result)

    def _preorder(self, node: TreeNode | None, result: list[int]) -> None:
        if node is None:
            return
        result.append(node.value)
        self._preorder(node.left, result)
        self._preorder(node.right, result)

    def _postorder(self, node: TreeNode | None, result: list[int]) -> None:
        if node is None:
            return
        self._postorder(node.left, result)
        self._postorder(node.right, result)
        result.append(node.value)

    def _min_node(self, node: TreeNode) -> TreeNode:
        current = node
        while current.left is not None:
            current = current.left
        return current


if __name__ == "__main__":
    tree = BinarySearchTree()
    for number in [50, 30, 70, 20, 40, 60, 80]:
        tree.insert(number)

    print(tree.inorder())
    print(tree.search(60))
