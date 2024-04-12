class Piece {
    constructor(piece, color, image) {
        this.piece = piece;
        this.color = color;
        this.image = image;

        this.pieceN = 0;
        this.activePiece = this.piece[this.pieceN];

        this.x = 3;
        this.y = -2;
    }

    fill(color) {
        for (let currentRow = 0; currentRow < this.activePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < this.activePiece.length; currentCol++) {
                if (this.activePiece[currentRow][currentCol]) {
                    drawSquare(this.y + currentRow, this.x + currentCol, color);
                }
            }
        }
    }

    draw() {
        this.fill(this.color);
    }

    unDraw() {
        this.fill(defaultColor);
    }

    moveLeft() {
        if (this.collision(-1, 0, this.activePiece)) return;
        this.unDraw();
        this.x--;
        this.draw();
    }

    moveRight() {
        if (this.collision(1, 0, this.activePiece)) return;
        this.unDraw();
        this.x++;
        this.draw();
    }

    rotate() {
        const nextPattern = this.piece[(this.pieceN + 1) % this.piece.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            kick = 1;
            if (this.x > COL / 2) kick = -1;
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.pieceN = (this.pieceN + 1) % this.piece.length;
            this.activePiece = this.piece[this.pieceN];
            this.draw();
        }
    }

    moveDown() {
        if (!this.collision(0, 1, this.activePiece)) {
            dropStart = Date.now();
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            piece = nextPiece;
            selectNextPiece();
        }
    }

    collision(x, y, futurePiece) {
        for (let currentRow = 0; currentRow < futurePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < futurePiece.length; currentCol++) {
                if (!futurePiece[currentRow][currentCol]) continue;
                const newX = this.x + currentCol + x;
                const newY = this.y + currentRow + y;
                if (newX < 0 || newX >= COL || newY >= ROW) return true;
                if (newY < 0) continue;
                if (board[newY][newX] != defaultColor) return true;
            }
        }
        return false;
    }

    lock() {
        for (let currentRow = 0; currentRow < this.activePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < this.activePiece.length; currentCol++) {
                if (!this.activePiece[currentRow][currentCol]) continue;

                if (this.y + currentRow < 0) {
                    gameOver();
                    return;
                }

                board[this.y + currentRow][this.x + currentCol] = this.color;
            }
        }

        for (let currentRow = 0; currentRow < ROW; currentRow++) {
            const allColumnsAreFilled = board[currentRow].every((colColor) => colColor != defaultColor);
            if (allColumnsAreFilled) updateRowAndScore(currentRow);
        }

        drawBoard();
    }
}