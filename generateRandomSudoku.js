class GenerateSudoku {
	constructor() {
		this.matrices = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
		];

		this.rows = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
		];

		this.empty = [
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", ""],
		];

		this.changable = [...this.empty];
	}

	getRandomNumber(low, up) {
		return Math.floor(Math.random() * up) + low;
	}

	getDiagonalMatrix() {
		let matr = [
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
		];
		let position;
		for (let i = 1; i <= 9; i++) {
			position = this.getRandomNumber(0, 8);
			while (!matr[position]) {
				position = this.getRandomNumber(0, 8);
			}
			matr[position] = i;
		}
		return matr;
	}
}

export default GenerateSudoku;
