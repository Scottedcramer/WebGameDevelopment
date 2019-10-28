let canvas = document.getElementById('TicTacToe'),
message = document.getElementById('message');
ctx = canvas.getContext('2d');
cellSize = 150;
boardState = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
];
winPatterns = [
    0b100100100, 0b010010010, 0b001001001, //columns
    0b111000000, 0b000111000, 0b000000111, //rows
    0b100010001, 0b001010100, //diagonals

];

BLANK = 0, X = 1, O = -1;
mouse = {
    x: -1,
    y: -1,
};

currentPlayer = X;
gameOver = false;

canvas.width = canvas.height = 3 * cellSize;

canvas.addEventListener('mouseout', function () {
mouse.x = mouse.y = -1;
});

canvas.addEventListener('mousemove', function (e) {
    let x = e.pageX - canvas.offsetLeft,
        y = e.pageY - canvas.offsetTop;

        mouse.x = x;
        mouse.y = y;

      
});

canvas.addEventListener('click', function (e) {
   play(getCellByCoordinates(mouse.x, mouse.y));
   

});

function play (cell) {
    if (gameOver == true) {
    document.location.reload(true);
        return;
    }

    if (boardState[cell] != BLANK){
        message.textContent = 'Position Taken. Please select an empty tile!';
        return;
    }
    if (currentPlayer == O ) {
        message.textContent = 'Nice move! It is Xs turn.';
    }
    if (currentPlayer == X ) {
        message.textContent = 'Nice move! It is Os turn.';
    }
    boardState[cell] = currentPlayer;

    let winCheck = checkWin(currentPlayer);

    if (winCheck !=0){
        gameOver = true;
        message.textContent = ((currentPlayer == X)? 'X': 'O') + ' wins! Click on the board to restart the game.';

    }
    else if (boardState.indexOf(BLANK) == -1) {
        gameOver = true;
        message.textContent = 'Tie!  Click on the board to restart the game.'
    }
console.log(checkWin(currentPlayer));

    currentPlayer *= -1;
}

function checkWin (player) {
    let playerMapBitMask = 0;
    for (let i =0; i < boardState.length; i++) {
        playerMapBitMask <<= 1;
        if (boardState[i] == player)
        playerMapBitMask += 1;
    }

    for (let i = 0; i < winPatterns.length; i++) {
        if ((playerMapBitMask & winPatterns[i]) == winPatterns[i]) {
            return winPatterns[i];
        }
    }

    return 0;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    fillBoard();

    function drawBoard() {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;

        ctx.beginPath();
        ctx.moveTo(cellSize, 0);
        ctx.lineTo(cellSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellSize * 2, 0);
        ctx.lineTo(cellSize * 2, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, cellSize);
        ctx.lineTo(canvas.width, cellSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, cellSize * 2);
        ctx.lineTo(canvas.width, cellSize * 2);
        ctx.stroke();

    }

    function fillBoard() {
        ctx.lineWidth = 5;
        for (let i = 0; i < boardState.length; i++) {
            let coordinates = getCellCoordinates(i);

            ctx.save();
            ctx.translate(coordinates.x + cellSize /2, coordinates.y + cellSize/2);
            if (boardState[i] == X) {
                drawX();
            }
            else if (boardState[i] == O){
                drawO();
            }
            ctx.restore();
        }

    }

    function drawX () {
        ctx.beginPath();
        ctx.moveTo(-cellSize / 3, -cellSize / 3);
        ctx.lineTo(cellSize / 3, cellSize / 3);
        ctx.moveTo(cellSize / 3, -cellSize / 3);
        ctx.lineTo(-cellSize / 3, cellSize / 3);
        ctx.stroke();
    }

    function drawO () {
        ctx.beginPath();
        ctx.arc(0, 0, cellSize /3, 0, Math.PI * 2);
        ctx.stroke();
    }

    requestAnimationFrame(draw);

}

function getCellCoordinates(cell) {
    let x = (cell % 3) * cellSize,
        y = Math.floor(cell / 3) * cellSize;

        return {
            'x': x,
            'y': y,
        };
}

function getCellByCoordinates(x, y) {
     return (Math.floor(x / cellSize) % 3) + Math.floor(y / cellSize) * 3;
}

draw();