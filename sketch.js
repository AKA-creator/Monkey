
var monkey, monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground, invisibleGround;
var i;
var gameState = 1;
var play = 1;
var end = 2;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
  background("white");
    text("Survival Time: "+ score, 150,15);
  if(gameState == 1){
    score = score + Math.round(getFrameRate()/60);
    i = Math.round(random(120, 200));
  if(keyDown("space") && monkey.y >= 150){
    monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
 ground.x = ground.width/2;
  bananaFood();
  obstacles();
  
  if (obstacleGroup.isTouching(monkey)){
    gameState = 2;
  }
  }
  else if(gameState == 2){
    ground.velocityX = 0;
    banana.velocityX = 0;
    obstacle.velocityX = 0;
    obstacle.lifetime = -1;
    banana.lifetime = -1;
    monkey.collide(ground);
    //console.log("hello");
  }
  drawSprites();
}
function bananaFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(400, i, 20, 20);
    banana.addImage("bImage", bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 100;
    monkey.depth = banana.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400, 328, 20, 20);
    obstacle.addImage("obstacleHurt", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstacleGroup.add(obstacle);
  }
}