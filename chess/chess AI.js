import * as ch from "./chess AI.js";



//Piece Objects for black Pieces - AI

export class BlackPawn {
    possibleMoves(tile) {
        let moves = [];
        let ld = (String.fromCharCode(tile.charCodeAt(0) - 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
        let rd = (String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
        let d = (String.fromCharCode(tile.charCodeAt(0))) + (parseInt(tile.slice(1, 2)) - 1).toString(10);
        let dd = (String.fromCharCode(tile.charCodeAt(0))) + (parseInt(tile.slice(1, 2)) - 2).toString(10);
        if (tile.slice(1, 2) == 2 && parseInt(tile.slice(1, 2)) > 1 && b1.board[uu].piece == null) {
            let m1 = tile.slice(0, 1);
            m1 = m1 + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            let m2 = tile.slice(0, 1);
            m2 = m2 + (parseInt(tile.slice(1, 2)) - 2).toString(10);
            moves.push(m1);
            moves.push(m2);
        }
        if (parseInt(tile.slice(1, 2)) > 1 && b1.board[u].piece == null) {
            let m1 = tile.slice(0, 1);
            m1 = m1 + (parseInt(tile.slice(1, 2)) - 1).toString(10);
            moves.push(m1);
        }
        if (tile.charCodeAt(0) > 97 && parseInt(tile.slice(1, 2)) > 0 && b1.board[lu].piece != null && b1.board[lu].piece.slice(0, 1) == "w") {
            moves.push(lu);
        }
        if (tile.charCodeAt(0) < 104 && parseInt(tile.slice(1, 2)) > 0 && b1.board[ru].piece != null && b1.board[ru].piece.slice(0, 1) == "w") {
            moves.push(ru);
        }
        //Add the special move of queening later - to do
        //console.log(moves);
        return moves;
    }
}

// pawn done

export class BlackKnight {
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
            if ((tempmoves[i].charCodeAt(0) > 96) && (tempmoves[i].charCodeAt(0) < 105) && (parseInt(tempmoves[i].slice(1, 2)) > 0) && (parseInt(tempmoves[i].slice(1, 3)) < 9)) {
                if (b1.board[tempmoves[i]].piece == null) {
                    moves.push(tempmoves[i]);
                } else {
                    if (b1.board[tempmoves[i]].piece.slice(0, 1) != "b") {
                        moves.push(tempmoves[i]);
                    }
                }
            }
        }
        return moves;
    }
}

//done knight

export class BlackRook {
    possibleMoves(tile) {
        let moves = [];
        //checking up
        if (parseInt(tile.slice(1, 2)) < 8) {
            let flagpiece = false;
            let cp = tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9) {
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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

//rook done

export class BlackBishop {
    possibleMoves(tile) {
        let moves = [];

        //checking up right
        if (parseInt(tile.slice(1, 2)) < 8 && tile.charCodeAt(0) < 104) {
            let flagpiece = false;
            let cp = (String.fromCharCode(tile.charCodeAt(0) + 1)) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9 && cp.slice(0, 1).charCodeAt(0) < 105) {
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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

//Bishop done

export class BlackKing {
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
                    if (b1.board[tempmoves[i]].piece.slice(0, 1) != "b") {
                        moves.push(tempmoves[i]);
                    }
                }
            }
        }
        return moves;
    }
}

// king done

export class BlackQueen {
    possibleMoves(tile) {
        let moves = [];

        //checking up
        if (parseInt(tile.slice(1, 2)) < 8) {
            let flagpiece = false;
            let cp = tile.slice(0, 1) + (parseInt(tile.slice(1, 2)) + 1).toString(10);
            while (!flagpiece && parseInt(cp.slice(1, 2)) < 9) {
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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
                if (b1.board[cp].piece != null) {
                    if (b1.board[cp].piece.slice(0, 1) == "b") {
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

export * from "./chess AI.js";




