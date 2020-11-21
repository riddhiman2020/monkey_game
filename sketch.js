gameState = "play";

var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, score2;

//variables


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

//loading the images


function setup() {

  monkey = createSprite(80, 315, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  //creates the monkey

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  //creates the ground

  invisibleGround = createSprite(200, 350, 400, 10);
  invisibleGround.visible = false;
  //creates the invisibleground

  FoodGroup = new Group();
  obstacleGroup = new Group();
  //creates the group for the banana and the obstacles

  score = 0;
  score2 = 0;
  //scores
}


function draw() {
  background(255);

  if (gameState === "play") {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 310) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 1;

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score2 = score2 + 2;
    }

    if (obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.destroy();
      gameState = "end";
    }


    textSize(16);
    fill("black");
    text("SURVIVAL TIME: " + score, 230, 50);
    text("SCORE: " + score2, 10, 50);
    score = Math.ceil(frameCount / frameRate());

    bananaspawn();
    obstaclespawn();

  }
  //all the following codes run when gamestate is play  

  if (gameState === "end") {
    ground.velocityX = 0;
    textSize(16);
    fill("black");
    text("SURVIVAL TIME: " + score, 230, 50);
    text("SCORE: " + score2, 10, 50);
    textSize(20);
    text("GAME OVER", 120, 200);
  }
  //all the following codes run when gamestate is end



  monkey.collide(invisibleGround);
  //the monkey collides with the invisible ground  

  drawSprites();
}

function bananaspawn() {
  if (frameCount % 80 === 0) {
    banana = createSprite(420, 200, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -7;
    banana.lifetime = 150;

    FoodGroup.add(banana);
  }
}
//makes the banana

function obstaclespawn() {
  if (frameCount % 250 === 0) {
    obstacle = createSprite(440, 295, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -7;
    obstacle.lifetime = 150;
    obstacle.setCollider("circle", 0, 0, 200);
    obstacleGroup.add(obstacle);
  }
}
//makes the obstacles