// let winW, winH;
let pixSize = 30;
let xS = 20;
let yS = 20;
let stageW = 10;
let stageH = 20;
let field = [];
let time = 0;


function setup() {
    //windowWidth,windowHeightを使うと画面全体にキャンバスの大きさを指定できる．
    createCanvas(windowWidth, windowHeight);
   genField();
   frameRate(60);
}

function draw() {
    time += deltaTime;
    teim = time*60;
   console.log(frameRate());
    // console.log(time);
    // console.log(frameCount)
    background(220);
    strokeWeight(1);
    stroke(220)
    fill(255);
    stageDraw();


}

function genField(){
    for(let i =0;i<stageH;i++){
        field.push(255);
        for (let g=0;g<stageW;g++){
            field.push(185);
        }
        field.push(255);
    }
    for(let i=0;i<stageW+2;i++){
        field.push(255);
    }
}

function stageDraw() {
    for (let i = 0; i < stageH + 1; i++) {
        for (let g = 0; g < stageW + 2; g++) {
            fill(field[i*(stageW+2)+g])
            rect(xS + (pixSize * g) + g, yS + (pixSize * i)+i, pixSize);
        }
    }
}

function moveMino(){

}

//ウィンドウサイズが変更されたときに実行される関数
function windowResized() {
    // print("ウィンドウサイズの変更");
    resizeCanvas(windowWidth, windowHeight);
}

//windowResized関数でリサイズされたときにキャンバスのサイズを変更する