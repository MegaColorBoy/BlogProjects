$(document).ready(function(){
	//Canvas stuff
	var canvas = document.getElementById("ball_collision_canvas");
	var height = canvas.height;
	var width = canvas.width;
	var ctx = canvas.getContext("2d");

	//coordinates of the ball
	var x = canvas.width / 2;
	var y = canvas.height - 30;
	var dir_x = 2;
	var dir_y = 4;
	var ball_r = 10;

	//Draw a circle
	function circle(x,y,r)
	{
		ctx.fillStyle = "#00B8D9";
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}

	//Draw canvas
	function draw()
	{
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = "#1B1464";
		ctx.fillRect(0,0,width,height);

		circle(x,y,ball_r);

		/*
			If the distance between the ball radius and the wall's edge is the same,
			it will change the ball direction. This would allow a proper ball collision
			to bounce off the walls.
		*/
		if(x + dir_x > width - ball_r || x + dir_x < ball_r)
		{
			dir_x = -dir_x;
		}
		
		if(y + dir_y > height - ball_r || y + dir_y < ball_r)
		{
			dir_y = -dir_y;
		}

		x += dir_x;
		y += dir_y;
	}

	setInterval(draw, 10);
});