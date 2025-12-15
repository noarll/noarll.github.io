let cellsize, xs, ys;
let state = 0;
let x = 0;
let y = 0;
let field = [];
let circlesize = 0.8;
let turn = 1;
let goodcell = [];
let checklist = [1, -1, 10, -10, 9, -9, 11, -11];
let okiteasist = 1;
let asistcircle = 0.5;
let beforasist = 1;
let befor = null;
let skip = 0;
let stop = 0;
let selectcell = 0;
let mouselp = 0;


function setup() {
    createCanvas(windowWidth, windowHeight);
    cellSizeSetter();
    genField();
    textAlign(CENTER,CENTER);
}

function draw() {
    console.log(turn)
    mouse();
    background("green");
    // cell();
    switch (state) {
        case 0:
            selectCheck();
            getSelect();
            Cellchanger();
            break;
        case 1:
            break;
        case 2:
            if (skip == 0) {
                stop = frameCount;
                skip = 1;
            }
            if (frameCount - stop >= 100) {
                state = 0;
            }
            break;
            case 3:
                break;
    }
    stone();
    if(state == 2){
            fill(255);
            rect(windowWidth/2-75, windowHeight/2-50, 150, 100, 30);
            fill(0);
            textSize(30);
            text("SKIP", windowWidth/2, windowHeight/2);
        
    }
    changeturn();
    /*
    if (skip == 1) {
        rect(windowWidth, windowHeight, 150, 100);
        text("SKIP", windowWidth, windowHeight);
        skip == 2
        state = 0;
        // turn = abs(turn -1);
    }
        */

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

function cell() {
    for (let i = 0; i < Math.floor(windowWidth / cellsize); i++) {
        for (let g = 0; g < Math.floor(windowHeight / cellsize); g++) {
            // fill(255 * ((i + g + 1) % 2));
            fill("green")
            if ((i + g) % 2 == 0) {
                fill("#00ff00")
            } else {
                fill("#005500");
            }
            noStroke();
            rect(i * cellsize + xs, g * cellsize + ys, cellsize);
        }
    }
}

function stone() {
    strokeWeight(cellsize * 0.04);
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
                case -3:
                    fill("grey");
                    noStroke();
                    circle(g * cellsize + cellsize / 2 + xs, i * cellsize + cellsize / 2 + ys, cellsize * asistcircle);
                    field[i * 10 + g + 1] = -1
                    stroke(220);
                    noFill();
                    break;
                default:
                    noFill();
                    break;
            }
            if (i * 10 + g + 1 == befor && beforasist == 1) {
                stroke("yellow");
            }
            circle(g * cellsize + cellsize / 2 + xs, i * cellsize + cellsize / 2 + ys, cellsize * circlesize);
        }
    }
}


function mouse() {
    x = Math.floor((mouseX - xs) / cellsize);
    y = Math.floor((mouseY - ys) / cellsize);
}

function getSelect(){
    if(mouselp == 1){
        mouselp = 0;
    if (keyIsPressed == true) {
        switch (key) {
            case 0:
                field[x + y * 10 + 1] = 0;
                console.log(1)
            case 1:
                field[x + y * 10 + 1] = 1;
                console.log(1)
            default:
                selectcell = x + y * 10 + 1
        }
    } else {
        selectcell = x + y * 10 + 1

    }

    }
}

function mouseReleased() {
    mouselp = 1;

    /*
    if (keyIsPressed == true) {
        console.log(0)
        switch (key) {
            case 0:
                field[x + y * 10 + 1] = 0;
                console.log(1)
            case 1:
                field[x + y * 10 + 1] = 1;
                console.log(1)
            default:
                selectcell = x + y * 10 + 1
        }
    } else {
        selectcell = x + y * 10 + 1

    }
*/

    // selectCell(temp);
    /*
    if (goodcell.indexOf(temp) != -1) {
        befor = temp;
        turnstone(temp);
        field[temp] = turn;
        turn = abs(turn - 1);
        goodcell = [];
    }
         */
}

// function mouseReleased(){
    // mouselp = 0;
// }


function Cellchanger() {
    if (selectcell != 0) {
        selectCell(selectcell);
    }
}

function selectCell(temp) {
    if (goodcell.indexOf(temp) != -1) {
        befor = temp;
        turnstone(temp);
        field[temp] = turn;
        // turn = abs(turn - 1);
        goodcell = [];
        // console.log("change colect!!");
    } else {
        selectcell = 0;
        // console.log("change faild");
    }
}

function turnstone(cell) {
    for (let i = 0; i < checklist.length; i++) {
        if (checker(cell, checklist[i]) == 1) {
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
                        field[i] = -3
                        skip = 0;
                    }
                    goodcell.push(i);
                }
            }
        }
    }
    if (goodcell.length == 0) {
        if (skip == 0) {
            state = 2;
            console.log(100)
        }else{
            state = 3;
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

    return 0;
}

function changeturn() {
    if (selectcell != 0 || (state == 2&&skip == 0)) {
        turn = abs(turn - 1);
        selectcell = 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cellSizeSetter();
}

function cellSizeSetter() {

    if (windowWidth > windowHeight) {
        cellsize = windowHeight / 10;
    } else {
        cellsize = windowWidth / 10;
    }
    xs = windowWidth / 2 - cellsize * 4
    ys = windowHeight / 2 - cellsize * 4
}