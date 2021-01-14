var sword;
var fruit;
var alien;
var swordImage,fruit1,fruit2,fruit3,fruit4,alien1,alien2;
var PLAY=1;
var END=0;
var gameState=1;
var gameOverImage;
//var knifecut;

function preload(){
 
  swordImage=loadImage("sword.png");
  
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  alien1=loadImage("alien1.png");
  alien2=loadImage("alien2.png");
  
  gameOverImage=loadImage("gameover.png");
  
  knifecut=loadSound("knifeSwooshSound.mp3");
  
  gameOverSound=loadSound("gameover.mp3");
  
 
}

function setup(){
  
  createCanvas(600,600);
   
  sword=createSprite(40,200,10,10);
  
  sword.scale=0.7;
  
  
  
  fruitGroup=new Group();
  alienGroup=new Group();
  
}

function draw(){
 
  background("skyblue");
  
  if(gameState===PLAY){
    
    text("score:"+score,550,20);
    
    sword.x=World.mouseX;
    sword.y=World.mouseY;
    
    sword.addImage(swordImage);
    
    score=0;
    
     fruits();
     enemy();   
  }
  else if(gameState===END){
    
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    alienGroup.setVelocityXEach(0);
    sword.x=300;
    sword.y=100;
    text("Press r to restart",300,400);
    fill("black");
    
    
    if(keyDown("r")){
      gameState=PLAY;
    }
    

    
  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
    knifecut.play();
  }
  
  if(alienGroup.isTouching(sword)){
    gameState=END;
    sword.addImage(gameOverImage);
    gameOverSound.play();
  }
  
 
  
  drawSprites(); 
  
  
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,2,2);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }
    else if(r==2){
      fruit.addImage(fruit2);
    }
    else if(r==3){
      fruit.addImage(fruit3);
    }
    else{
      fruit.addImage(fruit4);
    }
   
    position=Math.round(random(1,2));
    if(position==1){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
      fruit.setLifetime=0;
    }
    
    else {
      if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
        fruit.setLifetime=600;
      }
    }
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200===0){
  alien=createSprite(400,200,20,20);
  alien.scale=0.7;
  e=Math.round(random(1,2));
  if(e==1){
    alien.addImage(alien1);
  }
  else{
    alien.addImage(alien2);
  }
  alien.setLifetime=50;
  alien.velocityX=-(8+(score/10));
  alien.y=Math.round(random(50,340));
    
  alienGroup.add(alien);
}
}

