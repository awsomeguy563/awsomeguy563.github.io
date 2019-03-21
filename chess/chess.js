let ctx = document.getElementById("can").getContext("2d");
let can = document.getElementById("can");
let width = can.width;
let height = can.height;

//Start creating the chess board black and white

let c = false;
for (let y = 0; y <= 800; y += 100) {
    for (let x = 0; x <= 800; x += 100) {
        if (c == true) {
            ctx.fillStyle = "white";
        } else {
            ctx.fillStyle = "grey";
        }
        ctx.fillRect(x, y, 100, 100);
        c = !c;
    }
}

class constraints {
    constructor(x1,x2,y1,y2,color) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.color = color;

    }
}

//Then start loading the image files for each piece - Done

//ChessBoard class
class ChessBoard {
    constructor() {
        this.board = {};
        let c = false;
        let c1 = false;
        let col1 = "";
        for (let i = 0; i <= 7; i++) {
            for (let j = 1; j <= 8; j++) {
                if (c == true) {
                    col1 = "grey";
                } else {
                    col1 = "white";
                }
                this.board[String.fromCharCode(97 + i).concat(`${j}`)] = new constraints((i *100),(i*100) + 100, (9-j)*100,((9-j)*100)-100, col1);
                c = !c;
            }
            c1 = !c1;
            if(c1 ==false){
                c = false;

            }else{
                c=true;

            }
        }
    }

    
}

//Creating the ChessBoard
 let b1 = new ChessBoard();

 //Detecting where mouse is on board

 can.addEventListener("mousemove",onMove,false);
 function onMove(event){
     mx = event.pageX;
     my = event.pageY;

     for(var key in b1.board){
         if(mx > b1.board[key].x1 && mx < b1.board[key].x2 && my < b1.board[key].y1 && my > b1.board[key].y2){
             console.log(key);
             ctx.fillStyle = "yellow";
             ctx.fillRect(b1.board[key].x1, b1.board[key].y2, 100, 100);
         }else{
            ctx.fillStyle = b1.board[key].color;
            ctx.fillRect(b1.board[key].x1, b1.board[key].y2, 100, 100);
         }
     }

     console.log(mx, my);
 }


 //Loading piece images into the game

 

 
 

