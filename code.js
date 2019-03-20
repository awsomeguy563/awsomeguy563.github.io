var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


ctx.clearRect(0,0,800,600);
ctx.beginPath();
ctx.fillStyle = "red";
ctx.fillRect(10,10,100,100);
ctx.stroke();