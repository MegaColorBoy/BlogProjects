//Variables
const grid = document.getElementById("minegrid");
const size = 12;
const testMode = false;
let allowClick;

//Generate minesweeper grid
const generateGrid = () => {
	allowClick = true;
	grid.innerHTML = "";
	for(let i=0; i<size; i++) {
		let row = grid.insertRow(i);
		for(let j=0; j<size; j++) {
			let cell = row.insertCell(j);
			cell.onclick = function(){clickCell(this);}
			let mine = document.createAttribute("data-mine");
			mine.value = "false";
			cell.setAttributeNode(mine);
		}
	}
	setMines();
}

//Click a cell
const clickCell = (cell) => {
	if(allowClick != false) {
		//If it's a mine, game over
		if(cell.getAttribute("data-mine") === "true") {
			alert("game over");
			revealMines();
			allowClick = false;
		}
		//If it's not a mine, reveal the mines
		else {
			//Mark it as "clicked"
			cell.className = "clicked";
			scanForMines(cell);
			checkGameStatus();
		}		
	}
}

//Scan for mines that are adjacent to the cell
const scanForMines = (cell) => {
	let rowPos = cell.parentNode.rowIndex;
	let colPos = cell.cellIndex;
	let mineCount = 0;

	for(let i=Math.max(rowPos-1, 0); i<Math.min(rowPos+1, size-1); i++) {
		for(let j=Math.max(colPos-1, 0); j<Math.min(colPos+1, size-1); j++) {
			let adjacentCell = grid.rows[i].cells[j];
			if(adjacentCell.getAttribute("data-mine") == "true") {
				mineCount++;
			}
		}
	}

	cell.innerHTML = mineCount > 0 ? mineCount : " ";

	//If zero mines, then reveal all adjacent cells
	if(mineCount == 0) {
		for(let i=Math.max(rowPos-1, 0); i<Math.min(rowPos+1, size-1); i++) {
			for(let j=Math.max(colPos-1, 0); j<Math.min(colPos+1, size-1); j++) {
				let adjacentCell = grid.rows[i].cells[j];
				if(adjacentCell.innerHTML == "") {
					clickCell(adjacentCell);
				}
			}
		}
	}
}

//Set mines
const setMines = () => {
	for(let i=0; i<size*2; i++) {
		let r = Math.floor(Math.random() * size);
		let c = Math.floor(Math.random() * size);
		let cell = grid.rows[r].cells[c];
		cell.setAttribute("data-mine", "true");
		if(testMode){cell.innerHTML = "&#x1f4a3;";}
	}
}

//Reveal mines
const revealMines = () => {
	for(let i=0; i<size; i++) {
		for(let j=0; j<size; j++) {
			let cell = grid.rows[i].cells[j];
			if(cell.getAttribute("data-mine") === "true") {
				cell.className = "mine";
				cell.innerHTML = "&#x1f4a3;";
			}
		}
	}
}

//Check game status
const checkGameStatus = () => {
	let levelComplete = true;
	for(let i=0; i<size; i++) {
		for (let j=0; j<size; j++) {
			var cell = grid.rows[i].cells[j];
			if((cell.getAttribute("data-mine") == "false") && (cell.innerHTML == "")) {
				levelComplete = false;
			}
		}
	}

	if(levelComplete) {
		alert("Congratulations, you won!");
		revealMines();
	}
}

generateGrid();