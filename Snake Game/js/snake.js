$(document).ready(function() {

	/*------ Declared Variables ------*/
	var colorOne   = "#000000";
	var colorTwo   = "#69DC9E";

	var gameScreen = $('#gameScreen')[0];
	var context    = gameScreen.getContext('2d');
	var width      = $('#gameScreen').width();
	var height     = $('#gameScreen').height();
	var cell_width = 10;
	var direction, food, score, snakeArray;
	
	// $("#startGame").fadeIn("slow");

	// Begins game with start button
	$("#startGame").on("click", function() {
		start();
		$("#startGame").fadeOut();
		$("#snakeImage").hide();
		$("#gameScreen").show();
	});
	
	/*------ Functions ------*/
	// Snake, food, and score is created.
	function start() {
		direction = "down"; // Start direction
		createSnake();
		createFood();
		score = 0;
		
		// Game interval is set to reset
		if (typeof startGame != "undefined")clearInterval(startGame);
		startGame = setInterval(config, 100); // Speed of snake
	}
	
	// Snake size is based on integers
	// Array is amount of squares that are behind the gameScreen, they appear once food is eaten
	function createSnake() {
		var snakeSize = 2;
		snakeArray = [];
		for(var x = 0; x < snakeSize; x++) {
			snakeArray.push({x: 45, y: 14});
		}
	}
	
	// Sets food randomly based on x/y coordinates
	function createFood() {
		food = {
			x: Math.round(Math.random() * (width - cell_width) / cell_width),
			y: Math.round(Math.random() * (height - cell_width) / cell_width)
		};
	}
	
	function config() {
		
		gameBackground();
		
		var point_x = snakeArray[0].x;
		var point_y = snakeArray[0].y;
		
		switch(direction) {
			case "right":
				point_x++;
				break;
			case "left":
				point_x--;
				break;
			case "down":
				point_y++;
				break;
			case "up":
				point_y--;
				break;
		}
		
		// Resets game
		if (point_x == -1 || point_x == width / cell_width || point_y == -1 || point_y == height / cell_width || collision(point_x, point_y, snakeArray)) {
			$("#startGame").fadeIn();
			$("#gameScreen").hide();
			$("#snakeImage").show();
			start();
			return;
		}
		
		// Adds points
		if (point_x == food.x && point_y == food.y) {
			var snake_tail = {x: point_x, y: point_y};
			score += 3;
			createFood();
		} else {
			var snake_tail = snakeArray.pop();
			snake_tail.x = point_x;
			snake_tail.y = point_y;
			
		}
		
		snakeArray.unshift(snake_tail);
		
		for (var i = 0; i < snakeArray.length; i++) {
			var c = snakeArray[i];
			snakeBody(c.x, c.y);
		}
		
		snakeBody(food.x, food.y);
		
		$("#totalScore").text("SCORE: " + score);
		$("#totalScore").css("color", colorTwo);
	}
	
	// Creates color for game screen
	function gameBackground() {
		context.fillStyle= colorOne;
		context.fillRect(0, 0, width, height);
		context.strokeStyle= colorOne;
		context.strokeRect(0, 0, width, height);
	}
	
	// Creates color for snake
	function snakeBody(x, y) {
		context.fillStyle= colorTwo;
		context.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);
	}
	
	function collision(x, y, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].x == x && array[i].y == y) {
				return true;
			}
		}
		return false;
	}
	
	// Game controls
	$(document).keydown(function(e) {
		var key = e.which;
		if (key == "40" && direction != "up") {
			direction = "down";
		} else if (key == "39" && direction != "left") {
			direction = "right";
		} else if (key == "38" && direction != "down") {
			direction = "up";
		} else if (key == "37" && direction != "right") {
			direction = "left";
		}
	});
});