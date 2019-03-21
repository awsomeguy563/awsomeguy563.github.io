let ctx = document.getElementById("can").getContext("2d");
let can = document.getElementById("can");
let width = can.width;
let height = can.height;
let disp = document.getElementById("dis");


ctx.fillStyle = "black";
ctx.rect(0, 0, can.width, can.height);
ctx.fill();
ctx.font = "30px ComicSans";
let colors = ["red", "green", "blue"];



let Player = function(){
  this.x = 250;
  this.y = 400;
  this.colornum = 0;
  this.xspeed = 10;
  this.yspeed = 10;
  this.pressRight = false;
  this.pressLeft = false;
  this.pressUp = false;
  this.pressDown = false;
  this.radius = 30;
  this.num = 0;


  this.draw = function(){

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = colors[this.colornum];
    ctx.fill();
    ctx.closePath();

    //Number Style
    ctx.beginPath();
    ctx.fillStyle = "Black";
    ctx.fillText(this.num, this.x - 15, this.y + 10);
    ctx.fill();
    ctx.restore();

  }

  this.updatePosition = function(){
    if(this.pressRight){
      if(this.x + this.radius < can.width){
        this.x += this.xspeed;
      }
    }else if(this.pressLeft){
      if(this.x - this.radius > 0){
        this.x -= this.xspeed;
      }
    }else if(this.pressUp){
      if(this.y - this.radius > 0){
        this.y -= this.yspeed;
      }
    }else if(this.pressDown){
      if(this.y + this.radius < can.height){
        this.y += this.yspeed;
      }
    }
  }

  this.update = function(){
    this.updatePosition();
    this.draw();
  }

}

let Entity = function(){
  this.x = Math.floor(Math.random() * 500);
  this.y = Math.floor(Math.random() * 500);
  this.colornum = Math.floor(Math.random() * 3);
  this.xspeed = Math.floor(Math.random() * 7);
  this.yspeed = Math.floor(Math.random() * 7);

  this.collide = function(){
    if(this.x > can.width || this.x < 0){
      this.xspeed = -this.xspeed;
    }
    if(this.y > can.height || this.y < 0){
      this.yspeed = -this.yspeed;
    }
  }

  this.updatePosition = function(){
    this.collide();
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  this.draw = function(){
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, 2*Math.PI, false);
    ctx.fillStyle = colors[this.colornum];
    ctx.fill();
    ctx.closePath();

  }

  this.update = function(){
    this.updatePosition();
    this.draw();
  }
}

let player1 = new Player();

let enemylist = {};

for(let i = 0; i < 20; i++){
  let id = Math.floor(Math.random() * 100);
  enemylist[id] = new Entity();
}

function CollideDetect(x1, y1, x2, y2){
  if(Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)) < (player1.radius + 20)){
    return true;
  }else
  return false;
}

function update(){
  ctx.clearRect(0,0,width,height);
  ctx.fillStyle = "White";
  ctx.rect(0,0,800,600);
  ctx.fill();

  for(let key in enemylist){
    let collided = CollideDetect(enemylist[key].x, enemylist[key].y, player1.x, player1.y);
    if(collided && player1.colornum == enemylist[key].colornum){
      player1.radius += 5;
      player1.num += 1;
      delete enemylist[key];
    }else if(collided && player1.colornum != enemylist[key].colornum){
      if(player1.num <= 0 || player1.radius <5){
        delete enemylist[key];
      }else{
        player1.radius -= 5;
        player1.num -= 1;
        delete enemylist[key];
      }
    }
  }

  for(let key in enemylist){
    enemylist[key].update();
  }
  player1.update();

  if(Object.keys(enemylist).length == 0){
    disp.innerHTML = "Game Over";
  }else if(Object.keys(enemylist).length != 0){
    disp.innerHTML = "Start";
  }
}

let Restart = function(){
  if(Object.keys(enemylist).length == 0){
    player1.num = 0;
    player1.radius =30;
    for(let i = 0; i < 30; i++){
      let id = Math.floor(Math.random() * 10);
      enemylist[id] = new Entity();
    }
  }

}



document.onkeydown = function(event){
  if(event.keyCode == 68){
    player1.pressRight = true;
  }else if(event.keyCode == 65){
    player1.pressLeft = true;
  }else if(event.keyCode == 83){
    player1.pressDown = true;
  }else if(event.keyCode == 87){
    player1.pressUp = true;
  }else if(event.keyCode == 71){
    player1.colornum = 0;
  }else if(event.keyCode == 72){
    player1.colornum = 1;
  }else if(event.keyCode == 74){
    player1.colornum = 2;
  }
}

document.onkeyup = function(event){
  if(event.keyCode == 68){
    player1.pressRight = false;
  }else if(event.keyCode == 65){
    player1.pressLeft = false;
  }else if(event.keyCode == 83){
    player1.pressDown = false;
  }else if(event.keyCode == 87){
    player1.pressUp = false;
  }else if(event.keyCode == 87){

  }
}

let gameloop = function(){
  window.requestAnimationFrame(gameloop);
  update();
}

gameloop();