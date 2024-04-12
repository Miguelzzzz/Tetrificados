/* JOGO 2 - PLAYER 1*/


class Piece2 {
    constructor1(piece1, color1, image1) {
        this.piece1 = piece1;
        this.color1 = color1;
        this.image1 = image1;

        this.pieceN1 = 0;
        this.activePiece1 = this.piece1[this.pieceN1];

        this.x1 = 3;
        this.y1 = -2;
    }

    fill1(color1) {
        for (let currentRow1 = 0; currentRow1 < this.activePiece1.length; currentRow1++) {
            for (let currentCol1 = 0; currentCol1 < this.activePiece1.length; currentCol1++) {
                if (this.activePiece1[currentRow1][currentCol1]) {
                    drawSquare1(this.y1 + currentRow1, this.x1 + currentCol1, color1);
                }
            }
        }
    }

    draw1() {
        this.fill1(this.color1);
    }

    unDraw1() {
        this.fill1(defaultColor1);
    }

    moveLeft1() {/*se nao colidir com algo, a peça irá se mover */
        if (this.collision1(-1, 0, this.activePiece1)) return;
        this.unDraw1();
        this.x1--;
        this.draw1();
    }

    moveRight1() { 
        if (this.collision1(1, 0, this.activePiece1)) return;
        this.unDraw1();
        this.x1++;
        this.draw1();
    }

    rotate1() {/*para rodar a peça e se ajustar quando trocamos ela de lugar*/
        const nextPattern1 = this.piece1[(this.pieceN1 + 1) % this.piece1.length];
        let kick1 = 0;

        if (this.collision1(0, 0, nextPattern1)) {
            kick1 = 1;
            if (this.x1 > COL1 / 2) kick1 = -1;
        }

        if (!this.collision1(kick1, 0, nextPattern1)) {
            this.unDraw1();
            this.x1 += kick1;
            this.pieceN1 = (this.pieceN1 + 1) % this.piece1.length;
            this.activePiece1 = this.piece[this.pieceN1];
            this.draw1();
        }
    }

    moveDown1() {
        if (!this.collision1(0, 1, this.activePiece1)) {
            dropStart1 = Date.now();
            this.unDraw1();
            this.y1++;
            this.draw1();

        } else {
            this.lock1();
            piece1 = nextPiece1;
            selectNextPiece1();
        }
    }

    collision1(x1, y1, futurePiece1) {
        for (let currentRow1 = 0; currentRow1 < futurePiece1.length; currentRow1++) {
            for (let currentCol1 = 0; currentCol1 < futurePiece1.length; currentCol1++) {
                if (!futurePiece1[currentRow1][currentCol1]) continue;
                const newX1 = this.x1 + currentCol1 + x1;
                const newY1 = this.y1 + currentRow1 + y1;
                    
                    if (newX1 < 0 || newX1 >= COL1 || newY1 >= ROW1)
                     return true;
                        
                        if (newY1 < 0)
                         continue;
                            
                            if (board1[newY1][newX1] != defaultColor1)
                             return true;
            }
        }
        return false;
    }
       lock1() { /*trava a peça quando colidir com alguma coisa, seja, outra peça ou na parte inferior da tela do jogo*/
        for (let currentRow1 = 0; currentRow1 < this.activePiece1.length; currentRow1++) {
            for (let currentCol1 = 0; currentCol1 < this.activePiece1.length; currentCol1++) {
                if (!this.activePiece1[currentRow1][currentCol1]) 
                  continue;

                if (this.y1 + currentRow1 < 0) {
                    gameOver1();
                    return;
                }

                board1[this.y1 + currentRow1][this.x1 + currentCol1] = this.color1;
            }
        }

        for (let currentRow1= 0; currentRow1 < ROW1; currentRow1++) {
            const allColumnsAreFilled1 = board1[currentRow1].every((colColor1) => colColor1 != defaultColor1);
            if (allColumnsAreFilled1)
                 updateRowAndScore1(currentRow1);
        }

        drawBoard1();
    }
}