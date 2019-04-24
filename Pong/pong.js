var c = document.getElementById("can");
var ctx = c.getContext("2d");
let width = can.width;
let height = can.height;
var blip = new Audio('blip.wav');
let butt1 = document.getElementById("restart");


//Input handling:

function press(evt) {

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

function collide(player, ball) {
    let playertop = player.y - (player.paddleheight / 2);
    let playerbottom = player.y + (player.paddleheight / 2);
    let playerleft = player.x - (player.paddlewidth / 2);
    let playerright = player.x + (player.paddlewidth / 2);

    let balltop = ball.y - ball.r;
    let ballbottom = ball.y + ball.r;
    let ballleft = ball.x - ball.r;
    let ballright = ball.x + ball.r;


    let collided = false;


    if (ballright > playerleft && ballleft < playerright && balltop < playerbottom && ballbottom > playertop) {
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

        if (this === p1) {
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

        if (this === p2) {
            let computerlevel = 0.2;
            this.y += (b1.y - this.y) * computerlevel;
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
        this.ballspeed = 8;
        this.velx = 6;
        this.vely = 0;
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

        if (this.y + this.r >= height) {
            console.log(1);
            this.y = height - this.r;
            this.vely *= -1;
        }
        if (this.y - this.r < 0) {
            console.log(1);
            this.y = 0 + this.r;
            this.vely *= -1;
        }

        //player ball collisions

        let player;
        if (this.x + this.r > width / 2) {
            player = p2;
        } else {
            player = p1;
        }

        console.log

        if (collide(player, this)) {
            let collidepoint = this.y - player.y;
            collidepoint = collidepoint / (player.paddleheight / 2);
            let angle = (Math.PI / 4) * collidepoint;
            let direction;
            if (this.x + this.r > width / 2) {
                direction = -1
            } else {
                direction = 1;
            }
            this.velx = this.ballspeed * Math.cos(angle) * direction;
            this.vely = this.ballspeed * Math.sin(angle);
            this.ballspeed += 0.3;
        }

        this.x += this.velx;
        this.y += this.vely;
    }

    resetball() {
        this.x = 500;
        this.y = 250;
        this.vely = 0;
        this.velx *= -1;
        this.ballspeed = 8;
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

butt1.onclick = function () {
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

/*To do (Also for EE)
- Learn all about Javascript modules
- Learn about neural networks and make notes and record sources
- Learn about genetic algorithms and make notes and record sources
- Learn and code a GANN and train it for this pong game ^


*/
