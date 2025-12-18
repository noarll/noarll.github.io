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

function setup() {
    createCanvas(windowWidth, windowHeight-30);

    // button = createButton("click me");
    // button.position(0, 100);
    makecell();
    // field[49][0] = 1
    // field[20][1] = 1
    // field[21][1] = 1
    // field[20][2] = 1
}

function draw() {
    // console.log(mouseButton)
    mouse();
    background(220);
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
    // text(x, 10, 10);
    // text(y, 10, 30);
}

function clicked() {
    if (mp >= 1) {
        if(x>0&&x<w&&y>0&&y<h){

        // console.log(1)
        if (color == -1) {
            // color = abs(field[x+y*w]-1);
            color = abs(field[x][y] - 1);
        }
        // field[x+y*w] = color;
        field[x][y] = color;
    }else{
        if(mp == 1){
        state = abs(state -1 );
        console.log(12);
        }
    }
    } else {
        color = -1;
    }
    mp = mp * 2;
}

function mousePressed() {
    if(mp == 0){
    mp = 1;
    }else {
        mp = 2;
    }
}

function mouseReleased() {
    mp = 0;
}

function makecell() {
    /*
    for (let i = 0; i < w * h; i++) {
        field.push(0);
    }
        */
       field = [];
    for (let i = 0; i < w + 1; i++) {
        field.push([]);
        for (let g = 0; g < h + 1; g++) {
            field[i].push(0);
        }
    }
}


function mouse() {
    x = Math.floor((mouseX - xs) / size);
    y = Math.floor((mouseY - ys) / size);
}

function drawCell() {
    for (let i = 1; i < w; i++) {
        for (let g = 1; g < h; g++) {
            // if (field[g * w + i] == 1) {
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
    resizeCanvas(windowWidth, windowHeight-30);
}

function keyReleased() {
    // console.log(key)
    if (key === " ") {
        state = abs(state - 1);
    }
}

function stepup() {
    for (let i = 1; i < w; i++) {
        for (let g = 1; g < h; g++) {
            let temp = aroundCells(i, g)
            if (field[i][g] == 1) {
                // console.log(temp);
                // console.log(i)
                // console.log(g)
                // console.log(temp)
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

function aroundCells(cellx, celly) {
    // console.log("x:" + cellx)
    // console.log("y:"+celly)
    let temp = 0;
    let aaaa = 0;
    /*
    if (field[cellx][celly] == 1) {
        // console.log(celly)
    }
        */

    for (let i = 0; i < 3; i++) {
        for (let g = 0; g < 3; g++) {
            if (i * g != 1) {
                temp += (field[cellx + g - 1][celly + i - 1] % 10);
/*
                if (field[cellx][celly] == 1) {
                    console.log(field[cellx + g - 1][celly + i - 1]%10)
                }
                    */
            }
        }
    }

    /*
    temp += field[cellx + 1][celly] > 0;
    aaaa += ((field[cellx + 1][celly] > 0) + 7) * 10000000
    temp += field[cellx - 1][celly] > 1;
    aaaa += ((field[cellx - 1][celly] > 1) + 7) * 1000000
    // console.log(field[cellx - 1][celly])
    temp += field[cellx][celly + 1] > 0;
    aaaa += ((field[cellx][celly + 1] > 0) + 7) * 100000
    temp += field[cellx][celly - 1] > 1;
    aaaa += ((field[cellx][celly - 1] > 1) + 7) * 10000
    temp += field[cellx + 1][celly + 1] > 0;
    aaaa += ((field[cellx + 1][celly + 1] > 0) + 7) * 1000
    temp += field[cellx + 1][celly - 1] > 1;
    aaaa = field[cellx + 1][celly - 1]
    // aaaa += ((field[cellx + 1][celly - 1] > 1) + 7) * 100
    temp += field[cellx - 1][celly + 1] > 0;
    // aaaa += ((field[cellx - 1][celly + 1] > 0) + 7) * 10
    temp += field[cellx - 1][celly - 1] > 1;
    // aaaa += (field[cellx - 1][celly - 1] > 1) + 7;
    if (field[cellx][celly] == 1) {
        
                    console.log((cellx + 1) + ":" + (celly - 1));
        console.log(aaaa)
    }
        */
       /*
    if (field[cellx][celly] == 1) {
        console.log(temp)
    }
        */
    return temp;
}