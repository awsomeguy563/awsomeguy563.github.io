var c = document.getElementById("can");
var ctx = c.getContext("2d");
let width = can.width;
let height = can.height;
var blip = new Audio('blip.wav');


//Input handling:

function press(evt) {

    if (evt.key == "r") {
        p1.pressUp = true;
    } else if (evt.key == "f") {
        p1.pressDown = true;
    }
    if (evt.key == "u") {
        p2.pressUp = true;
    } else if (evt.key == "h") {
        p2.pressDown = true;
    }


}
document.addEventListener("keydown", press, false);

function unpress(evt) {

    if (evt.key == "r") {
        p1.pressUp = false;
    } else if (evt.key == "f") {
        p1.pressDown = false;
    }
    if (evt.key == "u") {
        p2.pressUp = false;
    } else if (evt.key == "h") {
        p2.pressDown = false;
    }


}
document.addEventListener("keyup", unpress, false);



class Paddle {
    constructor(x) {
        this.x = x;
        this.y = 250;
        this.paddlewidth = 20;
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
        this.ballspeedx = 7;
        this.ballspeedy = 7;
    }

    update() {
        //boundaries
        if (this.x + this.r >= width) {
            this.x = 500;
            this.ballspeedx = 7;
            this.ballspeedy = 7;
            sc.updateScore(p1);
        }
        if (this.x - this.r <= 0) {
            this.x = 500;
            this.ballspeedx = 7;
            this.ballspeedy = 7;
            sc.updateScore(p2);
        }
        if (this.y + this.r >= height) {
            this.ballspeedy *= -1;
        }
        if (this.y - this.r <= 0) {
            this.ballspeedy *= -1;
        }
        //player hit
        if (this.x + this.r >= p2.x - (p2.paddlewidth / 2)) {
            if (this.y > p2.y - (p2.paddleheight / 2) && this.y < (p2.y + (p2.paddleheight / 2)) - 80) {
                console.log("ex hit");
                blip.play();
                this.ballspeedx *= -1;
                this.ballspeedy *= 1.1;
            }
            if (this.y < (p2.y + (p2.paddleheight / 2)) && this.y > (p2.y - (p2.paddleheight / 2)) + 80) {
                console.log("ex hit");
                blip.play();
                this.ballspeedx *= -1;
                this.ballspeedy *= 1.1;
            }
            if (this.y < (p2.y + (p2.paddleheight / 2) - 20) && this.y > (p2.y - (p2.paddleheight / 2)) + 20) {
                console.log("hit");
                blip.play();
                this.ballspeedx *= -1;
            }

        }
        if (this.x - this.r <= p1.x + (p1.paddlewidth / 2)) {
            if (this.y > p1.y - (p1.paddleheight / 2) && this.y < (p1.y + (p1.paddleheight / 2)) - 80) {
                console.log("ex hit");
                blip.play();
                this.ballspeedx *= -1;
                this.ballspeedy *= 1.1;
            }
            if (this.y < (p1.y + (p1.paddleheight / 2)) && this.y > (p1.y - (p1.paddleheight / 2)) + 80) {
                console.log("ex hit");
                blip.play();
                this.ballspeedx *= -1;
                this.ballspeedy *= 1.1;
            }
            if (this.y < (p1.y + (p1.paddleheight / 2) - 20) && this.y > (p1.y - (p1.paddleheight / 2)) + 20) {
                console.log("hit");
                blip.play();
                this.ballspeedx *= -1;
            }

        }

        this.x += this.ballspeedx;
        this.y += this.ballspeedy;

    }


    show() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
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
