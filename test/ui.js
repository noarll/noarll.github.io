let t = 0;

function setup() {

    createCanvas(windowWidth, windowHeight);

}

function draw() {

    background(0);
    aa();
    t++;
}



function aa() {
    temp = t / 100 % 1;
    // rect(0, 0, easing(, 5, 2) * 100);
    for(let i = 0; i < 10 ; i++){
        for(let g = 1; g < 4; g++){
            fill(110);
            stroke(220);
        rect(windowWidth*i/10,windowHeight*g/3,windowWidth/10,-windowHeight/3*easing(temp,i,g-1));
        }
    }
}

function easing(x, a, b) {
    switch (a) {
        case 0:
            switch (b) {
                case 0:
                    return 1 - Math.cos((x * Math.PI) / 2);
                case 1:
                    return Math.sin((x * Math.PI) / 2);
                case 2:
                    return -(Math.cos(Math.PI * x) - 1) / 2;
            }
            break;




        case 1:
            switch (b) {
                case 0:
                    return x * x;
                case 1:
                    return 1 - (1 - x) * (1 - x);
                case 2:
                    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
            }
            break;




        case 2:
            switch (b) {
                case 0:
                    return x * x * x;
                case 1:
                    return 1 - Math.pow(1 - x, 3);
                case 2:
                    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
            }
            break;



        case 3:
            switch (b) {
                case 0:
                    return x * x * x * x;
                case 1:
                    return 1 - Math.pow(1 - x, 4);
                case 2:
                    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
            }
            break;




        case 4:
            switch (b) {
                case 0:
                    return x * x * x * x * x;
                case 1:
                    return 1 - Math.pow(1 - x, 5);
                case 2:
                    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
            }
            break;




        case 5:
            switch (b) {
                case 0:
                    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
                case 1:
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                case 2:
                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                                : (2 - Math.pow(2, -20 * x + 10)) / 2;
            }
            break;




        case 6:
            switch (b) {
                case 0:
                    return 1 - Math.sqrt(1 - Math.pow(x, 2));
                case 1:
                    return Math.sqrt(1 - Math.pow(x - 1, 2));
                case 2:
                    return x < 0.5
                        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
            }
            break;




        case 7:
            let c1,c3;
            switch (b) {
                case 0:
                    c1 = 1.70158;
                    c3 = c1 + 1;

                    return c3 * x * x * x - c1 * x * x;
                case 1:
                    c1 = 1.70158;
                    c3 = c1 + 1;

                    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
                case 2:
                    c1 = 1.70158;
                    const c2 = c1 * 1.525;

                    return x < 0.5
                        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
            }
            break;




        case 8:
            let c4;
            switch (b) {
                case 0:
                    c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
                case 1:
                    c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
                case 2:
                    const c5 = (2 * Math.PI) / 4.5;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5
                                ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                                : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
            }
            break;




        case 9:
            switch (b) {
                case 0:
                    return 1 - easing(1 - x,9,1);
                case 1:
                    const n1 = 7.5625;
                    const d1 = 2.75;

                    if (x < 1 / d1) {
                        return n1 * x * x;
                    } else if (x < 2 / d1) {
                        return n1 * (x -= 1.5 / d1) * x + 0.75;
                    } else if (x < 2.5 / d1) {
                        return n1 * (x -= 2.25 / d1) * x + 0.9375;
                    } else {
                        return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    }
                case 2:
                    return x < 0.5
                        ? (1 - easing(1 - 2 * x,9,1)) / 2
                        : (1 + easing(2 * x - 1,9,1)) / 2;
            }
            break;
    }
}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

}