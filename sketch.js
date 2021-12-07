var edges;
var player,player_image;
var projectile;
var bg;
var enemy,enemy_image;
var enemyGroup,projectileGroup;
var PLAY=1
var END=0;
var gameState=PLAY;
var score=0;
function preload(){
  player_image=loadImage("fighter jet.png");
  bg=loadImage("bg.jpg");
  enemy_image=loadImage("fighter jet 2.png");
}
function setup() {
  createCanvas(400,600);
  player=createSprite(200, 400, 30, 30);
  player.addImage(player_image);
  player.scale=0.5;

  edges=createEdgeSprites();

  projectileGroup=new Group();
  enemyGroup=new Group();
}

function draw() {
  background(bg);
  fill("black");
  text("Presiona las flechas para moverte",10,500);
  text("Presiona la barra espaciadora para disparar",10,550);
  textSize(20);
  text("score "+score,300,20);

  if(gameState==PLAY){
    if(keyDown("RIGHT_ARROW")){
      player.velocityX=10;
    }
    else{
      player.velocityX=0;
    }
    if(keyDown("LEFT_ARROW")){
      player.velocityX=-10;
    }
  
    if(keyDown("UP_ARROW")){
      player.velocityY=-10;
    }
    else{
      player.velocityY=0;
    }
    if(keyDown("DOWN_ARROW")){
      player.velocityY=10;
    }
  
    if(keyDown("SPACE")){
      projectile=createSprite(player.position.x,player.position.y,10,10);
      projectile.shapeColor="yellow";
      projectile.velocityY=-20;
      //projectile.lifetime=200;
      projectileGroup.add(projectile);
    }

    if(projectileGroup.isTouching(enemyGroup)){
      enemy.destroy();
      score++;
    }
    player.visible=true;
  }

  if(gameState==END){
    player.visible=false;
    player.velocityX=0;
    player.velocityY=0;
    projectileGroup.setVelocityYEach(0);
    enemyGroup.setVelocityYEach(0);
    textSize(50);
    fill("red");
    text("Game Over",50,300);
  }

  if(enemyGroup.isTouching(player)){
    gameState=END;
  }
  Enemy();
  drawSprites();
}
function Enemy(){
  var rand=Math.round(random(0,400));
  if(frameCount%rand==20){
    enemy=createSprite(200,10,30,30);
    enemy.scale=0.1;
    enemy.velocityY=5;
    enemy.x=random(0,400);
    enemy.addImage(enemy_image);
    //enemy.lifetime=200;
    enemyGroup.add(enemy);
  }
}