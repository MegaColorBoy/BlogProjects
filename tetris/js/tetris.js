var cols = 10;
var rows = 20;

var board = [];

//current shape;
var current

//X and Y position of the current shape
var currentX;
var currentY;

var lose;

//Shapes
var shapes = [

//I
[1,1,1,1,
 0,0,0,0],

//L
[1,1,1,0,
 1,0,0,0],

//J
[1,1,1,0,
 0,0,1,0],

//O
[1,1,0,0,
 1,1,0,0],

//Z
[1,1,0,0,
 0,1,1,0],

//S
[0,1,1,0,
 1,1,0,0],

//T
[0,1,0,0,
 1,1,1,0]

];

//Colors for each shape
var colors = 
[
	"#F44336", "#00BCD4", "#E91E63", "#FF9800", "#FFEB3B", "#8BC34A", "#03A9F4"
];

var game_loop;

//Init 2D array
function init()
{
	for(var y=0; y<rows; y++)
	{
		board[y] = [];
		for(var x=0; x<cols; x++)
		{
			board[y][x] = 0;
		}
	}
}

//Generate new random shape
function newShape()
{
	current = [];

	var rand = Math.floor(Math.random() * shapes.length);
	var shape = shapes[rand];

	for(var y=0; y<4; y++)
	{
		current[y] = [];
		for(var x=0; x<4; x++)
		{
			//convert 2D index to 1D index
			var i = 4 * y + x;
			if(shape[i])
			{
				current[y][x] = rand + 1;
			}
			else
			{
				current[y][x] = 0;
			}
		}
	}

	currentX = 5;
	currentY = 0;
}
//Timer to move
function tick()
{
	//Down
	if(isValid(0,1))
	{
		currentY++;
	}
	else
	{
		freeze();
		clearLines();
		if(lose)
		{
			newGame();
			return false;
		}
		newShape();
	}
}

function freeze()
{
	for(var y=0; y<4; y++)
	{
		for(var x=0; x<4; x++)
		{
			if(current[y][x])
			{
				board[y+currentY][x+currentX] = current[y][x];
			}
		}
	}
}

function clearLines()
{
	//Bottom up approach
	for(var y = rows - 1; y>=0; y--)
	{
		var isComplete = true;
		for(var x=0; x < cols; x++)
		{
			//if there's any empty cell in the row
			if(board[y][x] == 0)
			{
				//Then the row isn't complete
				isComplete = false;
				break;
			}
		}

		//This code is to remove the current completed line,
		//and replace it with the line above it.
		if(isComplete)
		{
			for(var i=y; i>0; i--)
			{
				for(var j=0; j<cols; j++)
				{
					board[i][j] = board[i-1][j];
				}
			}
			y++;
		}
	}
}

//Rotate the current moving shape
function rotate(current)
{
	var newCurrent = [];
	for(var y=0; y<4; y++)
	{
		newCurrent[y] = [];
		for(var x=0; x<4; x++)
		{
			newCurrent[y][x] = current[3-x][y];
		}
	}
	return newCurrent;
}

function isValid(offsetX, offsetY, newCurrent)
{
	//if offsetX is not set, set it to 0
	offsetX = offsetX || 0;
	//if offsetY is not set, set it to 0
	offsetY = offsetY || 0;

	offsetX = currentX + offsetX;
	offsetY = currentY + offsetY;

	newCurrent = newCurrent || current;

	for(var y=0; y<4; y++)
	{
		for(var x=0; x<4; x++)
		{
			if(newCurrent[y][x])
			{
				if(typeof board[y + offsetY] == 'undefined' ||
				typeof board[y + offsetY][x + offsetX] == 'undefined' ||
				board[y + offsetY][x + offsetX] ||
				x + offsetX < 0 ||
				y + offsetY >= rows ||
				x + offsetX >= cols)
				{
					if(offsetY == 1){lose = true;}
					return false;
				}
			}
		}
	}
	return true;
}

//New game
function newGame()
{
	clearInterval(game_loop);
	init();
	newShape();
	lose = false;
	game_loop = setInterval(tick, 250);
}

newGame();
