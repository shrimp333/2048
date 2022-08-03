var board = [];

document.onkeydown = function (e) {
    switch (e.key) {
        case "ArrowUp":
            move("Up")
            break;
        case "ArrowDown":
            move("Down")
            break;
        case "ArrowRight":
            move("Right")
            break;
        case "ArroyLeft":
            move("Left")
            break;
    }
};

function move(direction) {

}

function renderBoard() {

}