$(document).ready(function()
{
	//Canvas
	var canvas = document.getElementById("snake_canvas");
	var h = canvas.height;
	var w = canvas.width;
	var ctx = canvas.getContext("2d");

	//cell width
	var cw = 10;
	var dir;
	var food;
	var poison1;
	var poison2;
	var min_x;
	var min_y;
	var max_x;
	var max_y;
	var lives;
	var score;
	var snake_array;

	var wall_arrayv;
	var wall_arrayh;

	init();

	function init()
	{
		dir = "right";
		score = 0;
		lives = 3;
		play();
		create_snake();
		create_food();
		create_poison_1();
		create_poison_2();
		create_wall_horizontal();
		create_wall_vertical();
		paint();
		// alert(snake_array.length);
	}

	function create_snake()
	{
		var length = 5;
		snake_array = [];
		for(var i=length-1; i>=0; i--)
		{
			snake_array.push({x:i, y:0});
		}
	}

	// Place food randomly
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw)
		}
	}

	// Place poison
	// Must be placed near the food
	function create_poison_1()
	{
		if(food.x >= 48)
		{
			min_x = 47 + 1;
			max_x = 47 + 2;
			min_y = food.y + 1;
			max_y = food.y + 2;
		}
		else if(food.y >= 48)
		{
			min_x = food.x + 1;
			max_x = food.x + 2;
			min_y = 47 + 1;
			max_y = 47 + 2;
		}
		else
		{
			min_x = food.x + 1;
			max_x = food.x + 2;
			min_y = food.y + 1;
			max_y = food.y + 2;
		}

		poison1 = 
		{
			x: Math.round(getRandom(min_x, max_x)),
			y: Math.round(getRandom(min_y, max_y))
		};
	}

	function create_poison_2()
	{
		if(food.x <= 1)
		{
			min_x = 2 - 1;
			max_x = 2 - 2;
			min_y = food.y - 2;
			max_y = food.y - 1;
		}
		else if(food.y <= 1)
		{
			min_x = food.x - 1;
			max_x = food.x - 2;
			min_y = 2 - 2;
			max_y = 2 - 1;
		}
		else
		{
			min_x = food.x - 2;
			max_x = food.x - 1;
			min_y = food.y - 2;
			max_y = food.y - 1;
		}

		poison2 = 
		{
			x: Math.round(getRandom(min_x, max_x)),
			y: Math.round(getRandom(min_y, max_y))
		};
	}

	//Create a horizontal wall
	function create_wall_horizontal()
	{
		var length = 10;
		wall_arrayh = [];

		random_x = Math.round(getRandom(1,40));
		random_y = Math.round(getRandom(1,50));

		if(random_y < 25)
		{
			random_y = 0;
		}
		else
		{
			random_y = 49;
		}

		wall_arrayh.push({x: random_x, y: 49});
		wall = wall_arrayh.pop();

		for(var i=length-1; i>=0; i--)
		{
			wall_arrayh.push({x: wall.x + i, y: wall.y});
		}
	}

	function create_wall_vertical()
	{
		var length = 10;
		wall_arrayv = [];

		random_x = Math.round(getRandom(1,50));
		random_y = Math.round(getRandom(1,40));

		if(random_x < 25)
		{
			random_x = 0;
		}
		else
		{
			random_x = 49;
		}

		wall_arrayv.push({x:random_x, y:random_y});
		wall = wall_arrayv.pop();

		for(var i=length-1; i>=0; i--)
		{
			wall_arrayv.push({x: wall.x, y:wall.y + i});
		}
	}

	function getRandom(min, max)
	{
		return Math.random() * (max - min) + min;
	}

	function paint()
	{
		ctx.fillStyle = "#1E3264";
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle = "#1E3264";
		ctx.strokeRect(0,0,w,h);

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;

		if(dir == "right")
		{
			nx++;
		}
		else if(dir == "left")
		{
			nx--;
		}
		else if(dir == "up")
		{
			ny--;
		}
		else if(dir == "down")
		{
			ny++;
		}

		//If the snake goes towards one end of the canvas, 
		//reset the head position from the other end
		//x-axis
		if(nx == -1)
		{
			nx = w / cw;
		}
		else if(nx == w/cw)
		{
			nx = 0;
		}

		//y-axis
		if(ny == -1)
		{
			ny = h / cw;
		}
		else if(ny == h/cw)
		{
			ny = 0;
		}


		if(check_collision(nx,ny,snake_array) || check_collision(nx, ny, wall_arrayv) || check_collision(nx, ny, wall_arrayh) || lives == 0)
		{
			alert("Game Over! Score: " + score);
			init();
			return;
		}

		//If the snake eats the food
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			create_food();
			create_poison_1();
			create_poison_2();
			score++;
		}
		//If the snake eats the poison
		else if(nx == poison1.x && ny == poison1.y || nx == poison2.x && ny == poison2.y)
		{
			var tail = snake_array.pop();
			tail = snake_array.pop();
			tail.x = nx;
			tail.y = ny;
			lives--;
			
			create_food();
			create_poison_1();
			create_poison_2();	
			
		}
		else
		{
			var tail = snake_array.pop();
			tail.x = nx;
			tail.y = ny;
		}

		snake_array.unshift(tail);

		//paint snake
		for(var i=0; i<snake_array.length; i++)
		{
			var cell = snake_array[i];
			paint_cell("snake",cell.x, cell.y);
		}

		//paint walls
		for(var i=0; i<wall_arrayh.length; i++)
		{
			var cell = wall_arrayh[i];
			var cell2 = wall_arrayv[i];
			paint_cell("snake", cell.x, cell.y);
			paint_cell("snake", cell2.x, cell2.y);
		}

		//Paint food
		paint_cell("food", food.x,food.y);
		paint_cell("poison", poison1.x, poison1.y);
		paint_cell("poison", poison2.x, poison2.y);

		var score_text = "Score: " + score;
		var lives_text = "Lives: " + lives;
		ctx.fillStyle = "#FFC312";
		ctx.fillText(score_text, 5, h-5);
		ctx.fillText(lives_text, w - 40, h - 5);

	}

	function paint_cell(type,x,y)
	{
		if(type == "snake")
		{
			ctx.fillStyle = "#F772A1";
			ctx.fillRect(x*cw,y*cw,cw,cw);
			ctx.strokeStyle = "#F772A1";
			ctx.strokeRect(x*cw,y*cw,cw,cw);	
		}
		else if(type == "food")
		{
			ctx.fillStyle = "#FF6436";
			ctx.fillRect(x*cw,y*cw,cw,cw);
			ctx.strokeStyle = "#FF6436";
			ctx.strokeRect(x*cw,y*cw,cw,cw);
		}
		else if(type == "poison")
		{
			ctx.fillStyle = "#FFC312";
			ctx.fillRect(x*cw,y*cw,cw,cw);
			ctx.strokeStyle = "#FFC312";
			ctx.strokeRect(x*cw,y*cw,cw,cw);	
		}
	}

	function check_wall_collision(x,y)
	{
		if(x == -1 || x == w/cw || y == -1 || y == h/cw)
		{
			return true;
		}
		return false;
	}

	function check_collision(x,y,arr)
	{
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].x == x && arr[i].y == y)
			{
				return true;
			}
		}
		return false;
	}

	function pause()
	{
		clearInterval(game_loop);
		allowPressKeys = false;
	}

	function play()
	{
		if(typeof game_loop != "undefined")
		{
			clearInterval(game_loop);
		}
		game_loop = setInterval(paint, 60);
		allowPressKeys = true;
	}

	//Event handlers
	$(document).keydown(function(e){
		var key = e.which;
		if((key == "65" || key == "37") && dir != "right")
		{
			dir = "left";
		}
		else if((key == "87" || key == "38") && dir != "down")
		{
			dir = "up";
		}
		else if((key == "68" || key == "39") && dir != "left")
		{
			dir = "right";
		}
		else if((key == "83" || key == "40") && dir != "up")
		{
			dir = "down";
		}
		else if(key == "32")
		{
			pause();
		}
		else if(key == "80")
		{
			play();
		}
		else if(key == "82")
		{
			init();
			play();
		}
		else
		{
			//alert(key);
		}
	});
});