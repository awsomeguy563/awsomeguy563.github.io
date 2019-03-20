var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let x = 50;
let y = 50;
let speedx = 10;
let speedy = 10;






function update(progress) {
    if(x+100 > 800){
        speedx*=-1;
    }
    if(x < 0){
        speedx*=-1;
    }
    if(y+100 > 600){
        speedy*=-1;
    }
    if(y < 0){
        speedy*=-1;
    }
    x += speedx;
    y += speedy;
}
  
function draw() {
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle = "red";
    ctx.fillRect(x,y,100,100);
}
  
function loop(timestamp) {
   var progress = timestamp - lastRender
  
    update(progress)
    draw()
  
    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }
  var lastRender = 0
  window.requestAnimationFrame(loop)