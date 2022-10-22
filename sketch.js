const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var fruitImg, rabbitImg, bgImg;
var cutButton;
var blink, eat, sad;
var bunny;

function preload(){
  fruitImg = loadImage("assets/melon.png");
  rabbitImg = loadImage("assets/Rabbit-01.png");
  bgImg = loadImage("assets/background.png");

  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  eat = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  sad.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(500,700);
  
  frameRate(80);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(200,690,600,20);

  rope = new Rope(7,{x:245,y:30});
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  cutButton = createImg('assets/cut_btn.png');
  cutButton.position(220,30);
  cutButton.size(50,50);
  cutButton.mouseClicked(drop);
  
  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50) 
}

function draw(){
  background(51);

  image(bgImg,width/2,height/2,490,690);

  if(fruit!=null){
    image(fruitImg,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
    
  Engine.update(engine);
  
  ground.show(); 

  if (collide(fruit,bunny) === true){
    bunny.changeAnimation("eating")
  }

  if (collide(fruit,ground.body)===true){
    bunny.changeAnimation("crying")
  }
  
  drawSprites()
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide(body,sprite){
  if (body!= null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (d <= 80){
      return true
      World.remove(world,fruit)
      fruit = null
    }
    else {
      return false;
    }
  }
}