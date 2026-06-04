let button;
let w = 50;
let h = 30;
let size = 15;
let field = [];
let xs = 0;
let ys = 0;
let x = 0;
let y = 0;
let state = 0;
let color = -1;
let mp = 0;
let moused = false;
let t = 0;

function setup() {
    createCanvas(windowWidth, windowHeight - 30);
    makecell();
    state = 0;
}

function makecell() {
    field = [];
    for (let i = 0; i < w + 1; i++) {
        field.push([]);
        for (let g = 0; g < h + 1; g++) {
            field[i].push(0);
        }
    }
}

function draw() {
    t++;
    background(220);
    mouse();
    switch (state) {
        case 0:
            break;
        case 1:
            stepup();
            break;
    }
    clicked();

    drawCell();
    fill(0);
}

function mouse() {
    x = Math.floor((mouseX - xs) / size);
    y = Math.floor((mouseY - ys) / size);
}

function clicked() {
    if (mp >= 1) {
        if (x > 0 && x < w && y > 0 && y < h) {

            if (color == -1) {
                color = abs(field[x][y] - 1);
            }
            field[x][y] = color;
        } else {
            if (mp == 1) {
                state = abs(state - 1);
                console.log(12);
            }
        }
    } else {
        color = -1;
    }
    mp = mp * 2;
    if(moused){
        mp = 0;
        moused = false;
    }
}

function mousePressed() {
    if (mp == 0) {
        mp = 1;
    } else {
        mp = 2;
    }
}

function mouseReleased() {
    // mp = 0;
    moused = true;
}




function drawCell() {
    if(state == 0){
        stroke(0);
    }else{
        stroke("#ff0000");
    }
    for (let i = 1; i < w; i++) {
        for (let g = 1; g < h; g++) {
            if (field[i][g] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * size, g * size, size);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight - 30);
}

function keyPressed() {
    if (key === " ") {
        state = abs(state - 1);
    }
    if (key === "r") {
        setup();
    }
}

function keyReleased() {
    if (key === " ") {
        // state = abs(state - 1);
    }
}

function stepup() {
    if (t % 2 == 0) {
        for (let i = 1; i < w; i++) {
            for (let g = 1; g < h; g++) {
                let temp = aroundCells(i, g)
                if (field[i][g] == 1) {
                    if (temp == 2 || temp == 3) {
                        field[i][g] += 10;
                    }
                    else {
                        // console.log(i + ":" + g);
                        // field[i][g] += 3;
                    }
                } else {
                    if (temp == 3) {
                        field[i][g] += 10;
                    } else {
                        field[i][g] += 0;
                    }

                }
            }
        }

        for (let i = 0; i < w; i++) {
            for (let g = 0; g < h; g++) {
                field[i][g] = floor(field[i][g] / 10);
            }
        }
    }
}

function aroundCells(cellx, celly) {
    let temp = 0;
    let aaaa = 0;

    for (let i = 0; i < 3; i++) {
        for (let g = 0; g < 3; g++) {
            if (i * g != 1) {
                temp += (field[cellx + g - 1][celly + i - 1] % 10);
            }
        }
    }
    return temp;
}