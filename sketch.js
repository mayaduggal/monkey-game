var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);


  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

 

  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

}


function draw() {
  background(rgb(204,255,204));
  monkey.collide(ground);
 
  //to make the monkey jump
   if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -15;
    }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  if (obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }
  if (FoodGroup.isTouching(monkey)){
    monkey.scale=0.15;
  }
  stroke("red");
  textSize(20);
  fill("white");
  text ("Survival Time: " + survivalTime);
  
  stroke("blue");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/20);
  text("Survival Time: "+survivalTime, 100, 50)
  
  spawnObstacles();
  spawnBanana();
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(350, 315, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    
    obstacle.depth=monkey.depth;
    monkey.depth = monkey.depth + 1;
  

  }
}
function spawnBanana() {
  if (frameCount % 100 === 0) {
    banana = createSprite(350, 215, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y= Math.round(random(120,200));
    banana.velocityX = -5;
    banana.lifetime = 300;
    FoodGroup.add(banana); 

  }
}