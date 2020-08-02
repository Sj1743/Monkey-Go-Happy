//Global Variables
var monkey, monkeyRunning, monkeyStanding;
var invisibleGround;
var banana, bananaImage;
var rock, rockImage;
var backdrop, backgroundImage;
var bananaGroup, rockGroup;
var survivalTime, bananasEaten, score;
var gameState;
var PLAY;
var END;
var HIT;

function preload() {

  //images for background, banana and rock
  
  /*You had given incorrect image name for the jungle. that was the error*/
  
  backgroundImage = loadImage("jungle2.jpg");
  bananaImage = loadImage("Banana.png");
  rockImage = loadImage("stone.png");
  monkeyStanding = loadImage("Monkey_01.png");

  //animation for running monkey
  monkeyRunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

}


function setup() {

  //create canvas
  createCanvas(500, 300);

  //initialising variables, creating sprites, assigning properties
  score = 0;
  bananasEaten = 0;
  survivalTime = 0;
  PLAY = 1;
  HIT = 2;
  END = 0;

  invisibleGround = createSprite(300, 300, 600, 10);
  invisibleGround.visible = false;

  backdrop = createSprite(250, 150, 0, 0);
  backdrop.addImage("jungle background", backgroundImage);

  monkey = createSprite(70, 290, 0, 0);
  monkey.addAnimation("monkey", monkeyRunning);
  monkey.scale = 0.1;

  //create groups
  bananaGroup = createGroup();
  rockGroup = createGroup();

  //text preferences
  textAlign(CENTER, CENTER);
  textSize(15);
  stroke("white");
  fill("white");

  //initialise gameState to PLAY
  gameState = PLAY;

}


function draw() {

  background(255);

  //prevent monkey from falling off screen
  monkey.collide(invisibleGround);

  if (gameState === PLAY) {

    //monkey jumps when space pressed
    if (keyDown("space") && monkey.isTouching(invisibleGround)) {
      monkey.velocityY = -20;
    }
    //gravity for monkey
    monkey.velocityY = monkey.velocityY + 1;

    //make ground move
    backdrop.velocityX = -3;
    //reset ground
    if (backdrop.x < 0) {
      backdrop.x = backdrop.width / 2;
    }

    //if monkey touches banana, destroy and add to bananasEaten
    for (var i = 0; i < bananaGroup.length; i++) {
      if (monkey.isTouching(bananaGroup[i])) {
        bananaGroup[i].destroy();
        bananasEaten++;
        score = score + 2;
      }
    }

    //first time monkey touches rock, reset score and size
    for (var a = 0; a < rockGroup.length; a++) {
      if (monkey.isTouching(rockGroup[a])) {
        score = 0;
        monkey.scale = 0.1;
        gameState = HIT;
        rockGroup.destroyEach();
      }
    }

    //increment survivalTime
    survivalTime = Math.ceil(frameCount / frameRate());

    //spawn bananas and rocks
    spawnBananas();
    spawnRocks();

    //increase size of monkey every 10 scores
    switch (score) {
      case (10):
        monkey.scale = 0.12;
        break;
      case (20):
        monkey.scale = 0.14;
        break;
      case (30):
        monkey.scale = 0.16;
        break;
      case (40):
        monkey.scale = 0.18;
        break;
      case (50):
        monkey.scale = 0.2;
        break;
      default:
        break;
    }

  }
  if (gameState === HIT) {

    //monkey jumps when space pressed
    if (keyDown("space") && monkey.isTouching(invisibleGround)) {
      monkey.velocityY = -20;
    }
    //gravity for monkey
    monkey.velocityY = monkey.velocityY + 1;

    //make ground move
    backdrop.velocityX = -3;
    //reset ground
    if (backdrop.x < 0) {
      backdrop.x = backdrop.width / 2;
    }

    //if monkey touches banana, destroy and add to bananasEaten
    for (var k = 0; k < bananaGroup.length; k++) {
      if (monkey.isTouching(bananaGroup[k])) {
        bananaGroup[k].destroy();
        bananasEaten++;
        score = score + 2;
      }
    }

    // second time monkey hits rock, end game
    if (monkey.isTouching(rockGroup)) {
      gameState = END;
    }
    //increment survivalTime
    survivalTime = Math.ceil(frameCount / frameRate());

    //spawn bananas and rocks
    spawnBananas();
    spawnRocks();

    //increase size of monkey every 10 scores
    switch (score) {
      case (10):
        monkey.scale = 0.12;
        break;
      case (20):
        monkey.scale = 0.14;
        break;
      case (30):
        monkey.scale = 0.16;
        break;
      case (40):
        monkey.scale = 0.18;
        break;
      case (50):
        monkey.scale = 0.2;
        break;
      default:
        break;
    }

  } else if (gameState === END) {

    //stop moving each game object
    backdrop.velocityX = 0;
    monkey.velocityY = 0;
    monkey.addImage("monkey", monkeyStanding);
    bananaGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);

    //never destroy bananas and rocks
    bananaGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);

  }

  //draw all sprites
  drawSprites();

  //display bananasEaten and survivalTime
  text("Bananas eaten : " + bananasEaten, 70, 25);
  text("Survival time : " + survivalTime, 430, 25);
  text("Score : " + score, 250, 25);

}


function spawnBananas() {

  if (frameCount % 80 === 0) {
    banana = createSprite(510, 150, 0, 0);
    banana.y = Math.round(random(100, 200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    bananaGroup.add(banana);
    banana.lifetime = 175;
  }
}


function spawnRocks() {

  if (frameCount > 100 && frameCount % 120 === 0) {
    rock = createSprite(510, 275, 0, 0);
    rock.addImage("rock", rockImage);
    rock.scale = 0.2;
    rock.velocityX = -3;
    rockGroup.add(rock);
    rock.lifetime = 175;
    rock.setCollider("circle", 0, 0, 5);
  }
}


/*
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/addons/p5.sound.min.js"></script>
*/