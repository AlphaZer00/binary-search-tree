import Node from "./node.js";

const Tree = (arr) => {};

function buildTree(arr, start = 0, end = arr.length - 1) {
	//Process array so that elements are in ascending order with duplicates removed
	sortAndRemoveDuplicates(arr);

	//Exit Case
	if (start > end) return null;

	const mid = parseInt((start + end) / 2);
    const root = Node(arr[mid]);

    root.left = buildTree(arr, start, mid-1);
    root.right = buildTree(arr, mid+1, end)

    return root;
}

function sortAndRemoveDuplicates(arr) {
	return [...new Set(arr.sort((a, b) => a - b))];
}

