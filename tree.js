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

	return { returnRoot, insert };
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

// const inputArr = [2, 3, 4];

// const test = Tree(inputArr);

// const output = test.returnRoot();

// test.insert(output, 1);
// prettyPrint(output);
