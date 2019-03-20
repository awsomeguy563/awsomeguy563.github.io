var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let x = 50;
let y = 50;
let speedx = 10;
let speedy = 10;
let red = 0;
let blue = 0;
let green = 0;






function update(progress) {
    if((x+100) >= c.width){
        speedx = speedx * -1;
        red = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
    }
    if(x <= 0){
        speedx = speedx * -1;
        red = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
    }
    if((y+100) >= c.height){
        speedy = speedy * -1;
        red = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
    }
    if(y <= 0){
        speedy = speedy * -1;
        red = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
    }
    x += speedx;
    y += speedy;
}
  
function draw() {
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    console.log(ctx.fillStyle, x, y);
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