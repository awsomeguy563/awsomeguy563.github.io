var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let x = Math.random() * 500;
let y = Math.random() * 500;

let speedx = 5;
let speedy = 5;

let red = 0;
let blue = 0;
let green = 0;

var img = new Image;
img.src = "https://upload.wikimedia.org/wikipedia/commons/7/78/DVD_video_logo.png";

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
    ctx.drawImage(img, x, y, 100, 100);
}
  
function loop() {
    window.requestAnimationFrame(loop)
    update();
    draw();
}
 
loop();
