init();
var board;
var shouldHandleKeyDown = true;
var right = { move: 1, not: 4 }
var left = { move: -1, dontmove:[1,5,9,13]}
var down = { move: 4, not: 0}
var up = { move: -4, dontmove:[]}
document.onkeydown = function (e) {
    if (!shouldHandleKeyDown) return;
    shouldHandleKeyDown = false;
    switch (e.key) {
        case "ArrowUp":
            move(up);
            break;
        case "ArrowDown":
            move(down);
            break;
        case "ArrowRight":
            move(right);
            break;
        case "ArrowLeft":
            move(left);
            break;
    }
    document.onkeyup = function () {
        shouldHandleKeyDown = true;
    }
    
    renderBoard();
};

function init() {
    board = new Array(16)
    board.fill("empty")
    for (i = 0; i < 16; i++) {
        document.getElementById(`text${i + 1}`).innerHTML = "";
    }
    createNew();
    renderBoard();
}

function createNew() {
    let emptyIndex = [];
    for (i = 0; i < 16; i++) {
        if (board[i] === "empty") {
            emptyIndex.push(i);
        }
    }
    let toChange = genNum(emptyIndex.length);
    board[emptyIndex[toChange]] = 2;
}

function genNum(max) {
    return Math.floor(Math.random() * (max))
}

function move(direction) {
    let moved = compress(direction)
    let merged = merge(direction)
    if (!moved && !merged) return;
    createNew();
}

function compress(direction) {
    let moved = false;

    if (direction.move > 0) {
        for (i = 0; i < 16; i++) {
            if (board[i] === "empty" || (i + 1) % direction.not === 0) continue;
            if (board[i + direction.move] !== "empty") continue;
            board[i + direction.move] = board[i];
            board[i] = "empty";
            moved = true;
        }
    }
    else {
        for (i = 15; i >= 0; i--) {
            if (board[i] === "empty" || direction.dontmove.includes(i + 1)) continue;
            if (board[i + direction.move] !== "empty") continue;
            board[i + direction.move] = board[i];
            board[i] = "empty";
            moved = true;
        }
    }

    return moved;
}

function merge(direction) {
    let merged = false;
    if (direction.move > 0) {
        for (i = 0; i < 16; i++) {
            if (board[i] === "empty" || (i + 1) % direction.not === 0) continue;
            if (board[i + direction.move] == board[i]) {
                board[i] = "empty";
                board[i + direction.move] *= 2;
            }
            moved = true;
        }
    }
    else {
        for (i = 15; i >= 0; i--) {
            if (board[i] === "empty" || direction.dontmove.includes(i + 1)) continue;
            if (board[i + direction.move] == board[i]) {
                board[i] = "empty";
                board[i + direction.move] *= 2;
            }
            moved = true;
        }
    }

    return merged;
}

function renderBoard() {
    for (i = 0; i < 16; i++) {
        let element = document.getElementById(`text${i + 1}`);
        if (board[i] !== "empty") {
            element.innerHTML = board[i];
        }
        else {
            element.innerHTML = ""
        }
    }
}