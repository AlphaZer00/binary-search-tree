import Node from "./node.js";

const Tree = (arr) => {
	//Process array so that elements are in ascending order with duplicates removed
	const sortedArr = sortAndRemoveDuplicates(arr);

	const returnRoot = () => {
		let root = buildTree(sortedArr);
		return root;
	};

	const insert = (root, data) => {
		if (root === null) {
			return Node(data);
		}

		if (root.data === data) {
			return root;
		}

		if (data < root.data) {
			root.left = insert(root.left, data);
		} else if (data > root.data) {
			root.right = insert(root.right, data);
		}

		return root;
	};

	const deleteItem = (root, data) => {
		//Base case
		if (root === null) {
			return root;
		}

		//If key is in a subtree
		if (root.data > data) {
			root.left = deleteItem(root.left, data);
		} else if (root.data < data) {
			root.right = deleteItem(root.right, data);
		} else {
			//When root is equivalent to data

			//When root has no children or only right child
			if (root.left === null) return root.right;

			//When root has only left child
			if (root.right === null) return root.left;

			//When root has left and right child
			let successor = getSuccessor(root);
			root.data = successor.data;
			root.right = deleteItem(root.right, successor.data);
		}

		function getSuccessor(current) {
			current = current.right;
			while (current !== null && current.left !== null) {
				current = current.left;
			}
			return current;
		}

		return root;
	};

	const find = (root, value) => {
		if (root.data === value || root === null) {
			prettyPrint(root);
			return root;
		}
		if (value > root.data) {
			return find(root.right, value);
		} else if (value < root.data) {
			return find(root.left, value);
		}
	};

	const levelOrder = (root, callback) => {
		if (!callback) {
			throw new Error("Callback function is required!");
		}

		if (root === null) return root;

		const queue = [];

		queue.push(root);

		while (queue[0]) {
			let current = queue[0];
			callback(current);
			if (current.left) {
				queue.push(current.left);
			}
			if (current.right) {
				queue.push(current.right);
			}
			queue.shift();
		}
	};

	const inOrder = (root, arr = []) => {
		if (root === null) return;

		inOrder(root.left, arr);
		arr.push(root.data);
		inOrder(root.right, arr);

		return arr;
	};

	const preOrder = (root, callback) => {
		if (!callback) {
			throw new Error("Callback function is required!");
		}

		if (root === null) return;

		callback(root);
		preOrder(root.left, callback);
		preOrder(root.right, callback);
	};

	const postOrder = (root, callback) => {
		if (!callback) {
			throw new Error("Callback function is required!");
		}

		if (root === null) return;

		postOrder(root.left, callback);
		postOrder(root.right, callback);
		callback(root);
	};

	const height = (node) => {
		if (node === null) return -1;

		let leftHeight = height(node.left);
		let rightHeight = height(node.right);

		if (leftHeight > rightHeight) {
			return leftHeight + 1;
		} else {
			return rightHeight + 1;
		}
	};

	const getDepth = (node, root, depth = 0) => {
		if (root === null || node === null) return;

		if (node === root) return `Depth of node is ${depth}`;

		if (node.data < root.data) {
			return getDepth(node, root.left, (depth += 1));
		} else if (node.data > root.data) {
			return getDepth(node, root.right, (depth += 1));
		}
	};

	const isBalanced = (root) => {
		if (root === null) return true;

		let leftHeight = height(root.left);
		let rightHeight = height(root.right);

		if (Math.abs(leftHeight - rightHeight) <= 1) return true;

		return false;
	};

	const rebalance = (root) => {
		const myArr = inOrder(root);
		const result = buildTree(myArr);
		prettyPrint(result);
		return result;
	};

	return {
		returnRoot,
		insert,
		deleteItem,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		height,
		getDepth,
		isBalanced,
		rebalance,
	};
};

function buildTree(arr, start = 0, end = arr.length - 1) {
	//Exit Case
	if (start > end) return null;

	const mid = parseInt((start + end) / 2);
	const root = Node(arr[mid]);

	root.left = buildTree(arr, start, mid - 1);
	root.right = buildTree(arr, mid + 1, end);

	return root;
}

function sortAndRemoveDuplicates(arr) {
	return [...new Set(arr.sort((a, b) => a - b))];
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

const inputArr = [1, 2, 3, 4, 6];

const test = Tree(inputArr);

const myRoot = test.returnRoot();
