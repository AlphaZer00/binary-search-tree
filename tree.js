import Node from "./node.js";

const Tree = (arr) => {
	//Process array so that elements are in ascending order with duplicates removed
	const sortedArr = sortAndRemoveDuplicates(arr);

	const returnRoot = () => {
		let root = buildTree(sortedArr);
		return root;
	};

	return { returnRoot };
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

const inputArr = [1, 2, 2, 3, 5, 6, 5, 8, 8, 7];
const test = Tree(inputArr);
const output = test.returnRoot();
prettyPrint(output);
