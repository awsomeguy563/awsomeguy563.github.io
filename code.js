var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let x = 50;
let y = 50;






function update(progress) {
    x += 10;
    y +=10;
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