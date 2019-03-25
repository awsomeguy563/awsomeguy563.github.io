
//Setting up the Canvas
let ctx = document.getElementById("can").getContext("2d");
let can = document.getElementById("can");
let width = can.width;
let height = can.height;

//Loading in the images
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
let frame = new Image;
frame.src = "pics/pixil-frame-0.png";

//Global move count variable
let movecount = 0;

//Dictionary to easily refer to the piece images
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

//Start creating the chess board, which consists of tiles
class tile {
    constructor(x1, x2, y1, y2, oricolor, currcolor, piece, pieceObj) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.oricolor = oricolor;
        this.currcolor = currcolor;
        this.piece = piece;
        this.pieceObj = pieceObj;
        this.frame = false;

    }
}
//ChessBoard class
let c = false;
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
                this.board[String.fromCharCode(97 + i).concat(`${j}`)] = new tile((i * 100), (i * 100) + 100, (9 - j) * 100, ((9 - j) * 100) - 100, col1, col1);
                c = !c;
            }
            c1 = !c1;
            if (c1 == false) {
                c = false;

            } else {
                c = true;

            }
        }
    }
}

//All the piece objects - Consists of their possible moves
class Pawn {
    possibleMoves(tile) {
        let moves = [];
        let lu = (String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
        let ru = (String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
        let u = (String.fromCharCode(tile.charCodeAt(0))) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
        let uu = (String.fromCharCode(tile.charCodeAt(0))) + (parseInt(tile.slice(1, 2)) + 2).toString(10);
        if (tile.slice(1, 2) == 2 && parseInt(tile.slice(1, 2)) < 8 && b1.board[uu].piece == null) {
            let m1 = tile.slice(0, 1);
            m1 = m1 + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            let m2 = tile.slice(0, 1);
            m2 = m2 + (parseInt(tile.slice(1, 2)) + 2).toString(10);
            moves.push(m1);
            moves.push(m2);
        }
        if (parseInt(tile.slice(1, 2)) < 8 && b1.board[u].piece == null) {
            let m1 = tile.slice(0, 1);
            m1 = m1 + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            moves.push(m1);
        }
        if (tile.charCodeAt(0) > 97 && parseInt(tile.slice(1, 2)) < 8 && b1.board[lu].piece != null && b1.board[lu].piece.slice(0, 1) == "b") {
            moves.push(lu);
        }
        if (tile.charCodeAt(0) < 104 && parseInt(tile.slice(1, 2)) < 8 && b1.board[ru].piece != null && b1.board[ru].piece.slice(0, 1) == "b") {
            moves.push(ru);
        }
        //Add the special move of queening later - to do
        console.log(moves);
        return moves;
    }
}

class Knight {
    possibleMoves(tile) {
        let moves = [];
        //generating temporary moves
        let tempmoves = [];
        //upr1
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) + 2).toString(10));
        //upr2
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) + 2)) + (parseInt(tile.slice(1, 2)) + 1).toString(10));
        //upl1
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) + 2).toString(10));
        //upl2
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) - 2)) + (parseInt(tile.slice(1, 2)) + 1).toString(10));
        //dor1
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) - 2).toString(10));
        //dor2
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) + 2)) + (parseInt(tile.slice(1, 2)) - 1).toString(10));
        //dol1
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) - 2).toString(10));
        //dol2
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) - 2)) + (parseInt(tile.slice(1, 2)) - 1).toString(10));

        //filtering moves
        for (let i = 0; i < tempmoves.length; i++) {
            console.log("Bo beep: " + tempmoves[i]);
            if ((tempmoves[i].charCodeAt(0) > 96) && (tempmoves[i].charCodeAt(0) < 105) && (parseInt(tempmoves[i].slice(1, 2)) > 0) && (parseInt(tempmoves[i].slice(1, 3)) < 9)) {
                console.log("Bo beep: " + tempmoves[i], parseInt(tempmoves[i].slice(1, 2)));
                if (b1.board[tempmoves[i]].piece == null) {
                    moves.push(tempmoves[i]);
                } else {
                    if (b1.board[tempmoves[i]].piece.slice(0, 1) != "w") {
                        moves.push(tempmoves[i]);
                    }
                }
            }
        }
        return moves;
    }
}

class Rook {
    possibleMoves(tile) {
        let moves = [];
        //checking up
        if (parseInt(tile.slice(1, 2)) < 8) {
            let flagpiece = false;
            let cp = tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = cp.slice(0, 1) + (parseInt(cp.slice(1, 2)) + 1).toString(10);
                }
            }
        }
        //Checking up done

        //checking down
        if (parseInt(tile.slice(1, 2)) > 1) {
            let flagpiece = false;
            let cp = tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) > 0) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = cp.slice(0, 1) + (parseInt(cp.slice(1, 2)) - 1).toString(10);
                }
            }
        }
        //Checking down done

        //checking right
        if (tile.charCodeAt(0) < 104) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) + 1)) + tile.slice(1, 2);
            while (!flagpiece && cp.slice(0, 1).charCodeAt(0) < 105) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) + 1)) + cp.slice(1, 2);
                }
            }
        }
        //Checking right done

        //checking left
        if (tile.charCodeAt(0) > 97) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) - 1)) + tile.slice(1, 2);
            while (!flagpiece && cp.slice(0, 1).charCodeAt(0) > 96) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) - 1)) + cp.slice(1, 2);
                }
            }
        }
        //Checking left done
        return moves;
    }
}

class Bishop {
    possibleMoves(tile) {
        let moves = [];

        //checking up right
        if (parseInt(tile.slice(1, 2)) < 8 && tile.charCodeAt(0) < 104) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9 && cp.slice(0, 1).charCodeAt(0) < 105) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) + 1)) + (parseInt(cp.slice(1, 2)) + 1).toString(10);
                }
            }
        }
        //Checking up right done

        //checking up left
        if (parseInt(tile.slice(1, 2)) < 8 && tile.charCodeAt(0) > 97) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9 && cp.slice(0, 1).charCodeAt(0) > 96) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) - 1)) + (parseInt(cp.slice(1, 2)) + 1).toString(10);
                }
            }
        }
        //Checking up left done

        //checking down right
        if (parseInt(tile.slice(1, 2)) > 1 && tile.charCodeAt(0) < 104) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) > 0 && cp.slice(0, 1).charCodeAt(0) < 105) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) + 1)) + (parseInt(cp.slice(1, 2)) - 1).toString(10);
                }
            }
        }
        //Checking down right done

        //checking down left
        if (parseInt(tile.slice(1, 2)) > 1 && tile.charCodeAt(0) > 97) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) > 0 && cp.slice(0, 1).charCodeAt(0) > 96) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) - 1)) + (parseInt(cp.slice(1, 2)) - 1).toString(10);
                }
            }
        }
        //Checking down left done
        return moves;
    }
}

class King {
    possibleMoves(tile) {
        let moves = [];

        //generating temporary moves
        let tempmoves = [];
        //up
        tempmoves.push(tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) + 1).toString(10));
        //up right
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10));
        //up left
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10));
        //down
        tempmoves.push(tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) - 1).toString(10));
        //down right
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10));
        //down left
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10));
        //right
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) + 1)) + tile.slice(1, 2));
        //left
        tempmoves.push((String.fromCharCode(tile.charCodeAt(0) - 1)) + tile.slice(1, 2));

        //filtering moves
        for (let i = 0; i < tempmoves.length; i++) {
            if (tempmoves[i].charCodeAt(0) > 96 && tempmoves[i].charCodeAt(0) < 105 && parseInt(tempmoves[i].slice(1, 2)) > 0 && parseInt(tempmoves[i].slice(1, 2)) < 9) {
                if (b1.board[tempmoves[i]].piece == null) {
                    moves.push(tempmoves[i]);
                } else {
                    if (b1.board[tempmoves[i]].piece.slice(0, 1) != "w") {
                        moves.push(tempmoves[i]);
                    }
                }
            }
        }
        return moves;
    }
}

class Queen {
    possibleMoves(tile) {
        let moves = [];

        //checking up
        if (parseInt(tile.slice(1, 2)) < 8) {
            let flagpiece = false;
            let cp = tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = cp.slice(0, 1) + (parseInt(cp.slice(1, 2)) + 1).toString(10);
                }
            }
        }
        //Checking up done

        //checking down
        if (parseInt(tile.slice(1, 2)) > 1) {
            let flagpiece = false;
            let cp = tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) > 0) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = cp.slice(0, 1) + (parseInt(cp.slice(1, 2)) - 1).toString(10);
                }
            }
        }
        //Checking down done

        //checking right
        if (tile.charCodeAt(0) < 104) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) + 1)) + tile.slice(1, 2);
            while (!flagpiece && cp.slice(0, 1).charCodeAt(0) < 105) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) + 1)) + cp.slice(1, 2);
                }
            }
        }
        //Checking right done

        //checking left
        if (tile.charCodeAt(0) > 97) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) - 1)) + tile.slice(1, 2);
            while (!flagpiece && cp.slice(0, 1).charCodeAt(0) > 96) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) - 1)) + cp.slice(1, 2);
                }
            }
        }
        //Checking left done

        //checking up right
        if (parseInt(tile.slice(1, 2)) < 8 && tile.charCodeAt(0) < 104) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9 && cp.slice(0, 1).charCodeAt(0) < 105) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) + 1)) + (parseInt(cp.slice(1, 2)) + 1).toString(10);
                }
            }
        }
        //Checking up right done

        //checking up left
        if (parseInt(tile.slice(1, 2)) < 8 && tile.charCodeAt(0) > 97) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9 && cp.slice(0, 1).charCodeAt(0) > 96) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) - 1)) + (parseInt(cp.slice(1, 2)) + 1).toString(10);
                }
            }
        }
        //Checking up left done

        //checking down right
        if (parseInt(tile.slice(1, 2)) > 1 && tile.charCodeAt(0) < 104) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) > 0 && cp.slice(0, 1).charCodeAt(0) < 105) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) + 1)) + (parseInt(cp.slice(1, 2)) - 1).toString(10);
                }
            }
        }
        //Checking down right done

        //checking down left
        if (parseInt(tile.slice(1, 2)) > 1 && tile.charCodeAt(0) > 97) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) > 0 && cp.slice(0, 1).charCodeAt(0) > 96) {
                console.log(cp, b1.board[cp].piece);
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "w") {
                        flagpiece = true;
                    } else {
                        moves.push(cp);
                        flagpiece = true;
                    }
                } else {
                    moves.push(cp);
                    cp = (String.fromCharCode(cp.charCodeAt(0) - 1)) + (parseInt(cp.slice(1, 2)) - 1).toString(10);
                }
            }
        }
        //Checking down left done

        return moves;
    }
}

//Event listeners for the canvas

can.addEventListener("mousemove", onMove, false);
function onMove(event) {
    mx = event.pageX;
    my = event.pageY;
}

//Detecting where mouse is on board
can.addEventListener("mousedown", onClick, false);
/*To keep track of which click num and tile/piece clicked
0: nothing
1: pick up
*/

let clickNum = 0;
let preTile = null;
let prePiece = null;

function onClick(event) {
    console.log("clicked");

    mx = event.pageX;
    my = event.pageY;
    let tile = null;
    for (let key in b1.board) {
        if (mx > b1.board[key].x1 && mx < b1.board[key].x2 && my < b1.board[key].y1 && my > b1.board[key].y2) {
            tile = key;
        }
    }
    if (clickNum == 0) {
        console.log(tile, tile.piece);
        if (b1.board[tile].piece == null) {

        } else {
            if (b1.board[tile].piece.slice(0, 1) === "w") {
                console.log("hi");
                displayPossibleMoves(b1.board[tile].piece, tile);
                clickNum = 1;
                preTile = tile;
                prePiece = b1.board[tile].piece;
                b1.board[preTile].currcolor = "green";
            }
        }
        //Time to put rules and stuff 
    } else if (clickNum == 1) {

        //Check if move is valid -  to do,
        let moves = [];
        moves = returnPossibleMoves(b1.board[preTile].piece, preTile);

        if (moves.includes(tile)) {
            ctx.fillStyle = b1.board[preTile].color;
            ctx.fillRect(b1.board[preTile].x1, b1.board[preTile].y2, 100, 100);
            b1.board[preTile].piece = null;
            b1.board[preTile].pieceObj = null;
            console.log(tile, prePiece);
            placePiece(tile, prePiece);
            console.log(tile, b1.board[tile].piece, b1.board[tile].pieceObj);
            b1.board[preTile].currcolor = b1.board[preTile].oricolor;
            clickNum = 0;
            preTile = null;
            prePiece = null;
            movecount++;
            console.log("move count: " + movecount);


        } else {
            b1.board[preTile].currcolor = b1.board[preTile].oricolor;
            clickNum = 0;
            preTile = null;
            prePiece = null;
            movecount++;
        }
        for (let i = 0; i < moves.length; i++) {
            b1.board[moves[i]].frame = false;
        }

    }

}


//Commonly used functions
function placePiece(tile, piece) {
    b1.board[tile].piece = piece;
    if (piece.slice(1, 2) == "p") {
        b1.board[tile].pieceObj = new Pawn();
    } else if (piece.slice(1, 2) == "r") {
        b1.board[tile].pieceObj = new Rook();
    } else if (piece.slice(1, 2) == "n") {
        b1.board[tile].pieceObj = new Knight();
    } else if (piece.slice(1, 2) == "b") {
        b1.board[tile].pieceObj = new Bishop();
    } else if (piece.slice(1, 2) == "k") {
        b1.board[tile].pieceObj = new King();
    } else if (piece.slice(1, 2) == "q") {
        b1.board[tile].pieceObj = new Queen();
    }
}

function drawPiece(tile, piece) {
    ctx.drawImage(pieceDic[piece], b1.board[tile].x1, b1.board[tile].y2, 100, 100);
}

function displayPossibleMoves(piece, tile) {

    //moves consists of tiles, the places the piece can go to
    let moves = [];

    console.log(tile, b1.board[tile].pieceObj);


    //Find possible moves
    moves = [...b1.board[tile].pieceObj.possibleMoves(tile)];

    console.log(moves);


    //Display on the board
    for (let i = 0; i < moves.length; i++) {
        b1.board[moves[i]].frame = true;
    }

}

function returnPossibleMoves(piece, tile) {
    let moves = [];
    moves = (b1.board[tile].pieceObj.possibleMoves(tile));
    return moves;
}

//Creating all the actual chess objects and setting up the starting position of the board

//Creating the ChessBoard
let b1 = new ChessBoard();

//White pawns
for (let i = 1; i <= 8; i++) {
    placePiece(String.fromCharCode(97 + i - 1).concat(`${2}`), "wp");
}
//Black pawns
for (let i = 1; i <= 8; i++) {
    placePiece(String.fromCharCode(97 + i - 1).concat(`${7}`), "bp");
}

//Starting positions

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





//Game loop, can also create an update function if wanted
function update(){

}

function draw() {
    for (let key in b1.board) {
        ctx.fillStyle = b1.board[key].currcolor;
        ctx.fillRect(b1.board[key].x1, b1.board[key].y2, 100, 100);
        if (b1.board[key].piece) {
            drawPiece(key, b1.board[key].piece);
        }
        if (b1.board[key].frame) {
            ctx.drawImage(frame, b1.board[key].x1, b1.board[key].y2, 100, 100);
        }
    }
}

let gameloop = function () {
    window.requestAnimationFrame(gameloop);
    update();
    draw();
}

gameloop();










