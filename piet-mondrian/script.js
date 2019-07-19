//Script for the Piet Mondrian art
//This is based on the Composition with Red Blue and Yellow artwork
var canvas = document.getElementById("pm_canvas");
var ctx = canvas.getContext('2d');

var size = 500;
var dpr = window.devicePixelRatio;

var step = size/6;

canvas.width = size * dpr;
canvas.height = size * dpr;
ctx.scale(dpr, dpr);
ctx.lineWidth = 5;

//Create an array of squares
var squares = [{
	x: 0,
	y: 0,
	width: size,
	height: size
}];

var white = "#F2F5F1";
var colors = ["#D40920", "#1356A2", "#F7D842", "#000000"];

function draw()
{
	for(var i=0; i<colors.length; i++)
	{
		//Add random color to random square
		squares[Math.floor(Math.random() * squares.length)].color = colors[i];
	}

	for(var i=0; i<squares.length; i++)
	{
		ctx.beginPath();
		ctx.rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);

		if(squares[i].color)
		{
			ctx.fillStyle = squares[i].color;
		}
		else
		{
			ctx.fillStyle = white;
		}
		ctx.fill();
		ctx.stroke();
	}
}

function splitSquares(coords)
{
	// console.log(coords);

	//extract x and y coords
	const { x, y } = coords;

	for(var i=squares.length-1; i>=0; i--)
	{
		const square = squares[i];

		/*
			If it's a X coordinate
		*/
		if(x && x > square.x && x < square.x + square.width)
		{
			if(Math.random() > 0.5)
			{
				squares.splice(i, 1);
				splitOnX(square, x);
			}
		}

		/*
			If it's a Y coordinate
		*/
		if(y && y > square.y && y < square.y + square.height)
		{
			if(Math.random() > 0.5)
			{
				squares.splice(i, 1);
				splitOnY(square, y);
			}
		}
	}
}

//Split a square into 2 squares based on X coords
function splitOnX(square, splitAt)
{
	var squareA = {
		x: square.x,
		y: square.y,
		width: square.width - (square.width - splitAt + square.x),
		height: square.height
	};

	var squareB = {
		x: splitAt,
		y: square.y,
		width: square.width - splitAt + square.x,
		height: square.height
	};

	squares.push(squareA);
	squares.push(squareB);
}

//Split a square into 2 squares based on Y coords
function splitOnY(square, splitAt)
{
	var squareA = {
		x: square.x,
		y: square.y,
		width: square.width,
		height: square.height - (square.height - splitAt + square.y)
	};

	var squareB = {
		x: square.x,
		y: splitAt,
		width: square.width,
		height: square.height - splitAt + square.y
	};

	squares.push(squareA);
	squares.push(squareB);
}

// splitSquares({x: 150});
// splitSquares({y: 150});

for(var i=0; i<size; i+=step)
{
	splitSquares({x: i});
	splitSquares({y: i});	
}

draw();