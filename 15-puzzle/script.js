var board = [], rows = 4, cols = 4;
var possibleMoves, zx, zy, oldzx = -1, oldzy = -1;

//Generate 2D Board
function generateBoard()
{
	for(var i=0; i<rows; i++)
	{
		board[i] = [];
	}

	for(var j=0; j<cols; j++)
	{
		for(var i=0; i<rows; i++)
		{
			board[j][i] = (i + j * 4) + 1;
		}
	}

	//position of the empty cell in the grid i.e. 3,3
	zx = zy = 3;
	board[zx][zy] = 16;
}

//Generate the cells
function generateCells()
{
	var grid = document.createElement("div");
	grid.className += "board";

	document.body.appendChild(grid);

	for(var j=0; j<4; j++)
	{
		for(var i=0; i<4; i++)
		{
			var cell = document.createElement("div");
			cell.className += "cell";
			cell.id = "cell_" + (i + j * 4);
			cell.row = i;
			cell.col = j;
			cell.addEventListener("click", cellEventHandle, false);
			cell.appendChild(document.createTextNode(""));
			grid.appendChild(cell);
		}
	}
}

/*
	Determine the possible number of moves
	based on the empty cell's coordinates.
*/
function genPossibleMoves()
{
	possibleMoves = [];
	var ii, jj;
	
	/*
		Just for reference:
		The empty cell can be moved in the following x,y coords:
		-1,0, 0,-1, 1,0, 0,1
	*/
	var xCoords = [-1, 0, 1, 0];
	var yCoords = [0, -1, 0, 1];

	for(var i=0; i<4; i++)
	{
		ii = zx + xCoords[i];
		jj = zy + yCoords[i];

		//If it's out of bounds, skip it
		if(ii < 0 || jj < 0 || ii > 3 || jj > 3)
		{
			continue;
		}

		possibleMoves.push({x: ii, y: jj});
	}
}

function updateCells()
{
	for(var j=0; j<cols; j++)
	{
		for(var i=0; i<rows; i++)
		{
			var cell_id = "cell_" + (i + j * 4);
			var cell = document.getElementById(cell_id);
			var val = board[i][j];

			if(val < 16)
			{
				cell.innerHTML = ("" + val);
				if(val % 2 == 0)
				{
					cell.className = "cell dark";				
				}
				else
				{
					cell.className = "cell light";
				}
			}
			else
			{
				cell.innerHTML = "";
				cell.className = "empty";
			}
		}
	}
}

//Event handler for each cell
function cellEventHandle(e)
{
	genPossibleMoves();

	//Current coords of the cell
	var r = e.target.row;
	var c = e.target.col;
	var pos = -1;
	var isPossible = false;
	// console.log(r + "," + c);

	/*
		Check if the current cell is 
		one of the possible moves
	*/
	for(var i=0; i<possibleMoves.length; i++)
	{
		if(possibleMoves[i].x == r && possibleMoves[i].y == c)
		{
			isPossible = true;
			pos = i;
			break;
		}
	}

	if(isPossible)
	{
		var temp = possibleMoves[pos];

		//Swap position of the empty cell
		board[zx][zy] = board[temp.x][temp.y];
		//Update the coordinates of the empty cell
		zx = temp.x;
		zy = temp.y;
		board[zx][zy] = 16;
		updateCells();

		//Check if the game is over
		if(is_game_over())
		{
			setTimeout(function(){
				alert("Congrats!");
			}, 2);
		}
	}

}

//Check if the game is over
function is_game_over()
{
	var currentVal = 0;
	for(var j=0; j<cols; j++)
	{
		for(var i=0; i<rows; i++)
		{
			if(board[i][j] < currentVal)
			{
				return false;
			}

			currentVal = board[i][j];
		}
	}
	return true;
}

//Shuffle the board
function shuffleBoard()
{
	var shuffleLimit = 0;
	var temp;

	do
	{
		genPossibleMoves();

		while(true)
		{
			// Pick a random cell of possible moves
			temp = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
			if (temp.x != oldzx || temp.y != oldzy)
			{
				break;
			}
		}

		oldzx = zx;
		oldzy = zy;

		board[zx][zy] = board[temp.x][temp.y];
		zx = temp.x;
		zy = temp.y;
		board[zx][zy] = 16;

	}while(++shuffleLimit < 200);
}

//REstart the game
function restart()
{
	shuffleBoard();
	updateCells();
}

//Start the game
function start()
{
	generateBoard();
	generateCells();
	restart();
}