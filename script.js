let sudokuEx = [
	["", "", 4, 9, "", "", "", "", 3],
	["", 5, "", 7, 3, 4, "", 2, 1],
	["", "", "", 6, "", "", "", 4, 9],
	["", 3, 5, "", 9, "", "", 7, 6],
	["", 9, "", "", "", "", "", 1, ""],
	[4, 8, "", "", 3, "", 9, 2, ""],
	[3, 1, "", "", "", 9, "", "", ""],
	[9, 7, "", 1, 8, 2, "", 6, ""],
	[2, "", "", "", "", 3, 1, "", ""],
];

let sudokuExSolution = [
	[2, 6, 4, 9, 8, 1, 7, 5, 3],
	[8, 5, 9, 7, 3, 4, 6, 2, 1],
	[3, 1, 7, 6, 5, 2, 8, 4, 9],
	[1, 3, 5, 8, 9, 2, 4, 7, 6],
	[2, 9, 7, 5, 4, 6, 3, 1, 8],
	[4, 8, 6, 7, 3, 1, 9, 2, 5],
	[3, 1, 8, 6, 4, 9, 5, 2, 7],
	[9, 7, 5, 1, 8, 2, 4, 6, 3],
	[2, 6, 4, 5, 7, 3, 1, 9, 8],
];

const parts = document.querySelectorAll(".part");
const spans = document.querySelectorAll("span");
const sudokuContainer = document.querySelector(".sudokuContainer");

const addSukoku = function (arr) {
	let tempArr = [...arr].flat();
	console.log(tempArr);

	tempArr.map((el, i) => {
		let input = spans[i].querySelector("input");
		input.value = el;
		if (!!el) {
			input.disabled = true;
		}
	});
};

(function () {
	addSukoku(sudokuEx);
})();

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

	if (value === sudokuExSolution[parent2 - 1][parent1 - 1]) {
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

let notes = ['...to start new game - click "NEW"...', "...good luck..."];

(function () {
	addSukoku(sudokuEx);
})();
