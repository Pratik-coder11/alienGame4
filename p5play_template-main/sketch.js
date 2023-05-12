var lives = 3;
var score = 0;
var gameState = "Play"
var bgImage,ground
var spaceCraft,spaceCraftImg;
var alien1,alienImage1;
var alien2,alienImage2;
var alien3,alienImage3;
var alien;
var alienGroup;
var bullet;
var bullets;


function preload(){
bgImage = loadImage("images/background.jpg")
spaceCraftImg = loadImage("images/spacecraft.png")
alienImage1=loadImage("images/aliencraft1.png")
alienImage2=loadImage("images/aliencraft2.png")
alienImage3=loadImage("images/aliencraft3.png")
}

function setup() {
  createCanvas(1100,680);
  

  ground = createSprite(0,300,1600,800)
  ground.addImage("background",bgImage)
  //ground.scale = 0.5

  spaceCraft = createSprite(100,340,60,60)
  spaceCraft.addImage("spacecraft",spaceCraftImg)
  spaceCraft.scale = 0.2
  spaceCraft.debug = true;
  alienGroup = createGroup();

  bullets = createGroup();
  
/*
  alien1 = createSprite(800,340,60,60)
  alien1.addImage("alien1",alienImage1)
  alien1.scale = 0.3

  alien2 = createSprite(800,600,60,60)
  alien2.addImage("alien2",alienImage2)
  alien2.scale = 0.2

  alien3 = createSprite(800,100,60,60)
  alien3.addImage("alien3",alienImage3)
  alien3.scale = 0.4
*/

}

function draw() 
{
  background("black");
  
  


  if(gameState == "Play"){
  
    score = score + Math.round(getFrameRate()/60);

    if(ground.x<400){
    ground.x = ground.width/2
    }
    ground.velocityX = -3
  
  
    if(keyDown("up")){
      spaceCraft.y = spaceCraft.y-5
    }
  
    if(keyDown("down")){
      spaceCraft.y = spaceCraft.y+5
    }
  
    if(keyDown("left")){
      spaceCraft.x = spaceCraft.x-5
    }
  
    if(keyDown("right")){
      spaceCraft.x = spaceCraft.x+5
    }
  
    if(keyDown("space")){
      bullet = createSprite(spaceCraft.x,spaceCraft.y,5,5)
      bullet.velocityX = 10
      bullet.setLifetimeEach = 200;
      bullet.shapeColor = "#0827F5"
      bullets.add(bullet)
  
    }
  
    
  
    if(spaceCraft.isTouching(alienGroup)){
      spaceCraft.y = spaceCraft.y+70
      spaceCraft.x = spaceCraft.x-70
      if(lives>=0){
        lives = lives-1
      }
  
  
    }
    bullets.bounceOff(alienGroup,destroyAlien)
    

    if(lives <= 0){
      gameState = "Over"
    }
  
    spawnAlien();
    
    if(score == 100){
      gameWin()
    }

  }


drawSprites();


if(gameState == "Over"){
  textFont("impact")
  textSize(130)
  fill("blue")
  //fontType("impact")
  strokeWeight(1)
  stroke("cyan")
  text("GAME  OVER",249,340)
  score = score
  gameOver()
}



  fill("white");
    textSize(30);
  
    text("Score: "+ score, 80,80);
    text("lives: "+ lives, 900,80);

}


function spawnAlien()
{

  if (frameCount % 65 === 0)
 {
  var xRand = Math.round(random(900,1000));
  var yRand = Math.round(random(100,600));

   alien = createSprite(xRand,yRand,60,60)
   
   alien.velocityX = -3;
   alien.debug = true;
   alien.lifetime = 1100/3
   alienGroup.add(alien);
   
   alien.setCollider("circle",0,0,30)
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) 
    {
      case 1: alien.addImage(alienImage1);
              alien.scale = 0.3
              break;
      case 2: alien.addImage(alienImage2);
              alien.scale = 0.2
              break;
      case 3: alien.addImage(alienImage3);
              alien.scale = 0.4
              break;

      default: break;


    }
 }
}

function destroyAlien(bullets,alien){
  alien.remove()
}

function gameOver(){
  alienGroup.setVelocityXEach(0)
  alienGroup.setLifetimeEach(-1)
  ground.velocityX = 0;
  score = score 

  

}

function gameWin(){
  alienGroup.setVelocityXEach(0)
  ground.velocityX = 0;
  score = score;

  textSize(30)
  text("You Win !" ,550,340);

}
function reset(){
  
}
 






