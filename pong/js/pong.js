$(document).ready(function(){
//variables
var width;
var height;
var pi = Math.PI;
var canvas;
var ctx;
var keystate;

var upKeyDown, downKeyDown;

var player = {
	x: null,
	y: null,
	width: 10,
	height: 100,

	update: function(){
		if(upKeyDown == true)
		{
			this.y -= 7;
		}
		if(downKeyDown == true)
		{
			this.y += 7;
		}
		this.y = Math.max(Math.min(this.y, height-this.height), 0);
	},
	draw: function(){
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

var ai = {
	x: null,
	y: null,
	width: 10,
	height:100,

	update: function(){
		var dest_y = ball.y - (this.height - ball.side) * 0.5;
		this.y += (dest_y - this.y) * 0.1;
		this.y = Math.max(Math.min(this.y, height-this.height), 0);
	},
	draw: function(){
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

var ball = {
	x: null,
	y: null,
	velocity:null,
	speed: 10,
	side: 10,

	update: function() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		if(0 > this.y || this.y + this.side > height)
		{
			var offset = this.velocity.y < 0 ? 0 - this.y : height - (this.y + this.side);
			this.y += 2 * offset;
			this.velocity.y *= -1;
		}

		var intersect = function(px, py, pw, ph, bx, by, bw, bh)
		{
			return px < bx+bw && py < by+bh && bx < px+pw && by < py+ph;
		}

		//if the ball has -ve velocity, it's hit by AI paddle and it's the player's turn
		//if the ball has +ve velocity, it's hit by player paddle and it's the AI's turn
		var paddle = this.velocity.x < 0 ? player : ai;

		if(intersect(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.side, this.side))
		{
			this.x = (paddle == player ? player.x+player.width : ai.x - this.side);
			var n = (this.y+this.side - paddle.y)/(paddle.height+this.side);
			var phi = 0.25 * pi * (2 * n - 1);
			var dir = (paddle == player ? 1 : -1);

			var smash = Math.abs(phi) > 0.2 * pi ? 1.5 : 1;

			this.velocity.x = smash * dir * this.speed * Math.cos(phi);
			this.velocity.y = smash * this.speed * Math.sin(phi);
		}

		//if it goes beyond the paddle, reset the ball coords and speed
		if(this.x > width || 0 > this.x + this.side)
		{
			this.serve(paddle === player ? 1 : -1);
		}

		// if(0 < this.y || this.y + this.side < height)
		// {
		// 	this.velocity.y *= 1;
		// }
	},
	draw: function(){
		ctx.fillRect(this.x, this.y, this.side, this.side);
	},
	serve: function(side)
	{
		var r = Math.random();
		this.x = side === 1 ? player.x+player.width : ai.x - this.side;
		this.y = (height - this.side) * r;

		var phi = 0.1 * pi * (1 - 2 * r);
		this.velocity = {
			x: side * this.speed * Math.cos(phi),
			y: this.speed * Math.sin(phi)
		}
	}
};

main();

//Functions
function main()
{
	canvas = document.getElementById("pong_canvas");
	width = canvas.width;
	height = canvas.height;
	ctx = canvas.getContext("2d");
	//document.body.appendChild(canvas);

	init();

	var game_loop = function(){
		update();
		draw();

		window.requestAnimationFrame(game_loop, canvas);
	};
	window.requestAnimationFrame(game_loop, canvas);
}

function init()
{
	player.x = player.width;
	player.y = (height - player.height)/2;

	ai.x = width - (player.width + ai.width);
	ai.y = (height - ai.height) / 2;

	ball.serve(1);
}

function update()
{
	ball.update();
	player.update();
	ai.update();
}

function draw()
{
	ctx.fillStyle = "#0D2381";
	ctx.fillRect(0,0,width,height);
	ctx.save();

	ctx.fillStyle = "#FFD730";
	ball.draw();
	
	ctx.fillStyle = "#FFD730";
	player.draw();
	ai.draw();

	//Create a midline border
	var border_width = 4;
	var border_x = (width - border_width) * 0.5;
	var border_y = 0;
	var step = height / 20;

	while(border_y < height)
	{
		ctx.fillRect(border_x, border_y+step*0.25, border_width, step*0.5);
		border_y += step;
	}

	ctx.restore();
}

$(document).keydown(function(e){
	if(e.keyCode == 87)
	{
		upKeyDown = true;
	}
	else if(e.keyCode == 83)
	{
		downKeyDown = true;
	}
});

$(document).keyup(function(e){
	if(e.keyCode == 87)
	{
		upKeyDown = false;
	}
	else if(e.keyCode == 83)
	{
		downKeyDown = false;
	}
});

});