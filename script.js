const parts = document.querySelectorAll(".part");
const spans = document.querySelectorAll("span");
const inputs = document.querySelectorAll("span > input");
const sudokuContainer = document.querySelector(".sudokuContainer");
const notes = document.querySelectorAll(".notes");
const menu = document.querySelector(".menu");
const newGame = document.querySelector(".new-game");
const borders = document.querySelectorAll(".border");
let activeGameSet = false;
let sudokus, sudokusLength, sudokuSolution;

const addSukoku = function (arr) {
	let tempArr = [...arr].flat();
	console.log(tempArr);
	console.log(spans);
	tempArr.map((el, i) => {
		let input = spans[i].querySelector("input");
		input.value = el;
		if (!!el) {
			input.disabled = true;
		}
	});
};

const removeBackColor = function (elem, state) {
	elem.style.backgroundColor = "white";
	if (!state) {
		setTimeout(() => {
			elem.value = "";
		}, 100);
	}
	elem.style.color = "blueviolet";
};

sudokuContainer.addEventListener("change", (e) => {
	const elem = e.target;
	const parent1 = +elem.parentNode.dataset.number;
	const parent2 = +elem.parentNode.parentNode.dataset.number;
	const value = +elem.value;
	let state;

	elem.style.transition = "0.5s all";
	elem.style.color = "#FFFFFF";

	if (value === sudokuSolution[parent2 - 1][parent1 - 1]) {
		elem.style.backgroundColor = "#59f0aa";
		elem.disabled = true;
		state = true;
	} else {
		elem.style.backgroundColor = "#ff8585";
		elem.blur();
		state = false;
	}
	setTimeout(() => {
		removeBackColor(elem, state);
	}, 2000);
});

const instructions = [
	'...to start new game - click "NEW" and good luck...',
	"...good luck...",
];

const displayNotes = function () {
	setTimeout(() => {
		notes[0].classList.add("hidden");
		notes[1].classList.remove("hidden");
		notes[1].classList.add("fadeInOut");
		setTimeout(() => {
			notes[1].classList.add("hidden");
			notes[2].classList.remove("hidden");
			notes[2].classList.add("fadeInOut");
			setTimeout(() => {
				notes.forEach((note) => {
					note.style.visibility = "hidden";
				});
				menu.classList.add("moveUp");
			}, 4000);
		}, 4000);
	}, 3000);
};

newGame.addEventListener("click", () => {
	if (!activeGameSet) {
		borders.forEach((el) => {
			el.classList.add("active");
		});
		activeGameSet = true;
		setTimeout(() => {
			inputs.forEach((inp) => {
				inp.style.animation = "fadeIn 1s";
			});
			showNewSudoku();
		}, 2000);
	} else {
		showNewSudoku();
	}
});

let shuffle = function (array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

let getRandomNumber = function (low, up) {
	return Math.floor(Math.random() * (up - low)) + low;
};

let removeRandomElems = function (matr) {
	console.log(matr);
	let copy = JSON.parse(JSON.stringify(matr));
	console.log(copy);

	copy.forEach((row) => {
		let deleteNums = getRandomNumber(4, 9);
		let positions = [...Array(9).keys()];

		for (let i = 0; i < 5; i++) {
			shuffle(positions);
		}

		for (let i = 0; i < deleteNums; i++) {
			let position = positions[i];
			row.splice(position, 1, "");
		}
	});
	return copy;
};

const getSudokusFromJson = async function () {
	return new Promise((resolve, reject) => {
		fetch("sudokus.json")
			.then((res) => res.json())
			.then((res) => {
				sudokus = res;
				sudokusLength = Object.keys(res).length;
				resolve("wow");
			});
	});
};

const showNewSudoku = function () {
	let randomSudokuNum = getRandomNumber(0, sudokusLength - 1);
	sudokuSolution = sudokus[randomSudokuNum];

	let sudokuModified = removeRandomElems(sudokuSolution);
	addSukoku(sudokuModified);
};

(async function () {
	await getSudokusFromJson().then(() => {
		// showNewSudoku();
	});
})();

displayNotes();
