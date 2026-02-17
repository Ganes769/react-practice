class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  preOrderTraversal() {
    // root-> left-> right
    let ans = [];
    function traversal(current) {
      if (!current) return;
      ans.push(current.value);
      traversal(current.left);
      traversal(current.right);
    }
    traversal(this.root);
    console.log(ans);
    return ans;
  }
  inOrderTraversal() {
    let ans = [];
    function traverse(current) {
      if (!current) return;
      //left-> root -> right
      traverse(current.left);
      ans.push(current.value);
      traverse(current.right);
    }
    traverse(this.root);
    console.log(ans);
    return ans;
  }
  postOrderTraversal() {
    let ans = [];
    function traverse(current) {
      if (!current) return;
      traverse(current.left);
      traverse(current.right);
      ans.push(current.value);
    }
    traverse(this.root);
    console.log(ans);
    return ans;
  }
  findMaximunDepth() {
    let maxDepth = 0;
    let traverse = (curr, depth) => {
      maxDepth = Math.max(maxDepth, depth);
      curr.left && traverse(curr.left, depth + 1);
      curr.right && traverse(curr.right, depth + 1);
    };
    traverse(root, 1);
    console.log("maxiumum depth of tree is ", maxDepth);
    return maxDepth;
  }
  hasPathSum(totalSum) {
    let ans = false;
    let traverse = (curr, currSum) => {
      let newsum = currSum + curr.value;
      if (!curr.left && !curr.right) {
        if (newsum === totalSum) {
          ans = ans || true;
          return ans;
        }
      }

      curr.left && traverse(curr.left, newsum);
      curr.right && traverse(curr.right, newsum);
    };
    traverse(root, 0);
    console.log(`Tree has a sum ${totalSum} ${ans}`);
    return ans;
  }
}

// Build a 3-level tree:
//
//        1
//      /   \
//     2     3
//    / \   / \
//   4  5  6  7
//
const root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7)),
);

const tree = new BinaryTree(root);
tree.preOrderTraversal();
tree.inOrderTraversal();
tree.postOrderTraversal();
