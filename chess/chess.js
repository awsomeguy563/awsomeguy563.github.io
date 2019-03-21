let ctx = document.getElementById("can").getContext("2d");
let can = document.getElementById("can");
let width = can.width;
let height = can.height;

let wpawn = new Image;
wpawn.src = "pics/WhitePawn.png";
let wrook = new Image;
wrook.src = "pics/WhiteRook.png";
let wknight = new Image;
wknight.src = "pics/WhiteKnight.png";
let wbishop = new Image;
wbishop.src = "pics/WhiteBishop.png";
let wking = new Image;
wking.src = "pics/WhiteKing.png";
let wqueen = new Image;
wqueen.src = "pics/WhiteQueen.png";
let bpawn = new Image;
bpawn.src = "pics/BlackPawn.png";
let brook = new Image;
brook.src = "pics/BlackRook.png";
let bknight = new Image;
bknight.src = "pics/BlackKnight.png";
let bbishop = new Image;
bbishop.src = "pics/BlackBishop.png";
let bking = new Image;
bking.src = "pics/BlackKing.png";
let bqueen = new Image;
bqueen.src = "pics/BlackQueen.png";


let pieceDic = {}
pieceDic["wp"] = wpawn;
pieceDic["wr"] = wrook;
pieceDic["wn"] = wknight;
pieceDic["wb"] = wbishop;
pieceDic["wk"] = wking;
pieceDic["wq"] = wqueen;
pieceDic["bp"] = bpawn;
pieceDic["br"] = brook;
pieceDic["bn"] = bknight;
pieceDic["bb"] = bbishop;
pieceDic["bk"] = bking;
pieceDic["bq"] = bqueen;

//Start creating the chess board black and white

let c = false;

class tile{
    constructor(x1,x2,y1,y2,oricolor,currcolor,piece) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.oricolor = oricolor;
        this.currcolor = currcolor;
        this.piece = piece;

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
                    col1 = "white";
                } else {
                    col1 = "grey";
                }
                this.board[String.fromCharCode(97 + i).concat(`${j}`)] = new tile((i *100),(i*100) + 100, (9-j)*100,((9-j)*100)-100, col1,col1);
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
 }

 can.addEventListener("mousedown", onClick, false);
 /*To keep track of which click num and tile/piece clicked
 0: nothing
 1: pick up
 */

 let clickNum = 0;
 let preTile = null;
 let prePiece = null;

 function onClick(event){
    console.log("clicked");
    
    mx = event.pageX;
    my = event.pageY;
    let tile = null;
    for(let key in b1.board){
        if(mx > b1.board[key].x1 && mx < b1.board[key].x2 && my < b1.board[key].y1 && my > b1.board[key].y2){
            tile = key;
        }
    }
    if(clickNum == 0){
        console.log(tile);
        if(tile.piece == null){}
        clickNum = 1;
        preTile = tile;
        prePiece = b1.board[tile].piece;
        b1.board[preTile].currcolor = "green";
    }else if(clickNum == 1){
        ctx.fillStyle = b1.board[preTile].color;
        ctx.fillRect(b1.board[preTile].x1, b1.board[preTile].y2, 100, 100);
        b1.board[preTile].piece = null;
        console.log(tile, prePiece);
        placePiece(tile, prePiece);
        b1.board[preTile].currcolor = b1.board[preTile].oricolor;
        clickNum = 0;
        preTile = null;
        prePiece = null;
    }

}

 

 function placePiece(tile, piece){
     b1.board[tile].piece = piece;
 }

 function drawPiece(tile, piece){
    ctx.drawImage(pieceDic[piece], b1.board[tile].x1, b1.board[tile].y2, 100, 100);
 }

  //White pawns
  for(let i = 1; i <= 8; i++){
    b1.board[String.fromCharCode(97 + i -1).concat(`${2}`)].piece = "wp";
 }
 //Black pawns
 for(let i = 1; i <= 8; i++){
     b1.board[String.fromCharCode(97 + i -1).concat(`${7}`)].piece = "bp";
  }

  //White Rooks
  placePiece("a1", "wr");
  placePiece("h1", "wr");

  //White Knights
  placePiece("b1", "wn");
  placePiece("g1", "wn");

  //White Bishops
  placePiece("c1", "wb");
  placePiece("f1", "wb");

  //White King
  placePiece("d1", "wk");

  //White Queen
  placePiece("e1", "wq");



  //BlackRooks
  placePiece("a8", "br");
  placePiece("h8", "br");

  //Black Knights
  placePiece("b8", "bn");
  placePiece("g8", "bn");

  //Black Bishops
  placePiece("c8", "bb");
  placePiece("f8", "bb");

  //Black King
  placePiece("d8", "bk");


  //Black Queen
  placePiece("e8", "bq");

 function draw(){
    for(let key in b1.board){
        ctx.fillStyle = b1.board[key].currcolor;
        ctx.fillRect(b1.board[key].x1, b1.board[key].y2, 100, 100);
        if(b1.board[key].piece){
            drawPiece(key, b1.board[key].piece);
        }
    }
 }

 let gameloop = function(){
    window.requestAnimationFrame(gameloop);
    draw();
  }
  
  gameloop();




 
 

 
 
 
