var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieGroup,zombie_img;
var bullet,bullet_img,bulletGroup;
var score = 0;
var hr1_img,hr2_img,hr3_img,heart1,heart2,heart3;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombie_img = loadImage("assets/zombie.png")
  bullet_img = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg.jpg");
  hr1_img = loadImage("assets/heart_1.png") 
  hr2_img = loadImage("assets/heart_2.png")
  hr3_img = loadImage("assets/heart_3.png")
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
  player.setCollider("rectangle",0,0,230,470);

  

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

  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg);
  }
  bulletGroup = createGroup()

  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
    bullet = createSprite(player.x + 80,player.y-50,50,50);
    bullet.addImage(bullet_img);
    bullet.velocityX = 10;
    bullet.debug = true;
    bullet.setCollider("rectangle",0,0,100,100)
    console.log(player.depth);
    console.log(bullet.depth);
    bullet.depth = player.depth;
    bullet.scale = 0.02;
    bulletGroup.add(bullet);
  }

  if (bulletGroup.isTouching(zombieGroup)) {
    score += 1
    for (i=0; i<zombieGroup.length; i++){ 
      if (zombieGroup[i].isTouching(bulletGroup)){
        bulletGroup.destroyEach();
        zombieGroup[i].destroy();
      }
    }

  }

  //Creating Zombie Function
  spawnZombie();

  //Zombie Destroy and Score
  drawSprites();

}

//Creating Zombie Function
function spawnZombie() {
  if (frameCount % 50 === 0) {
    
    zombie = createSprite(displayWidth,Math.round(random(displayHeight/6,displayHeight/3+100)),50,50);   
    zombieGroup.add(zombie);
    zombie.addImage(zombie_img);
    zombie.setCollider("rectangle",0,0,450,1000)
    console.log(zombie.depth)
    zombie.velocityX = -5; 
    zombie.scale = 0.3
    //zombie.depth = bullet.depth;
    zombie.debug = true;
  }

}