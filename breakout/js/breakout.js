$(document).ready(function(){
//Canvas stuff
var canvas = document.getElementById("breakout_canvas");
var height = 500;
var width = 500;
var ctx;

//coordinates of the ball
var x = 150;
var y = 200;
var dir_x = 2;
var dir_y = 4;
var ball_r = 10;

//paddle
var paddle_x;
var paddle_h;
var paddle_w;

//Keyboard paddle movement
var rightKeyDown = false;
var leftKeyDown = false;

//Mouse coords
var canvasMinX = 0;
var canvasMaxX = 0;

//Bricks
var bricks;
var rows;
var cols;
var brick_w;
var brick_h;
var brick_padding;

var game_over = false;
var is_pause = false;

init();
init_paddle();
init_mouse();
init_bricks();

//main function
function init()
{
	ctx = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;

	ctx.fillStyle = "#1B1464";
	ctx.fillRect(0,0,width,height);
	
	game_loop = setInterval(draw, 10);
}

//Restart
function restart()
{
	x = 150;
	y = 200;
	dir_x = 2;
	dir_y = 4;
	ball_r = 10;
	game_over = false;
	game_loop = setInterval(draw, 10);

	init_paddle();
	init_mouse();
	init_bricks();
}

//Pause
function pause()
{
	clearInterval(game_loop);
	allowPressKeys = false;
	is_pause = true;
}

//Resume game
function resume()
{
	game_loop = setInterval(draw, 10);
	allowPressKeys = true;
	is_pause = false;
}

//Initiate bricks
function init_bricks()
{
	rows = 10;
	cols = 5;
	brick_h = 15;
	brick_w = (width/cols) - 1;
	padding = 1;

	bricks = new Array(rows);
	for(var i=0; i<rows; i++)
	{
		bricks[i] = new Array(cols);
		for(var j=0; j<cols; j++)
		{
			bricks[i][j] = 1;
		}
	}
}

//Draw a paddle
function init_paddle()
{
	paddle_x = width / 2;
	paddle_h = 10;
	paddle_w = 100;
}

//Mouse controls
function init_mouse()
{
	canvasMinX = canvas.offsetLeft;
	canvasMaxX = canvasMinX + width;
}

//Draw a circle
function circle(x,y,r)
{
	ctx.fillStyle = "#00B8D9";
	ctx.beginPath();
	ctx.arc(x,y,r,0,Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

//Draw a rectangle
function rectangle(x,y,w,h,type)
{
	if(type == "paddle")
	{
		// ctx.fillStyle = "#828282";
		ctx.fillStyle = "#00B8D9";
	}
	else if(type == "brick")
	{
		// ctx.fillStyle = "#FF6D6D";
		ctx.fillStyle = "#00B8D9";
	}

	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function draw()
{
	var rowheight = brick_h + padding;
	var colwidth = brick_w + padding;

	clear();
	
	ctx.fillStyle = "#1B1464";
	ctx.fillRect(0,0,width,height);

	circle(x,y,ball_r);
	
	if(rightKeyDown)
	{
		paddle_x += 5;
	}
	else if(leftKeyDown)
	{
		paddle_x -= 5;
	}
	rectangle(paddle_x, height - paddle_h, paddle_w, paddle_h, "paddle");

	//Draw the bricks
	for(var i=0; i<rows; i++)
	{
		for(var j=0; j<cols; j++)
		{
			if(bricks[i][j] == 1)
			{
				var brick_x = (j * (colwidth)) + padding;
				var brick_y = (i * (rowheight)) + padding;
				rectangle(brick_x, brick_y, brick_w, brick_h, "brick");
			}
		}
	}

	var row = Math.floor(y/rowheight);
	var col = Math.floor(x/colwidth);

	//if the ball hits a brick, turn it to 0 and reverse the ball
	if(y < rows * rowheight && row >=0 && col >= 0 && bricks[row][col] == 1)
	{
		dir_y = -dir_y;
		bricks[row][col] = 0;
	}

	if(x + dir_x > width || x + dir_x < 0)
	{
		dir_x = -dir_x;
	}

	//paddle collision
	if(paddle_x < 0)
	{
		paddle_x = 0;
	}
	else if(paddle_x + paddle_w > width)
	{
		paddle_x = 405;
	}

	if(y + dir_y < 0)
	{
		dir_y = -dir_y;
	}
	else if(y + dir_y > height)
	{
		if(x > paddle_x && x < paddle_x + paddle_w)
		{
			dir_y = -dir_y;
		}
		else
		{
			clearInterval(game_loop);
			game_over = true;
		}
	}

	x += dir_x;
	y += dir_y;

}

//clear canvas
function clear()
{
	ctx.clearRect(0,0,width,height);
}

//Event handlers
//when the key is released
$(document).keyup(function(e)
{
	if(e.keyCode == 39)
	{
		rightKeyDown = false;
		// alert('right');
	}
	else if(e.keyCode == 37)
	{
		leftKeyDown = false;
		// alert('left');
	}
});

//When the key is pressed
$(document).keydown(function(e)
{
	if(e.keyCode == 39)
	{
		rightKeyDown = true;
		// alert('right');
	}
	else if(e.keyCode == 37)
	{
		leftKeyDown = true;
		// alert('left');
	}
	else if(e.keyCode == 80)
	{
		pause();
	}
	else if(e.keyCode == 83 && game_over == false && is_pause == true)
	{
		resume();
	}
	else if(e.keyCode == 82 && game_over == true)
	{
		restart();
	}
});


//When the mouse is moved
$(document).mousemove(function(e){
	if(e.pageX > canvasMinX && e.pageX < canvasMaxX)
	{
		paddle_x = e.pageX - canvasMinX;
	}
});
});