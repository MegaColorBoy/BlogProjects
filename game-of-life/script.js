var fieldSize = 500;
var numberOfCellsInRow = 100;
var cellSize = fieldSize / numberOfCellsInRow;
var cellColor = "#fff";
var fps = 10;

function createRandomGrid()
{
	var grid = new Array(numberOfCellsInRow);
	for(var i=0; i<grid.length; i++)
	{
		//Column
		grid[i] = new Array(numberOfCellsInRow);
		for(var j=0; j<grid.length; j++)
		{
			grid[i][j] = Math.floor(Math.random() * 2);
		}
	}
	return grid;
}

function drawGridCells(ctx, grid)
{
	ctx.strokeStyle = cellColor;

	for(var i=0; i<grid.length; i++)
	{
		for(var j=0; j<grid.length; j++)
		{
			var value = grid[i][j];
			if(value)
			{
				switch(i%3)
				{
					// case 0:
					// 	ctx.fillStyle = "#ced1cc";
					// 	break;
					case 1:
						ctx.fillStyle = "#565a5c";
						break;
					// case 2:
					// 	ctx.fillStyle = "#484848";
					// 	break;
				}
				ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);	
			}
			// ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);	
		}
	}
}

function gridOfNextGeneration(grid)
{
	var newGrid = new Array(grid.length);
	for(var i=0; i<newGrid.length; i++)
	{
		newGrid[i] = new Array(grid.length);
		for(var j=0; j<newGrid.length; j++)
		{
			var value = grid[i][j];
			var neighbours = countNeighbours(grid, i, j);

			//Any dead cell with 3 neighbours, becomes a live cell
			if(!value && neighbours == 3)
			{
				newGrid[i][j] = 1;
			}
			//Any live cell with less than 2 or more than 3 neighbours, dies
			else if(value == 1 && (neighbours < 2 || neighbours > 3))
			{
				newGrid[i][j] = 0;
			}
			//Otherwise, the cell lives
			else
			{
				newGrid[i][j] = value;
			}
		}
	}
	return newGrid;
}

function countNeighbours(grid, x, y)
{
	var sum = 0;
	var rows = grid.length;
	var cols = grid[0].length;

	for(var i=-1; i<2; i++)
	{
		for(var j=-1; j<2; j++)
		{
			var row = (x + i + rows) % rows;
			var col = (y + j + cols) % cols;
			sum += grid[row][col];
		}
	}

	sum -= grid[x][y];
	return sum;
}

function generateCells(ctx, grid)
{
	ctx.clearRect(0, 0, fieldSize, fieldSize);
	drawGridCells(ctx, grid);
	var nextGeneration = gridOfNextGeneration(grid);
	setTimeout(() => {
		requestAnimationFrame(() => generateCells(ctx, nextGeneration));
	}, 1000 / fps);
}

window.onload = function()
{
	//Grid
	var canvas = document.getElementById("game-of-life");
	var ctx = canvas.getContext('2d');
	var grid = createRandomGrid();
	generateCells(ctx, grid);
}