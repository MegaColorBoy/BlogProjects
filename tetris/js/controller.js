document.body.onkeydown = function(e)
{
	//Move left
	if(e.keyCode == 65)
	{
		if(isValid(-1))
		{
			currentX--;
		}
	}
	//Move right
	if(e.keyCode == 68)
	{
		if(isValid(1))
		{
			currentX++;
		}
	}
	//Move down
	if(e.keyCode == 83)
	{
		if(isValid(0,1))
		{
			currentY++;			
		}
	}
	//Rotate
	if(e.keyCode == 87)
	{
		var rotated = rotate(current);
		if(isValid(0,0,rotated))
		{
			current = rotated;
		}
		// alert("rotate");
	}
}