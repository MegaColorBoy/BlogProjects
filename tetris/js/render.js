var canvas = document.getElementById("tetris_canvas");
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

//cell width
var cell_w = width / cols;

//cell height
var cell_h = height / rows;

//The function that draws the board and the movement of the shape, every 30ms
function render()
{
	ctx.clearRect(0,0,width,height);

	ctx.strokeStyle = "#333";

	for(var x=0; x<cols; x++)
	{
		for(var y=0; y<rows; y++)
		{
			if(board[y][x])
			{
				ctx.fillStyle = colors[board[y][x] - 1];
				drawCell(x,y);
			}
		}
	}

	ctx.fillStyle = "#ff6d6d";
	ctx.strokeStyle = "#333";
	//Draw the shape
	for(var y=0; y<4; y++)
	{
		for(var x=0; x<4; x++)
		{
			if(current[y][x])
			{
				ctx.fillStyle = colors[current[y][x] - 1];
				drawCell(currentX + x, currentY + y);
			}
		}
	}
}

//Draw a single cell
function drawCell(x,y)
{
	ctx.fillRect(cell_w * x, cell_h * y, cell_w - 1, cell_h - 1);
	ctx.strokeRect(cell_w * x, cell_h * y, cell_w - 1, cell_h - 1);
}

setInterval(render, 30);
