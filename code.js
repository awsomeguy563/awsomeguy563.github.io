var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let x = Math.random() * 500;
let y = Math.random() * 500;

let speedx = Math.random() * 5;
let speedy = Math.random() * 5;

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
    ctx.drawImage(img, x, y, 100, 100);
    ctx.fillStyle = "black";
    ctx.fillText(fib(100), 50,50);
}

function fib(n){
    let a = 0;
    let b = 1;
    let c = a+b;
    let d = [0, 1];
    for(let i =0; i < n; i++){
        a = b;
        b = c;
        d.push(c);
        c=a+b;
    }
    return d

}
  
function loop() {
    window.requestAnimationFrame(loop)
    update();
    draw();
}
 
loop();
