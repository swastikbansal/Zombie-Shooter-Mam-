var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieGroup,zombie_img;
var bullet,bullet_img,bulletGroup;
var score = 0;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombie_img = loadImage("assets/zombie.png")
  bullet_img = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg.jpg");

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.2;
  
  //Zombei Group
  zombieGroup = createGroup()
  

  //creating the player sprite
  player = createSprite(displayWidth-1800, displayHeight-300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.7;
  player.debug = true;
  player.setCollider("rectangle",0,0,300,300);

}

function draw() {
  background(bgImg); 

  fill('red');
  textSize(30) 
  text("Score : "+score,displayWidth/1.2,displayHeight/20); 
  
  
  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30;
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30;
  }

  bulletGroup = createGroup()

  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
    bullet = createSprite(player.x + 80,player.y-50,50,50);
    bullet.addImage(bullet_img);
    bullet.velocityX = 10;
    bullet.scale = 0.02;
    bulletGroup.add(bullet);
    
  }

  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg);
  }

  //Creating Zombie Function
  spawnZombie();
  
  //Zombie Destroy and Score
  if (bulletGroup.isTouching(zombieGroup)) {
    console.log("Touching")
    zombieGroup.destroyEach();
    score += 1;
    bulletGroup.destroyEach();
  }
  

  drawSprites();

}

//Creating Zombie Function
function spawnZombie() {
  if (frameCount % 150 === 0) {
    
    zombie = createSprite(displayWidth,Math.round(random(displayHeight/6,displayHeight/3+100)),50,50);   
    zombieGroup.add(zombie);
    zombie.addImage(zombie_img);
    zombie.velocityX = -5; 
    zombie.scale = 0.3
    zombie.debug = true;
  }

}