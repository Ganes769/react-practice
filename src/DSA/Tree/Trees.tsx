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

  hasPathSum(totalSum: number): boolean {
    let ans = false;
    const traverse = (curr: TreeNode | null, currSum: number) => {
      if (!curr) return;
      const newSum = currSum + curr.value;
      if (!curr.left && !curr.right) {
        if (newSum === totalSum) {
          ans = true;
          return;
        }
      }
      if (curr.left) traverse(curr.left, newSum);
      if (curr.right) traverse(curr.right, newSum);
    };
    traverse(this.root, 0);
    return ans;
  }

  getPathSum(totalSum: number): number[] | null {
    let path: number[] | null = null;
    const traverse = (curr: TreeNode | null, currSum: number, currentPath: number[]) => {
      if (!curr || path !== null) return;
      const newSum = currSum + curr.value;
      const newPath = [...currentPath, curr.value];
      
      if (!curr.left && !curr.right) {
        if (newSum === totalSum) {
          path = newPath;
          return;
        }
      }
      if (curr.left) traverse(curr.left, newSum, newPath);
      if (curr.right) traverse(curr.right, newSum, newPath);
    };
    traverse(this.root, 0, []);
    return path;
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
  const [pathSumInput, setPathSumInput] = useState<string>("");
  const [pathSumResult, setPathSumResult] = useState<boolean | null>(null);
  const [pathSumPath, setPathSumPath] = useState<number[] | null>(null);

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

  const checkPathSum = (sum: number) => {
    const result = tree.hasPathSum(sum);
    const path = tree.getPathSum(sum);
    setPathSumResult(result);
    setPathSumPath(path);
  };

  const handlePathSumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sum = parseInt(pathSumInput);
    if (!isNaN(sum)) {
      checkPathSum(sum);
    }
  };

  const testPathSum = (sum: number) => {
    setPathSumInput(sum.toString());
    checkPathSum(sum);
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
    const isPathNode = pathSumPath?.includes(node.value) ?? false;

    return (
      <div className="tree-node-wrapper">
        <div className={`tree-node ${isHighlighted ? "highlighted" : ""} ${isPathNode ? "path-node" : ""}`}>
          {node.value}
        </div>
        {(node.left || node.right) && (
          <div className="tree-children">
            {node.left && (
              <div className="tree-child">
                <div className={`tree-line ${isPathNode && pathSumPath?.includes(node.left.value) ? "path-line" : ""}`}></div>
                <TreeNodeComponent node={node.left} level={level + 1} />
              </div>
            )}
            {node.right && (
              <div className="tree-child">
                <div className={`tree-line ${isPathNode && pathSumPath?.includes(node.right.value) ? "path-line" : ""}`}></div>
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

      <div className="path-sum-section">
        <h2>Path Sum Checker</h2>
        <p className="path-sum-description">
          Check if there exists a root-to-leaf path where the sum of node values equals the target sum.
        </p>
        
        <form onSubmit={handlePathSumSubmit} className="path-sum-form">
          <div className="input-group">
            <input
              type="number"
              value={pathSumInput}
              onChange={(e) => setPathSumInput(e.target.value)}
              placeholder="Enter target sum"
              className="path-sum-input"
            />
            <button type="submit" className="check-button">
              Check Path Sum
            </button>
          </div>
        </form>

        <div className="test-cases">
          <h3>Quick Test Cases:</h3>
          <div className="test-buttons">
            <button 
              onClick={() => testPathSum(7)} 
              className="test-button true-case"
              title="Path: 1→2→4 = 7"
            >
              Test: 7 (TRUE)
            </button>
            <button 
              onClick={() => testPathSum(10)} 
              className="test-button true-case"
              title="Path: 1→3→6 = 10"
            >
              Test: 10 (TRUE)
            </button>
            <button 
              onClick={() => testPathSum(11)} 
              className="test-button true-case"
              title="Path: 1→3→7 = 11"
            >
              Test: 11 (TRUE)
            </button>
            <button 
              onClick={() => testPathSum(8)} 
              className="test-button true-case"
              title="Path: 1→2→5 = 8"
            >
              Test: 8 (TRUE)
            </button>
            <button 
              onClick={() => testPathSum(9)} 
              className="test-button false-case"
            >
              Test: 9 (FALSE)
            </button>
            <button 
              onClick={() => testPathSum(12)} 
              className="test-button false-case"
            >
              Test: 12 (FALSE)
            </button>
          </div>
        </div>

        {pathSumResult !== null && (
          <div className={`path-sum-result ${pathSumResult ? "result-true" : "result-false"}`}>
            <h3>
              {pathSumResult ? "✓ Path Found!" : "✗ No Path Found"}
            </h3>
            {pathSumResult && pathSumPath && (
              <div className="path-display">
                <p>Path: {pathSumPath.join(" → ")}</p>
                <p>Sum: {pathSumPath.reduce((a, b) => a + b, 0)}</p>
              </div>
            )}
            {!pathSumResult && (
              <p>No root-to-leaf path exists with sum {pathSumInput}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
