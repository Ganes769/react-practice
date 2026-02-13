import { useState, useEffect } from "react";
import "./tree.css";

class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    value: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  root: TreeNode | null;

  constructor(root: TreeNode | null = null) {
    this.root = root;
  }

  preOrderTraversal(): number[] {
    // root -> left -> right
    const ans: number[] = [];
    const traversal = (current: TreeNode | null) => {
      if (!current) return;
      ans.push(current.value);
      traversal(current.left);
      traversal(current.right);
    };
    traversal(this.root);
    return ans;
  }

  inOrderTraversal(): number[] {
    // left -> root -> right
    const ans: number[] = [];
    const traverse = (current: TreeNode | null) => {
      if (!current) return;
      traverse(current.left);
      ans.push(current.value);
      traverse(current.right);
    };
    traverse(this.root);
    return ans;
  }

  postOrderTraversal(): number[] {
    // left -> right -> root
    const ans: number[] = [];
    const traverse = (current: TreeNode | null) => {
      if (!current) return;
      traverse(current.left);
      traverse(current.right);
      ans.push(current.value);
    };
    traverse(this.root);
    return ans;
  }
}

// Build the tree from tree.js:
//        1
//      /   \
//     2     3
//    / \   / \
//   4  5  6  7
const root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7)),
);

const tree = new BinaryTree(root);

type TraversalType = "preorder" | "inorder" | "postorder";

export default function Trees() {
  const [traversalType, setTraversalType] = useState<TraversalType>("preorder");
  const [traversalSequence, setTraversalSequence] = useState<number[]>([]);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    updateTraversalSequence();
  }, [traversalType]);

  const updateTraversalSequence = () => {
    let sequence: number[] = [];
    switch (traversalType) {
      case "preorder":
        sequence = tree.preOrderTraversal();
        break;
      case "inorder":
        sequence = tree.inOrderTraversal();
        break;
      case "postorder":
        sequence = tree.postOrderTraversal();
        break;
    }
    setTraversalSequence(sequence);
    setCurrentNode(null);
  };

  const animateTraversal = () => {
    setIsAnimating(true);
    setCurrentNode(null);
    let sequence: number[] = [];
    
    switch (traversalType) {
      case "preorder":
        sequence = tree.preOrderTraversal();
        break;
      case "inorder":
        sequence = tree.inOrderTraversal();
        break;
      case "postorder":
        sequence = tree.postOrderTraversal();
        break;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < sequence.length) {
        setCurrentNode(sequence[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setTimeout(() => setCurrentNode(null), 500);
      }
    }, 800);
  };

  const getTraversalName = () => {
    switch (traversalType) {
      case "preorder":
        return "Pre-Order";
      case "inorder":
        return "In-Order";
      case "postorder":
        return "Post-Order";
    }
  };

  const getTraversalExplanation = () => {
    switch (traversalType) {
      case "preorder":
        return "Pre-order traversal visits nodes in the order: Root → Left → Right";
      case "inorder":
        return "In-order traversal visits nodes in the order: Left → Root → Right";
      case "postorder":
        return "Post-order traversal visits nodes in the order: Left → Right → Root";
    }
  };

  const TreeNodeComponent = ({
    node,
    level = 0,
  }: {
    node: TreeNode | null;
    level?: number;
  }) => {
    if (!node) return null;

    const isHighlighted = currentNode === node.value;

    return (
      <div className="tree-node-wrapper">
        <div className={`tree-node ${isHighlighted ? "highlighted" : ""}`}>
          {node.value}
        </div>
        {(node.left || node.right) && (
          <div className="tree-children">
            {node.left && (
              <div className="tree-child">
                <div className="tree-line"></div>
                <TreeNodeComponent node={node.left} level={level + 1} />
              </div>
            )}
            {node.right && (
              <div className="tree-child">
                <div className="tree-line"></div>
                <TreeNodeComponent node={node.right} level={level + 1} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="trees-container">
      <h1>Binary Tree Traversal Visualizations</h1>

      <div className="traversal-tabs">
        <button
          className={`tab-button ${traversalType === "preorder" ? "active" : ""}`}
          onClick={() => setTraversalType("preorder")}
          disabled={isAnimating}
        >
          Pre-Order
        </button>
        <button
          className={`tab-button ${traversalType === "inorder" ? "active" : ""}`}
          onClick={() => setTraversalType("inorder")}
          disabled={isAnimating}
        >
          In-Order
        </button>
        <button
          className={`tab-button ${traversalType === "postorder" ? "active" : ""}`}
          onClick={() => setTraversalType("postorder")}
          disabled={isAnimating}
        >
          Post-Order
        </button>
      </div>

      <div className="tree-visualization">
        <div className="tree-root">
          <TreeNodeComponent node={tree.root} />
        </div>
      </div>

      <div className="traversal-info">
        <button
          onClick={animateTraversal}
          disabled={isAnimating}
          className="animate-button"
        >
          {isAnimating ? "Animating..." : `Animate ${getTraversalName()} Traversal`}
        </button>

        <div className="traversal-sequence">
          <h3>{getTraversalName()} Traversal Sequence:</h3>
          <div className="sequence-display">
            {traversalSequence.map((value, index) => (
              <span
                key={index}
                className={`sequence-item ${
                  currentNode === value ? "current" : ""
                }`}
              >
                {value}
                {index < traversalSequence.length - 1 && " → "}
              </span>
            ))}
          </div>
          <p className="traversal-explanation">
            {getTraversalExplanation()}
          </p>
        </div>
      </div>
    </div>
  );
}
