function generateArr(length) {
	const arr = [];

	for (let i = 0; i < length; i++) {
		arr.push(Math.floor(Math.random() * 100));
	}
	console.log(arr);
	return arr;
}

export { generateArr };
