let cellsize = 80;
let x = 0;
let y = 0;
let xs = 0;
let ys = 0;
let field = [];
let turn = 1;
let goodcell = [];
let checklist = [1, -1, 10, -10, 9, -9, 11, -11];
let okiteasist = 1;
let beforasist = 1;
let befor = null;


function setup() {
    createCanvas(windowWidth, windowHeight);
    cellSizeSetter();
    genField();
    console.log(field);
}

function draw() {
    mouse();
    background("green");
    // cell();
    fill(0);
    stone();
    selectCheck();
}

function genField() {
    for (let i = 0; i < 8; i++) {
        field.push(-2);
        for (let g = 0; g < 8; g++) {
            field.push(-1);
        }
        field.push(-2);
    }
    field[34] = 1;
    field[35] = 0;
    field[44] = 0;
    field[45] = 1;
}

/*
function cell() {
    for (let i = 0; i < Math.floor(windowWidth / cellsize); i++) {
        for (let g = 0; g < Math.floor(windowHeight / cellsize); g++) {
            // fill(255 * ((i + g + 1) % 2));
            fill("green")
            noStroke();
            rect(i * cellsize + xs, g * cellsize + ys, cellsize);
        }
    }
}
    */

function stone() {
    // fill(220)
    // noFill();
    strokeWeight(3);
    for (let i = 0; i < 8; i++) {
        for (let g = 0; g < 8; g++) {
                    stroke(220);
            switch (Math.floor(field[i * 10 + g + 1])) {
                case 0:
                    fill(0);
                    break;
                case 1:
                    fill(255);
                    break;
                case 3:
                    fill("red");
                    break;
                default:
                    noFill();
                    break;
            }
            if(i * 10 + g + 1 == befor && beforasist == 1) {
                    stroke("yellow");
            }
            circle(g * cellsize + cellsize / 2 + xs, i * cellsize + cellsize / 2 + ys, cellsize - 10);
        }
    }
}


function mouse() {
    x = Math.floor((mouseX - xs) / cellsize);
    y = Math.floor((mouseY - ys) / cellsize);
}

function mousePressed() {
    let temp = x + y * 10 + 1
    if (goodcell.indexOf(temp) != -1) {
        befor = temp;
        turnstone(temp);
        field[temp] = turn;
        turn = abs(turn - 1);
        goodcell = [];
    }
}

function turnstone(cell) {
    for (let i = 0; i < checklist.length; i++) {
        if (checker(cell, checklist[i]) == 1) {
            console.log(cell)
            for (let g = 1; field[cell + checklist[i] * g] != turn; g++) {
                field[cell + checklist[i] * g] = turn;
            }
        }
    }
}

function selectCheck() {
    for (let i = 0; i < field.length; i++) {
        if (field[i] == -1) {
            for (let g = 0; g < checklist.length; g++) {
                if (checker(i, checklist[g]) == 1) {
                    if (okiteasist == 1) {
                        fill("grey");
                        noStroke();
                        circle((i % 10 - 1) * cellsize + cellsize / 2 + xs, Math.floor(i / 10) * cellsize + cellsize / 2 + ys, cellsize - 50);
                    }
                    goodcell.push(i);

                }



            }
        }
    }
}

function checker(i, angle) {
    if (field[i + angle] == abs(turn - 1)) {
        let g;
        for (g = 1; field[i + angle * g] == abs(turn - 1); g++) { }
        if (field[i + angle * g] == turn) {
            return 1;

        }
    }
}

function windowResized() {
    // print("ウィンドウサイズの変更");
    resizeCanvas(windowWidth, windowHeight);
    cellSizeSetter();
}

function cellSizeSetter(){
    
    if(windowWidth>windowHeight){
        cellsize = windowHeight/10;
    }else{
        cellsize = windowWidth/10;

    }
    xs = windowWidth/2 -cellsize*4
    ys = windowHeight/2 -cellsize*4
}