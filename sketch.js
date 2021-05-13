var tower,towerImage;
var ghost,ghostImage;
var door,doorImage,DoorGroup;
var climber,climberImage,climberGroup;
var iBlock,iBlockGroup;
var gameState;
var spookySound;
function preload(){
  ghostImage=loadImage("ghost-standing.png");
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);

  tower=createSprite(300,300,20,20)
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.4;
  
  gameState=1;
  
  DoorGroup= new Group();
  climberGroup= new Group();
  iBlockGroup= new Group();
  
  spookySound.loop();
}

function draw(){
 background(0); 
 
  if(gameState===1){
  if(tower.y>600){
    tower.y=300; 
  }
  
  if(keyDown("space")){
    
    ghost.velocityY=-15;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY=0;
    
  }
  
  if(iBlockGroup.isTouching(ghost) || ghost.y>600){
    gameState=0;
    if(iBlockGroup.isTouching(ghost)){
      console.log("Ghost touched the window from bottom");
    }
    if(ghost.y>600){
      console.log("Ghost went out of the canvas");
    }
  }
    
    
  ghost.velocityY=ghost.velocityY+0.5;
  
  createDoors();
  drawSprites();
  }
  if(gameState===0){
    
    ghost.destroy();
    
    stroke("yellow");
    textSize(30);
    text("GAME IS OVER",300,300);
  }
  
}

function createDoors(){
  if( frameCount%240===0){
    door= createSprite(200,-50);
    door.addImage("doors",doorImage);
    door.velocityY=1;
    door.x=Math.round(random(120,440));
    door.lifetime=800;
    DoorGroup.add(door);
    
    climber=createSprite(200,10);
    climber.addImage("climbers",climberImage);
    climber.velocityY=1;
    climber.x=door.x;
    climber.lifetime=800;
    climberGroup.add(climber);
    
    iBlock=createSprite(200,15);
    iBlock.width=climber.width-20;
    iBlock.height=2;
    iBlock.x=door.x;
    iBlock.velocityY=1;
    iBlock.debug=true;
    iBlock.lifetime=800;
    iBlockGroup.add(iBlock);
    
  door.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
    
  }
}
