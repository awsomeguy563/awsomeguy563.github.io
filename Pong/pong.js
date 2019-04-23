var c = document.getElementById("can");
var ctx = c.getContext("2d");
let width = can.width;
let height = can.height;
var blip = new Audio('blip.wav');
let butt1 = document.getElementById("restart");


//Input handling:

function press(evt) {
    console.log(evt);

    if (evt.key == "w") {
        p1.pressUp = true;
    } else if (evt.key == "s") {
        p1.pressDown = true;
    }
    if (evt.key == "ArrowUp") {
        p2.pressUp = true;
    } else if (evt.key == "ArrowDown") {
        p2.pressDown = true;
    }


}
document.addEventListener("keydown", press, false);

function unpress(evt) {

    if (evt.key == "w") {
        p1.pressUp = false;
    } else if (evt.key == "s") {
        p1.pressDown = false;
    }
    if (evt.key == "ArrowUp") {
        p2.pressUp = false;
    } else if (evt.key == "ArrowDown") {
        p2.pressDown = false;
    }


}
document.addEventListener("keyup", unpress, false);

//usefull functions:

function collide(player, ball){
    let playertop = player.y - (player.paddleheight /2);
    let playerbottom = player.y + (player.paddleheight /2);
    let playerleft = player.x - (player.paddlewidth/2);
    let playerright = player.x + (player.paddlewidth/2);

    let balltop = ball.y - ball.r;
    let ballbottom = ball.y + ball.r;
    let ballleft = ball.x - ball.r;
    let ballright = ball.x + ball.r;


    let collided = false;
    

    if(ballright > playerleft && ballleft < playerright && balltop < playerbottom && ballbottom > playertop){
        collided = true;
    }

    return collided;
}



class Paddle {
    constructor(x) {
        this.x = x;
        this.y = 250;
        this.paddlewidth = 30;
        this.paddleheight = 100;
        this.pressUp = false;
        this.pressDown = false;
        this.paddleSpeed = 10;
        this.score = 0;
    }

    show() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - (this.paddlewidth / 2), this.y - (this.paddleheight / 2), this.paddlewidth, this.paddleheight);
    }

    updatePosition() {

        if (this.pressUp) {
            if (this.y - (this.paddleheight / 2) > 0) {
                this.y -= this.paddleSpeed;
            }
        } if (this.pressDown) {
            if (this.y + (this.paddleheight / 2) < height) {
                this.y += this.paddleSpeed;
            }
        }
    }
}

class ScoreBoard {
    constructor() {
        this.message = p1.score + "   " + p2.score;
    }

    updateScore(player) {
        player.score += 1;
        this.message = p1.score + "   " + p2.score;
    }

    show() {
        ctx.font = "30px Verdana";
        ctx.fillStyle = "white";
        let msgWidth = ctx.measureText(this.message).width;
        ctx.fillText(this.message, 500 - (msgWidth / 2), 30);
    }
}

class Ball {
    constructor(color) {
        this.color = color;
        this.x = 500;
        this.y = 250;
        this.r = 10;
        this.ballspeed = 5;
        this.angle = 0;
        this.direction = 1;
        this.ydirection = 1;
    }

    update() {

        //boundaries checking
        if (this.x + this.r > width) {
            this.resetball();
            sc.updateScore(p1);
        }
        if (this.x - this.r < 0) {
            this.resetball();
            sc.updateScore(p2);
        }
        
        //player ball collisions
        if(collide(p1, this)){
            let collidepoint = this.y - p1.y;
            collidepoint = collidepoint / (p1.paddleheight/2);
            this.angle = (Math.PI/4) * collidepoint;
            this.ballspeed += 0.3;
            if(this.x > width/2){
      
                this.direction = -1;
            }else{
                this.direction = 1;
            }
        }

        if(collide(p2, this)){
            let collidepoint = this.y - p2.y;
            collidepoint = collidepoint / (p2.paddleheight/2);
 
        
            
            this.angle = (Math.PI/4) * collidepoint;
            this.ballspeed += 0.3;
            if(this.x > width/2){
                this.direction = -1;
            }else{
                this.direction = 1;
            }
        }


        
        let velx = this.ballspeed * Math.cos(this.angle) * this.direction;
        let vely = this.ballspeed * Math.sin(this.angle);

    
        if(this.y + this.r > height || this.y - this.r < 0){
            this.ydirection *= -1;
        }

        
    
        this.x += velx;
        this.y += vely * (this.ydirection);

        
        

    }

    resetball(){
        this.x= 500;
        this.y = 250;
        this.ballspeed = 5;
    }


    show() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();

    }
}


let p1 = new Paddle(20);
let p2 = new Paddle(980);
let sc = new ScoreBoard();
let b1 = new Ball("white");

function update() {
    p1.updatePosition();
    p2.updatePosition();
    b1.update();

}

butt1.onclick = function(){
    p1.score = 0;
    p2.score = 0;
    sc.message = p1.score + "   " + p2.score
    b1.x = 500;
    b1.y = 250;
};

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i <= height; i += 100) {
        ctx.fillStyle = "white";
        ctx.fillRect(498, i + 20, 8, 60);
    }

    p1.show();
    p2.show();
    sc.show();
    b1.show();
}


function gameloop() {
    window.requestAnimationFrame(gameloop);
    update();
    draw();
}


gameloop();