audiofim = document.querySelector('.audiofim');
musica = document.querySelector('.musica')

const startGame = () => {
    isHomeScreen = false;
    isGameOver = false;
    homeElement.classList.add('hidden');

    canMove = true;
    speed = 500;
    dropStart = Date.now();
    score = 0;
    board = [];

    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        board[currentRow] = [];
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            board[currentRow][currentCol] = defaultColor;
        }
    }

    drawBoard();
    selectNextPiece();
    drop();
    canMove = true;
}

const quitGame = () => {
    gameOverElement.classList.add("hidden");
    homeElement.classList.remove("hidden");
    isHomeScreen = true;
    isGameOver = false;
}

const drawBoard = () => {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol];
            drawSquare(currentRow, currentCol, currentSquareColor);
        }
    }

    for (let scoreElement of scoreElements) scoreElement.innerHTML = score;
    speedElement.innerHTML = readableSpeed[speed]
}

const drawSquare = (y, x, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

const randomPiece = () => {
    const randomPieceNumber = Math.floor(Math.random() * PIECES.length);
    return new Piece(...PIECES[randomPieceNumber]);
}

const drop = () => {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > speed && canMove) {
        piece.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

const moveLeft = () => {
    if (!canMove) return;
    piece.moveLeft();
};

const moveRight = () => {
    if (!canMove) return;
    piece.moveRight();
};

const rotatePiece = () => {
    if (!canMove) return;
    piece.rotate();
};

const moveUp = () => {
    if (canMove && !isGameOver && !isHomeScreen) rotatePiece();
    if (isGameOver) changeGameOverButtonSelection();
}

const changeGameOverButtonSelection = () => {
    audiofim.play();
    if (quitBtn.classList.contains('active')) {
        quitBtn.classList.remove('active');
        playAgainBtn.classList.add('active');
    } else {
        playAgainBtn.classList.remove('active');
        quitBtn.classList.add('active');
    }
}

const moveDown = () => {
    if (canMove && !isGameOver && !isHomeScreen) piece.moveDown();
    if (isGameOver) changeGameOverButtonSelection();
};

const clickMethod = () => {
    if (isGameOver && playAgainBtn.classList.contains('active')) {
        resetGame();
    } else if (isGameOver && quitBtn.classList.contains('active')) {
        quitGame();
    } else if (isHomeScreen) {
        startGame();
    } else if (!isHomeScreen && !isGameOver && canMove) {
        rotatePiece();
    }
}

const CONTROL = (event) => { /*configurando as tecla do tecla, para que ao pressionar a peça caia no lugar que desejamos */
    const moveFunctions = {
        ArrowLeft: moveLeft,
        KeyA: moveLeft,
        ArrowRight: moveRight,
        KeyD: moveRight,
        ArrowUp: moveUp,
        Space: rotatePiece,
        KeyW: rotatePiece,
        ArrowDown: moveDown,
        KeyS: moveDown,
        Enter: clickMethod
    };

    const moveMethod = moveFunctions[event.code];
    if (!!moveMethod) {
        event.preventDefault();
        moveMethod();
    }
}

const updateRowAndScore = (row) => {
    canMove = false;
    for (let y = row; y > 1; y--) removeRow(y);
    for (let x = 0; x < COL; x++) board[0][x] = defaultColor;
    score += 100;
    if (speed > 100) speed -= 20; /*quando completar uma linha, aumente a velocidade*/
        canMove = true;
}

const removeRow = (rowIndex) => {
    board[rowIndex] = board[rowIndex].map((_, index) => board[rowIndex - 1][index]);
}

const gameOver = () => {
    gameOverElement.classList.remove('hidden');
    canMove = false;
    isGameOver = true;
}
const gameOverp = () => {
    gameOverElement.classList.remove('hidden');
    canMove = false;
    isGameOver = true;

    // Reproduzir o som de game over
    const gameOverSound = document.getElementById('gameOverSound');
    gameOverSound.play();
}

const removeGameOver = () => {
    gameOverElement.classList.add('hidden');
}

const resetGame = () => {
    isGameOver = false;
    isHomeScreen = false;
    removeGameOver();
    canMove = true;
    speed = 500;
    dropStart = Date.now();
    score = 0;
    board = [];

    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        board[currentRow] = [];
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            board[currentRow][currentCol] = defaultColor;
        }
    }

    piece = randomPiece();
    selectNextPiece();
    drawBoard();
}

const selectNextPiece = () => {
    nextPiece = randomPiece();
    const element = document.getElementById('next-piece');
    element.src=  `images/${nextPiece.image}`;
}