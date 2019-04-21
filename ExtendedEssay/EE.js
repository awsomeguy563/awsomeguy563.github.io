let ctx = document.getElementById("can").getContext("2d");
let can = document.getElementById("can");
let width = can.width;
let height = can.height;
let tiles = {};
let start = [1, 1];
let cols = 100;
let rows = 100;
let end = [100, 100];
let path = [];

class Tile {
    constructor(x1, y1, h) {
        this.color = "white";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x1 + (width / rows);
        this.y2 = y1 + (height / cols);
        this.id = [(x1 / (width / rows)) + 1, (y1 / (height / cols)) + 1];
        this.colorPerm = false;
        this.isObs = false;

        //For A* Algo
        this.g = 0;
        this.h = h;
        this.f = 0;
        this.parent = null;
    }
}

class Entity {
    constructor() {
        this.position = [1, 1];
    }

    Astar() {
        //each tile id = column, row


    }
}
// id for each tile based on coords [(x/20)+1, (y/20)+1]

function onMove(event) {
    let mx = event.clientX;
    let my = event.clientY;
    for (let tile in tiles) {
        if (mx <= tiles[tile].x2 && mx >= tiles[tile].x1 && my >= tiles[tile].y1 && my <= tiles[tile].y2) {
            if (!(tiles[tile].colorPerm)) {
                tiles[tile].color = "yellow";
            }
        } else {
            if (!(tiles[tile].colorPerm)) {
                tiles[tile].color = "white";
            }

        }
    }

}
can.addEventListener("mousemove", onMove, false);

function onClick(event) {
    console.log(1)
    let mx = event.clientX;
    let my = event.clientY;
    for (let tile in tiles) {
        if (mx <= tiles[tile].x2 && mx >= tiles[tile].x1 && my >= tiles[tile].y1 && my <= tiles[tile].y2) {
            if (tiles[tile].color != "black" && tiles[tile].colorPerm == false) {
                tiles[tile].colorPerm = true;
                tiles[tile].isObs = true;
                tiles[tile].color = "black";
            } else if (tiles[tile].color == "black") {
                tiles[tile].colorPerm = false;
                tiles[tile].isObs = false;
                tiles[tile].color = "white";
            }
        }
    }

}
can.addEventListener("mousedown", onClick, false);


for (let y = 0; y < can.height; y += (height / cols)) {
    for (let x = 0; x < can.width; x += (width / rows)) {
        let h = Math.abs((x / (width / rows)) + 1 - end[0]) + Math.abs((y / (height / cols)) + 1 - end[1]);
        tiles[[(x / (width / rows)) + 1, (y / (height / cols)) + 1]] = new Tile(x, y, h);
    }
}


tiles[start].colorPerm = true;
tiles[end].colorPerm = true;
tiles[start].color = "Chartreuse";
tiles[end].color = "red";

let e1 = new Entity();


console.log(tiles);

e1.Astar();


function update() {

}

let closedSet = [];
let openSet = [];
openSet.push(tiles[start]);
function draw() {
    for (let tile in tiles) {
        ctx.strokeStyle = "grey";
        ctx.fillStyle = tiles[tile].color;
        ctx.beginPath();
        ctx.rect(tiles[tile].x1, tiles[tile].y1, (width / rows), (height / cols));
        ctx.stroke();
        ctx.closePath();
        ctx.fillRect(tiles[tile].x1, tiles[tile].y1, (width / rows), (height / cols));
    }

    //A* algo id = col,row

    
    if (openSet.length > 0) {
        //finding least f in set
        let least = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[least].f) {
                least = i;
            }
        }

        let curr = openSet[least];
        console.log(curr);

        if (curr === tiles[end]) {
            var temp = curr;
            path = [];
            path.push(tiles[[1,1]]);
            while (temp.parent) {
                path.push(temp);
                temp = temp.parent;
            }
            console.log("done");
            openSet = [];
        }else{
            var temp = curr;
            path = [];
            path.push(tiles[[1,1]]);
            while (temp.parent) {
                path.push(temp);
                temp = temp.parent;
            }
        //deleting from Array and adding
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i] === curr) {
                openSet.splice(i, 1);
            }
        }

        closedSet.push(curr);

        //generating neighbours  
        let neighbours = []
        
        //LRUD neighbours
        if (curr.id[0] > 1) {
            neighbours.push(tiles[[[curr.id[0] - 1], curr.id[1]]]);
        }
        if (curr.id[0] < rows) {
            neighbours.push(tiles[[[curr.id[0] + 1], curr.id[1]]]);
        }
        if (curr.id[1] > 1) {
            neighbours.push(tiles[[[curr.id[0]], curr.id[1] - 1]]);
        }
        if (curr.id[1] < cols) {
            neighbours.push(tiles[[[curr.id[0]], curr.id[1] + 1]]);
        }

        //Diagonal neighbours
        if (curr.id[0] > 1 && curr.id[1] < cols) {
            neighbours.push(tiles[[[curr.id[0] - 1], curr.id[1] + 1]]);
        }
        if (curr.id[0] < rows && curr.id[1] < cols) {
            neighbours.push(tiles[[[curr.id[0] + 1], curr.id[1] + 1]]);
        }
        if (curr.id[0] > 1 && curr.id[1] > 1) {
            neighbours.push(tiles[[[curr.id[0] - 1], curr.id[1] - 1]]);
        }
        if (curr.id[0] < rows && curr.id[1] > 1) {
            neighbours.push(tiles[[[curr.id[0] + 1], curr.id[1] - 1]]);
        }
        console.log(neighbours);

        //Continuing algo
        for (let n in neighbours) {
            let ne = neighbours[n];
            if (!(closedSet.includes(ne))) {
                let gtent = curr.g + 1;
                if (openSet.includes(ne)) {
                    if (gtent < ne.g) {
                        ne.g = gtent;
                    }
                } else {
                    ne.g = gtent;
                    openSet.push(ne);
                    ne.f = ne.g + ne.h;
                    ne.parent = curr;
                }

            }
        }
    }


        console.log(closedSet);
        console.log(tiles);

    }



    for (let c in closedSet) {
        closedSet[c].color = "red";
    }
    for (let p in openSet) {
        openSet[p].color = "green";
    }

    for (let d in path) {
        path[d].color = "blue";
    }
}

let gameloop = function () {
    window.requestAnimationFrame(gameloop);
    update();
    draw();
}

gameloop();

/*log

- Implement proper drag feature
- Make entity use genetic algorithm to path find

*/
