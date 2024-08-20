import { generateArr } from "./randomNumArr.js";
import { Tree, prettyPrint } from "./tree.js";
import Node from "./node.js";

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
const arr = generateArr(7);

const bst = Tree(arr);

const root = bst.returnRoot();

prettyPrint(root);

// Confirm that the tree is balanced by calling isBalanced.
console.log("Is balanced:", bst.isBalanced(root));

// Print out all elements in level, pre, post, and in order.
function print(x) {
	return console.log(x.data);
}

//  Level Order
console.log("Level Order:");
console.log(bst.levelOrder(root, print));
//  Pre Order
console.log("Pre Order");
console.log(bst.preOrder(root, print));
//  In Order
console.log("In Order:", bst.inOrder(root));
// Post Order
console.log("Post Order");
console.log(bst.postOrder(root, print));

// Unbalance the tree by adding several numbers > 100.
root.right.right.right = Node(101);
root.right.right.right.right = Node(102);
root.right.right.right.right.right = Node(103);

// Confirm that the tree is unbalanced by calling isBalanced.
console.log("Is balanced:", bst.isBalanced(root));

// Balance the tree by calling rebalance.
const balancedRoot = bst.rebalance(root);

// Confirm that the tree is balanced by calling isBalanced.
console.log(bst.isBalanced(balancedRoot));

// Print out all elements in level, pre, post, and in order.
prettyPrint(balancedRoot);
console.log("Level Order:");
console.log(bst.levelOrder(balancedRoot, print));
//  Pre Order
console.log("Pre Order");
console.log(bst.preOrder(balancedRoot, print));
//  In Order
console.log("In Order:", bst.inOrder(balancedRoot));
// Post Order
console.log("Post Order");
console.log(bst.postOrder(balancedRoot, print));
