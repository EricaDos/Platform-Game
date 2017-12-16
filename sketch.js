/*

The Game Project 7 - Making a complete level

Week 11

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;



var clouds;
var houseXs;
var mountains;
var trees;
var canyon;
var t_Cube;


var score;
var isWon;
var lives;
var isLost;

var enemies;
var platforms;
var isOnPlatform;

function setup()
{
	createCanvas(1024, 576);
    score = 0;

    lives = 3;
    startGame();
}

function startGame()
{
    floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
    
    //Score
    isWon = false;
    isLost = false;
    isOnPlatform = false;


  
	// Initialise arrays of scenery objects.
    
    

    houseXs = [];
    for (var i = 0; i< 12; i++)
        {
            var h = random(-200,8000);
            houseXs.push(h);
        }
//    houseXs = [-100,1203,2000,782,-1111,2600,3100,-399,-1122];

    clouds =[];
    for (var i=0; i<100;i++)
        {
            var c = {x_pos:random(0,8000), y_pos: random(100,200)};
            clouds.push(c);
        }
    
    mountains =[]

    for (var i = 0; i < 50; i++)
        {
            var m = {x_pos:random(0,4000), height:(250,432)};
            mountains.push(m);
        }
    trees = []
    
    for (var i = 0; i < 40; i++)
        {
            var t = {x_pos:random(0,5000),height:333};
            trees.push(t)
        }

    canyon =
        [   
            {x_pos: 100, width: 100},
            {x_pos: 600, width: 100},
            {x_pos: 1200, width: 120},
            {x_pos: 1900, width: 90},
            {x_pos: 2200, width: 100},
            {x_pos: 300, width: 100},
            {x_pos: 1190, width: 70},
            {x_pos: 3200, width: 90},
            {x_pos: 1090, width: 100},
            {x_pos: 3910, width: 70},
            {x_pos: 1600, width: 100},
            {x_pos: -650, width: 120},
            {x_pos: -1800, width: 50},
            {x_pos: -848, width: 100},

        ]
    t_Cube = 
        [
           {x_pos: -200, y_pos: 100, size: 40, isFound: false},
           {x_pos: 250, y_pos: 100, size: 40, isFound: false},
           {x_pos: 450, y_pos: 100, size: 40, isFound: false},
           {x_pos: 800, y_pos: 100, size: 40, isFound: false},
           {x_pos: 1500, y_pos: 100, size: 40, isFound: false},
           {x_pos: 2300, y_pos: 100, size: 40, isFound: false},
           {x_pos: 3900, y_pos: 100, size: 40, isFound: false},
           {x_pos: 900, y_pos: 100, size: 40, isFound: false},
           {x_pos: 500, y_pos: 200, size: 40, isFound: false},
           {x_pos: 100, y_pos: 100, size: 40, isFound: false},
           {x_pos: 100, y_pos: 100, size: 40, isFound: false},
           {x_pos: 100, y_pos: 100, size: 40, isFound: false},
           {x_pos: 100, y_pos: 100, size: 40, isFound: false},
           {x_pos: -650, width: 120,size:40,isFound:false},
           {x_pos: -1900, width: 50,size:40,isFound:false},
           {x_pos: -900, width: 100,size:40,isFound:false},
           {x_pos: -400, width: 50,size:40,isFound:false}
        ];

    
    //Enemies
    enemies=[];

    enemies.push(
    {
        x_pos: 200,
        y_pos: floorPos_y,
        x1:20,
        x2:200,
        speed:1,
        size: 30,
        display: function()
        {
            // Draw enemy.
               // Draw enemy.
            fill(255,255,0);
            rect(this.x_pos+8,this.y_pos,20,5)
            rect(this.x_pos-30,this.y_pos,20,5)
            fill(255, 0, 0);
            ellipse(this.x_pos, this.y_pos, this.size);
            fill(255);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/2);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/2)           
            fill(169,169,169);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/3);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/3)
            fill(255);
            rect(this.x_pos,this.y_pos,5,5);
//            rect(this.x_pos+8,this.y_pos,15,2)

        },
        move:function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
            if((abs (realPos - this.x_pos) < 20 && ( abs (gameChar_y - this.y_pos) < 20)))
            {
                  playerDied();

            }
        } 
    });  
    enemies.push(
    {
        x_pos: 800,
        y_pos: floorPos_y,
        x1:20,
        x2:900,
        speed:1,
        size: 30,
        display: function()
        {
            // Draw enemy.
            fill(255,255,0);
            rect(this.x_pos+8,this.y_pos,20,5)
            rect(this.x_pos-30,this.y_pos,20,5)
            fill(255, 0, 0);
            ellipse(this.x_pos, this.y_pos, this.size);
            fill(255);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/2);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/2)           
            fill(169,169,169);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/3);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/3)
            fill(255);
            rect(this.x_pos,this.y_pos,5,5);


        },
        move:function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
            if((abs (realPos - this.x_pos) < 20 && ( abs (gameChar_y - this.y_pos) < 20)))
            {
                  playerDied();

            }
        } 
    });  
    enemies.push(
    {
            x_pos: 850,
            y_pos: floorPos_y,
            y1:100,
            y2:500,
            speed:1,
            size: 30,
            display: function()
        {
            // Draw enemy.

            fill(255,255,0);
            rect(this.x_pos+8,this.y_pos,20,5)
            rect(this.x_pos-30,this.y_pos,20,5)
            fill(100,10, 50);
            rect(this.x_pos-10, this.y_pos, 25,25);
            fill(255);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/2);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/2)           
            fill(169,169,169);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/3);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/3)
            fill(255);
            rect(this.x_pos,this.y_pos,5,5);


        },
        move:function()
        {
            this.y_pos += this.speed;
            if(this.y_pos < this.y1 || this.y_pos > this.y2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
            if((abs (realPos - this.x_pos) < 20 && ( abs (gameChar_y - this.y_pos) < 20)))
            {
                  playerDied();

            }
        } 
    });   
    enemies.push(
    {
            x_pos: 1250,
            y_pos: floorPos_y,
            y1:100,
            y2:500,
            speed:2,
            size: 30,
            display: function()
        {
            // Draw enemy.

            fill(255,255,0);
            rect(this.x_pos+8,this.y_pos,20,5)
            rect(this.x_pos-30,this.y_pos,20,5)
            fill(100,10, 50);
            rect(this.x_pos-10, this.y_pos, 25,25);
            fill(255);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/2);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/2)           
            fill(169,169,169);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/3);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/3)
            fill(255);
            rect(this.x_pos,this.y_pos,5,5);


        },
        move:function()
        {
            this.y_pos += this.speed;
            if(this.y_pos < this.y1 || this.y_pos > this.y2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
            if((abs (realPos - this.x_pos) < 20 && ( abs (gameChar_y - this.y_pos) < 20)))
            {
                  playerDied();

            }
        } 
    });  
    enemies.push(
    {
        x_pos: 200,
        y_pos: floorPos_y,
        x1:10,
        x2:800,
        speed:1,
        size: 30,
        display: function()
        {
            // Draw enemy.
            fill(255,255,0);
            rect(this.x_pos+8,this.y_pos,20,5)
            rect(this.x_pos-30,this.y_pos,20,5)
            fill(255, 0, 0);
            ellipse(this.x_pos, this.y_pos, this.size);
            fill(255);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/2);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/2)           
            fill(169,169,169);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/3);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/3)
            fill(255);
            rect(this.x_pos,this.y_pos,5,5);

        },
        move:function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
            if((abs (realPos - this.x_pos) < 20 && ( abs (gameChar_y - this.y_pos) < 20)))
            {
                  playerDied();

            }
        } 
    });
     enemies.push(
    {
        x_pos: 900,
        y_pos: floorPos_y,
        x1:10,
        x2:1300,
        speed:2,
        size: 30,
        display: function()
        {
            // Draw enemy.
            fill(255,255,0);
            rect(this.x_pos+8,this.y_pos,20,5)
            rect(this.x_pos-30,this.y_pos,20,5)
            fill(255, 0, 0);
            ellipse(this.x_pos, this.y_pos, this.size);
            fill(255);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/2);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/2)           
            fill(169,169,169);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/3);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/3)
            fill(255);
            rect(this.x_pos,this.y_pos,5,5);

        },
        move:function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
            if((abs (realPos - this.x_pos) < 20 && ( abs (gameChar_y - this.y_pos) < 20)))
            {
                  playerDied();

            }
        } 
    });
     enemies.push(
    {
        x_pos: 1500,
        y_pos: floorPos_y,
        x1:10,
        x2:2000,
        speed:1,
        size: 30,
        display: function()
        {
            // Draw enemy.
            fill(255,255,0);
            rect(this.x_pos+8,this.y_pos,20,5)
            rect(this.x_pos-30,this.y_pos,20,5)
            fill(255, 0, 0);
            ellipse(this.x_pos, this.y_pos, this.size);
            fill(255);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/2);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/2)           
            fill(169,169,169);
            ellipse(this.x_pos-5,this.y_pos-10,this.size/3);           
            ellipse(this.x_pos+5,this.y_pos-10,this.size/3)
            fill(255);
            rect(this.x_pos,this.y_pos,5,5);

        },
        move:function()
        {
            this.x_pos += this.speed;
            if(this.x_pos < this.x1 || this.x_pos > this.x2)
            {
                //reverse direction
                this.speed *= -1;
            }
        },
        checkCharCollision: function()
        {
            if((abs (realPos - this.x_pos) < 20 && ( abs (gameChar_y - this.y_pos) < 20)))
            {
                  playerDied();

            }
        } 
    });
    
    
    //Platforms 
    platforms=[];
    
    platforms.push(
    {
        x_pos: 10,
        y_pos: floorPos_y - 60,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill(4, 231, 212)
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function()
        {
            //Checks if the character is inbetween the platforms
            if(gameChar_y >= this.y_pos -27 && gameChar_y <= this.y_pos+this.height - 27 && realPos >= this.x_pos && realPos <= this.x_pos +this.width)
                {
                        console.log("1")
                        isOnPlatform = true;
                        isJumping = false;
                }

        }

    });
    platforms.push(
    {
        x_pos: 900,
        y_pos: floorPos_y - 60,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill(4, 231, 212)
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function()
        {
            //Checks if the character is inbetween the platforms
            if(gameChar_y >= this.y_pos -27 && gameChar_y <= this.y_pos+this.height - 27 && realPos >= this.x_pos && realPos <= this.x_pos +this.width)
                {
                        console.log("1")
                        isOnPlatform = true;
                        isJumping = false;
                }
            else
                {
                    // Allows the character to fall back down off the platform
                    isOnPlatform = false;

                }
        }

    });

    platforms.push(
    {
        x_pos: 500,
        y_pos: floorPos_y - 60,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill(4, 231, 212)
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
        checkCharOn: function()
        {
            //Checks if the character is inbetween the platforms
            if(gameChar_y >= this.y_pos -25 && gameChar_y <= this.y_pos+this.height - 25 && realPos >= this.x_pos && realPos <= this.x_pos +this.width)
                {

                        isOnPlatform = true;
                        isJumping = false;
                }
            else
                {
                    // Allows the character to fall back down off the platform
                    isOnPlatform = false;

                }
        }

    });
}
    
    
    
    
    
function draw()
{
    background(51,0,51);

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	// Draw clouds.
    push();
    translate(scrollPos * 0.5, 0)
    drawClouds();
    pop();

	// Draw mountains.
    drawMountains();

	// Draw trees.
    drawTrees();

	// Draw houses.
    push();
    translate(scrollPos * 0.3,0);
    drawHouse();
    pop();

	// Draw canyons.
    push();
    translate(scrollPos ,0)
    for (var i= 0; i < canyon.length; i++)
    {
        drawCanyon(canyon[i]);
        checkCanyon(canyon[i]);
    }
    pop();
    
    checkPlayerWon();
    checkPlayerDied();
    //Pickable Cube

    push();
    translate(scrollPos * 1.1, 0);
    
    for(var i = 0; i < t_Cube.length; i++)
        {
            checkCube(t_Cube[i]);
            drawCube(t_Cube[i]);
        }
    pop();
    
    
    //Draw the enemies
    push();
    translate(scrollPos,0,0);
    for(var i = 0; i < enemies.length; i++)
    {
      enemies[i].display();
      enemies[i].move();
      enemies[i].checkCharCollision();
    }
    pop();
    
    //Draw the platforms
    push();
    translate(scrollPos,0,0);
    for(var i = 0; i < platforms.length; i++)
    {
      platforms[i].display();
      platforms[i].checkCharOn();
      
    }

    pop();


	// Draw game character.
    drawGameChar();
    textSize(20);
    fill(255,0,0);
    noStroke();
    text("Score: " + score, 20,20);
    fill(255,0,0);
    stroke(0);
    text("Lives: " + lives,950,20);
    text("Github: EricaDos",500,20)
    
    
    if(isWon == true)
        {
            textSize(25)
            fill(255,0,0);
            text("Game over - you won. Press space to continue." , 360,200);
        }
    
    if(isLost == true)
        {
            textSize(25)
            fill(255,0,0);
            text("Game over - you lost. Press space to try again." , 360,200);
        }

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(gameChar_x > width * 0.2)
			{
					gameChar_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(gameChar_x < width * 0.8)
			{
					gameChar_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if(gameChar_y < floorPos_y)
	{
        if(!isOnPlatform)
            {
                 gameChar_y += 2;
                 isJumping = true;
            }
	}
	else
	{

			isJumping = false;
	}
    if(!isOnPlatform)
        {
            console.log(isOnPlatform)
            if(isFalling)
            {
                console.log(isOnPlatform)
                isFalling = true;
                gameChar_y += 5;
            }
        }

	// Update real position of gameChar for collision detection.
	realPos = gameChar_x - scrollPos;
}






// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

		// console.log(keyCode);
		// console.log(key);
    if(isLost || isWon)
    {
        if(key == ' ')
    {
        nextLevel();
    }
    return;
    }

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					gameChar_y -= 100;
			}
	}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
    if(isLeft && isJumping)
        {
        // add your jumping-left code
  
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x -9,gameChar_y +21, 15,10);
            //foot
            fill(0,0,0);
            stroke(0,0,0,150);
            ellipse(gameChar_x, gameChar_y +32, 39,5);
            //body
            fill(0,0,255);
            stroke(0,0,0,150);
            rect(gameChar_x -15, gameChar_y , 30,25,6);
            //head
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-30, 35,35,8);

            //face 
            fill(99,8,2);
            stroke(0,0,0,80);
            ellipse(gameChar_x-10,gameChar_y -10, 15, 25);

            fill(255);
            ellipse(gameChar_x-12,gameChar_y - 10, 12, 12);
            ellipse(gameChar_x-8,gameChar_y - 10, 12, 12);
            fill(0);
            ellipse(gameChar_x-17,gameChar_y - 10, 5, 5);
            ellipse(gameChar_x-13,gameChar_y - 10, 5, 5);

            //right hand
            fill(99,8,2);
            ellipse(gameChar_x-7, gameChar_y +18, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x-9, gameChar_y +15, 3,3);   
        }
        else if(isRight && isJumping)
        {
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x -9,gameChar_y +21, 15,10);
            //foot
            fill(0,0,0);
            stroke(0,0,0,150);
            ellipse(gameChar_x, gameChar_y +32, 39,5);
            //body
            fill(0,0,255);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-10, 35,35,8);
            //head
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-30, 35,35,8);

            //face 
            fill(99,8,2);
            stroke(0,0,0,80);
            ellipse(gameChar_x+10,gameChar_y -10, 15, 25);

            fill(255);
            ellipse(gameChar_x+12,gameChar_y - 10, 12, 12);
            ellipse(gameChar_x+8,gameChar_y - 10, 12, 12);
            fill(0);
            ellipse(gameChar_x+17,gameChar_y - 10, 5, 5);
            ellipse(gameChar_x+13,gameChar_y - 10, 5, 5);

            //right hand
            ellipse(gameChar_x+7, gameChar_y +18, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x+9, gameChar_y +15, 3,3);


        }
        else if(isLeft)
        {
            //leg
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x -9,gameChar_y +21, 15,10);
            //foot
            fill(0,0,0);
            stroke(0,0,0,150);
            ellipse(gameChar_x, gameChar_y +32, 39,5);
            //body
            fill(0,0,255);
            stroke(0,0,0,150);
            rect(gameChar_x -15, gameChar_y , 30,25,6);
            //head
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-30, 35,35,8);

            //face 
            fill(99,8,2);
            stroke(0,0,0,80);
            ellipse(gameChar_x-10,gameChar_y -10, 15, 25);

            fill(255);
            ellipse(gameChar_x-12,gameChar_y - 10, 12, 12);
            ellipse(gameChar_x-8,gameChar_y - 10, 12, 12);
            fill(0);
            ellipse(gameChar_x-17,gameChar_y - 10, 5, 5);
            ellipse(gameChar_x-13,gameChar_y - 10, 5, 5);

            //right hand
            fill(99,8,2);
            ellipse(gameChar_x-7, gameChar_y +18, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x-9, gameChar_y +15, 3,3);    


        }
        else if(isRight)
        {
            // add your walking right code
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x -9,gameChar_y +21, 15,10);
            //foot
            fill(0,0,0);
            stroke(0,0,0,150);
            ellipse(gameChar_x, gameChar_y +32, 39,5);
            //body
            fill(0,0,255);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-10, 35,35,8);
            //head
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-30, 35,35,8);

            //face 
            fill(99,8,2);
            stroke(0,0,0,80);
            ellipse(gameChar_x+10,gameChar_y -10, 15, 25);

            fill(255);
            ellipse(gameChar_x+12,gameChar_y - 10, 12, 12);
            ellipse(gameChar_x+8,gameChar_y - 10, 12, 12);
            fill(0);
            ellipse(gameChar_x+17,gameChar_y - 10, 5, 5);
            ellipse(gameChar_x+13,gameChar_y - 10, 5, 5);

            //right hand
            ellipse(gameChar_x+7, gameChar_y +18, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x+9, gameChar_y +15, 3,3);

        }
        else if(isJumping || isFalling)
        {
            // add your jumping facing forwards code
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x -13,gameChar_y +21, 25,16);
            //foot
            fill(0,0,0);
            stroke(0,0,0,150);
            ellipse(gameChar_x, gameChar_y +32, 39,5);
            //body
            fill(0,0,255);
            stroke(0,0,0,150);
            rect(gameChar_x -15, gameChar_y , 30,25,6);

            //hoody
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-30, 35,35,8);

            //face
            fill(99,8,2);
            stroke(0,0,0,80);
            ellipse(gameChar_x,gameChar_y -10, 35, 30);

            //outer eyes
            fill (255);
            ellipse(gameChar_x+8,gameChar_y -10, 15, 15);
            ellipse(gameChar_x-8,gameChar_y - 10, 15, 15);
            // inner eyes
            fill(0);
            ellipse(gameChar_x+8,gameChar_y -10, 5, 5);
            ellipse(gameChar_x-8,gameChar_y - 10, 5, 5);

            //left hand
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x-16, gameChar_y +18, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x-12, gameChar_y +20, 3,3);
            //right hand
            ellipse(gameChar_x+16, gameChar_y +18, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x+12, gameChar_y +20, 3,3);
        }
        else
        {
            fill(0,0,0);
            stroke(0,0,0,150);
            ellipse(gameChar_x, gameChar_y +34, 39,5);
            //leg
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x -13,gameChar_y +21, 25,10);
            //body
            fill(0,0,255);
            stroke(0,0,0,150);
            rect(gameChar_x -15, gameChar_y , 30,25,6);

            //hoody
            fill(255,0,0);
            stroke(0,0,0,150);
            rect(gameChar_x-18,gameChar_y-30, 35,35,8);

            //face
            fill(99,8,2);
            stroke(0,0,0,80);
            ellipse(gameChar_x,gameChar_y -10, 35, 30);

            //outer eyes
            fill (255);
            ellipse(gameChar_x+8,gameChar_y -10, 15, 15);
            ellipse(gameChar_x-8,gameChar_y - 10, 15, 15);
            // inner eyes
            fill(0);
            ellipse(gameChar_x+8,gameChar_y -10, 5, 5);
            ellipse(gameChar_x-8,gameChar_y - 10, 5, 5);
            //left hand
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x-16, gameChar_y +21, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x-12, gameChar_y +20, 3,3);
            //right hand
            ellipse(gameChar_x+16, gameChar_y +21, 8,8);   
            fill(99,8,2);
            stroke(0,0,0,100);
            ellipse(gameChar_x+12, gameChar_y +20, 3,3);

    
    }
}

// ---------------------------
// Background render functions
// ---------------------------


  // Draw clouds.
function drawClouds()
{
  
    for(var i = 0; i < clouds.length; i++)
    {   
        noStroke();
        fill(255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos - 10,150,120);      //main cloud body
        ellipse(clouds[i].x_pos + 45, clouds[i].y_pos,100,80);      //left side cloud
        ellipse(clouds[i].x_pos - 45, clouds[i].y_pos,100,80);      //right side cloud
        ellipse(clouds[i].x_pos, clouds[i].y_pos - 45,80,80);        //top cloud    
    }
    
    
}

    // Draw mountains.
function drawMountains()
{

    push()
    
    translate(scrollPos * 0.3, 0)
    
    for(var i = 0; i < mountains.length; i++)
    {
    
        noStroke();
        fill(169,169,169);
        triangle(mountains[i].x_pos, mountains[i].height, mountains[i].x_pos + 100, mountains[i].height - 300, mountains[i].x_pos + 200, mountains[i].height);      //left side mountain
        triangle(mountains[i].x_pos + 200, mountains[i].height, mountains[i].x_pos + 300, mountains[i].height - 300, mountains[i].x_pos + 400, mountains[i].height);     //right side mountain
        triangle(mountains[i].x_pos + 100, mountains[i].height, mountains[i].x_pos + 200, mountains[i].height - 275, mountains[i].x_pos + 300, mountains[i].height);       //middle mountain

        fill(255,255,255,75);
        noStroke();

        triangle(mountains[i].x_pos + 283, mountains[i].height - 250, mountains[i].x_pos + 300, mountains[i].height - 300, mountains[i].x_pos + 316, mountains[i].height - 250);    //Snow on right mountain peak
        triangle(mountains[i].x_pos + 181, mountains[i].height - 225, mountains[i].x_pos + 200, mountains[i].height - 275, mountains[i].x_pos + 218, mountains[i].height - 225);   //Snow on middle mountain peak
        triangle(mountains[i].x_pos + 83, mountains[i].height - 250, mountains[i].x_pos + 100, mountains[i].height - 300, mountains[i].x_pos + 117, mountains[i].height - 250);   //Snow on left mountain peak    
    }
    
    pop()
}
    // Draw trees.
    
function drawTrees()
{
    

    push()
    
    translate(scrollPos * 0.4, 0)
    
    for(var i = 0; i < trees.length; i++)
    {
        fill(139,69,19);
        strokeWeight(7);
        rect(trees[i].x_pos, trees[i].height, 30, 100);   //Tree trunk

        fill(34,139,34);
        noStroke();
        ellipse(trees[i].x_pos, trees[i].height - 10, 70, 70);     //Left leafs
        ellipse(trees[i].x_pos + 30, trees[i].height - 10, 70, 70);     //Right leafs
        ellipse(trees[i].x_pos + 15, trees[i].height - 35, 70, 70);     //middle leafs   
    }
    
    pop()
}

    // Draw houses.
    

function drawHouse()
{
    

    push()
    
    translate(scrollPos * 0.3, 0)
    
    for(var i = 0; i < houseXs.length; i++)
    {
        
        fill(255,100,0);
        stroke(0);
        strokeWeight(2);
        rect(houseXs[i], floorPos_y - 150,250,150);  //House body         //CHANGE houseXs[i] to houseXs[i] and floorPos_y to floorPos_y if needed
        fill(255);
        noStroke();
        rect(houseXs[i] + 90, floorPos_y - 40,20,10);    //Letter box

        strokeWeight(3);
        fill(255);
        stroke(0);
        rect(houseXs[i] + 145, floorPos_y - 55,30,30);    //Bottom right window

        fill(255);
        stroke(0);
        rect(houseXs[i] + 25, floorPos_y - 55,30,30);    //Bottom left window

        fill(255);
        stroke(0);
        rect(houseXs[i] + 25, floorPos_y - 135,30,30);    //Middle left window

        rect(houseXs[i] + 85, floorPos_y - 135,30,30);    //Centre window

        fill(255);
        stroke(0);
        rect(houseXs[i] + 145, floorPos_y - 135,30,30);    //Middle right window


        fill(255);
        stroke(0);
        strokeWeight(3);
        
        line(houseXs[i], floorPos_y - 150,houseXs[i] + 90, floorPos_y - 220);
        line(houseXs[i] + 160, floorPos_y - 220,houseXs[i] + 250, floorPos_y - 150);
        line(houseXs[i] + 90, floorPos_y - 220,houseXs[i] + 160, floorPos_y - 220);
    }
    
    pop()
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
        fill(50,50,0);
        rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);

    
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
        if(!isJumping && realPos > t_canyon.x_pos && realPos < t_canyon.x_pos + t_canyon.width)
    {
        
        if(!isOnPlatform)
        {
            console.log("canyon")
            isFalling = true;
            isRight =false;
            isLeft = false;
        }
    }

}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

function drawCube(t_Cube)
{
        if(!t_Cube.isFound)
    {
        stroke(0);
        fill(255,0,0)
        rect(t_Cube.x_pos,floorPos_y-50,25,25);
        fill(0,0,255)
        rect(t_Cube.x_pos+25,floorPos_y-50,25,25);        
        fill(255,255,0)
        rect(t_Cube.x_pos+25,floorPos_y-25,25,25);
        fill(0,255,0)
        rect(t_Cube.x_pos,floorPos_y-25,25,25);

    }
}

// Function to check character has picked up an Cube.
function checkCube(t_Cube)
{
        if(realPos < t_Cube.x_pos + t_Cube.size && realPos > t_Cube.x_pos - t_Cube.size)
    {
        if(!t_Cube.isFound)
        {
            t_Cube.isFound = true;
            score+=1;
            console.log(score);
        }
    }
    
}


function playerDied()
{
    console.log('Player Died');
    lives--;
    if (lives > 0)
    {
        // Restart game.
        startGame();
    }
    else
    {
        // Game over, player lost.
        isLost = true;
    }
}
function checkPlayerWon()
{
    if (score == t_Cube.length)
        {
            isWon = true;
            console.log("You Won!")
        }
}

function checkPlayerDied()
{
    if (gameChar_y > height)
    {
        playerDied();
    }
}

function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
 }