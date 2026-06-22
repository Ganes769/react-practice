class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def print_tree(root):
    def _display_aux(node):
        if node.right is None and node.left is None:
            line = str(node.value)
            width = len(line)
            height = 1
            middle = width // 2
            return [line], width, height, middle

        if node.right is None:
            lines, n, p, x = _display_aux(node.left)
            s = str(node.value)
            u = len(s)
            first_line = (x + 1) * " " + (n - x - 1) * "_" + s
            second_line = x * " " + "/" + (n - x - 1 + u) * " "
            shifted_lines = [line + u * " " for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, n + u // 2

        if node.left is None:
            lines, n, p, x = _display_aux(node.right)
            s = str(node.value)
            u = len(s)
            first_line = s + x * "_" + (n - x) * " "
            second_line = (u + x) * " " + "\\" + (n - x - 1) * " "
            shifted_lines = [u * " " + line for line in lines]
            return [first_line, second_line] + shifted_lines, n + u, p + 2, u // 2

        left, n, p, x = _display_aux(node.left)
        right, m, q, y = _display_aux(node.right)
        s = str(node.value)
        u = len(s)

        first_line = (x + 1) * " " + (n - x - 1) * "_" + s + y * "_" + (m - y) * " "
        second_line = x * " " + "/" + (n - x - 1 + u + y) * " " + "\\" + (m - y - 1) * " "

        if p < q:
            left += [" " * n] * (q - p)
        elif q < p:
            right += [" " * m] * (p - q)

        lines = [a + u * " " + b for a, b in zip(left, right)]
        return [first_line, second_line] + lines, n + m + u, max(p, q) + 2, n + u // 2

    lines, _, _, _ = _display_aux(root)
    for line in lines:
        print(line)


# Example
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)
root.right.left = Node(6)
root.right.right = Node(7)

print_tree(root)