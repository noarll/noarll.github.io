// let winW, winH;
let pixSize = 30;
let size = 30;
let xS = 20;
let yS = 20;
let blockW = 2;
let blockH = 1;
let wCell = 10;
let hCell = 5;
// let stageW = 5;
// let stageH = 7;
let stageW = blockW * wCell;
let stageH = stageW * 1.4;

let stW = stageW * size + wCell + 1;

let field = [];
let time = 0;
let barW = 80;
let mx = 0;
let x = [stW/2];
let y = [stageH * size - 50];
let ballSize = 10;
let r = 10;
let angle = [];


function setup() {
    //windowWidth,windowHeightを使うと画面全体にキャンバスの大きさを指定できる．
    createCanvas(windowWidth, windowHeight);
    xS = (windowWidth - stW) / 2;
    genField();
}

function draw() {
    background(220);
    strokeWeight(0);
    fill(255);
    rect(xS, 0, stW, stageH * size);
    fieldDraw();
    bar();
    ball();
}

function genField() {
    for (let i = 0; i < hCell; i++) {
        for (let g = 0; g < wCell; g++) {
            field.push(1);
        }
    }
}

function fieldDraw() {
    fill(185);
    for (let i = 0; i < hCell; i++) {
        temph = stageW / wCell * size / (blockW / blockH) + 1;
        for (let g = 0; g < wCell; g++) {
            tempw = stageW / wCell * size + 1;
            if(field[i*wCell+g]==1){
            rect(xS + 1 + (tempw * g), temph * i + 1, stageW / wCell * size, stageW / wCell * size / (blockW / blockH));
            }
        }
    }
}

function bar() {

    fill(0);
    mx = mouseX;
    mx -= xS + (stW) / 2;
    if (abs(mx) > (stW) / 2 - barW / 2) {
        mx = (abs(mx) / mx) * ((stW) / 2 - barW / 2);
    }
    mx += xS + (stW) / 2;


    rect(mx - barW / 2, stageH * size - 30, barW, 20);
}

function ball(){
    for(let i=0;i<x.length;i++){
        fill(0);
        rect(x[i]+xS,y[i],ballSize);
    }
}

function move(){
    for(let i;i<x.length;i++){
        x[i] += r*Math.cos(angle[i]);
        y[i] += r*Math.sin(angle[i]);
    }
}


//ウィンドウサイズが変更されたときに実行される関数
function windowResized() {
    // print("ウィンドウサイズの変更");
    resizeCanvas(windowWidth, windowHeight);
    xS = (windowWidth - 5 * size + wCell + 1) / 2;
}

//windowResized関数でリサイズされたときにキャンバスのサイズを変更する