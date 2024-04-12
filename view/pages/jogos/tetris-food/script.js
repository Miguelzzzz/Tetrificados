        var img = new Image();
        img.src = "img/logo.png";

        'use strict';
        var fundo = document.getElementById("fundo"); 

        var canvas = document.querySelector('canvas');
        canvas.width = 640;
        canvas.height = 640;

        var g = canvas.getContext('2d');

        var right = { x: 1, y: 0 };
        var down = { x: 0, y: 1 };
        var left = { x: -1, y: 0 };

        var EMPTY = -1;
        var BORDER = -2;

        var fallingShape;
        var nextShape;
        var dim = 640;
        var nRows = 18;
        var nCols = 20;
        var blockSize = 30;
        var topMargin = 50;
        var leftMargin = 20;
        var scoreX = 75;
        var scoreY = 525;
        var titleX = 130;
        var titleY = 160;
        var clickX = 165;
        var clickY = 505;
        var previewCenterX = 467;
        var previewCenterY = 97;
        var mainFont = 'bold 40px Arial';
        var smallFont = 'bold 18px monospace';
        var colors = ['pink','red','brown','yellow','black','green'];
        var gridRect = { x: 46, y: 47, w: 541, h: 517 };
        var previewRect = { x: 387, y: 47, w: 200, h: 200 };
        var clickRect = { x: 0, y: 460, w: 652, h: 70 };  
        var outerRect = { x: 5, y: 5, w: 630, h: 630 };
        var squareBorder = 'black';
        var textColor = 'black';
        var bgColor = '#53aaf1';
        var gridColor = '#F0F7EE';
        var gridBorderColor = 'black';
        var largeStroke = 8;
        var smallStroke = 2;
        var quantBloco = 8;
        var criadoX = 45;
        var criadoY = 600;
        var clickIniciar = '#53aaf1';
        var clickGameOver = 'red';
        var gameInProgress = false;

        var fallingShapeRow;
        var fallingShapeCol;

        var keyDown = false;
        var fastDown = false;

        var grid = [];
        var scoreboard = new Scoreboard();

        addEventListener('keydown', function (event) {
            if (!keyDown) {
                keyDown = true;

                if (scoreboard.isGameOver())
                    return;

                switch (event.key) {

                    case 'w':
                    case 'ArrowUp':
                        if (canRotate(fallingShape))
                            rotate(fallingShape);
                        break;

                    case 'a':
                    case 'ArrowLeft':
                        if (canMove(fallingShape, left))
                            move(left);
                        break;

                    case 'd':
                    case 'ArrowRight':
                        if (canMove(fallingShape, right))
                            move(right);
                        break;

                    case 's':
                    case 'ArrowDown':
                        if (!fastDown) {
                            fastDown = true;
                            while (canMove(fallingShape, down)) {
                                move(down);
                                draw();
                            }
                            shapeHasLanded();
                        }
                }
                draw();
            }
        });

        document.body.addEventListener('click', function (event) {
            if (scoreboard.isGameOver()) {
                if (isMouseInsideCanvas(event)) {
                    startNewGame();
                    gameInProgress = true;
                }
            }
        });

        function isMouseInsideCanvas(event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;
return (
                mouseX >= 0 &&
                mouseX <= rect.width &&
                mouseY >= 0 &&
                mouseY <= rect.height
            );
        }

        addEventListener('keyup', function () {
            keyDown = false;
            fastDown = false;
        });

        function canRotate(s) {
            if (s === Shapes.Square)
                return false;

            var pos = new Array(quantBloco);
            for (var i = 0; i < pos.length; i++) {
                pos[i] = s.pos[i].slice();
            }

            pos.forEach(function (row) {
                var tmp = row[0];
                row[0] = row[1];
                row[1] = -tmp;
            });

            return pos.every(function (p) {
                var newCol = fallingShapeCol + p[0];
                var newRow = fallingShapeRow + p[1];
                return grid[newRow][newCol] === EMPTY;
            });
        }

        function rotate(s) {
            if (s === Shapes.Square)
                return;

            s.pos.forEach(function (row) {
                var tmp = row[0];
                row[0] = row[1];
                row[1] = -tmp;
            });
        }

        function move(dir) {
            fallingShapeRow += dir.y;
            fallingShapeCol += dir.x;
        }

        function canMove(s, dir) {
            return s.pos.every(function (p) {
                var newCol = fallingShapeCol + dir.x + p[0];
                var newRow = fallingShapeRow + dir.y + p[1];
                return grid[newRow][newCol] === EMPTY;
            });
        }

        function shapeHasLanded() {
            addShape(fallingShape);
            if (fallingShapeRow < 2) {
                scoreboard.setGameOver();
                scoreboard.setTopscore();
            } else {
                scoreboard.addLines(removeLines());
            }
            selectShape();
        }

        function removeLines() {
            var count = 0;
            for (var r = 0; r < nRows - 1; r++) {
                for (var c = 1; c < nCols - 1; c++) {
                    if (grid[r][c] === EMPTY)
                        break;
                    if (c === nCols - 2) {
                        count++;
                        removeLine(r);
                    }
                }
            }
            return count;
        }

        function removeLine(line) {
            for (var c = 0; c < nCols; c++)
                grid[line][c] = EMPTY;

            for (var c = 0; c < nCols; c++) {
                for (var r = line; r > 0; r--)
                    grid[r][c] = grid[r - 1][c];
            }
        }

        function addShape(s) {
            s.pos.forEach(function (p) {
                grid[fallingShapeRow + p[1]][fallingShapeCol + p[0]] = s.ordinal;
            });
        }

        function Shape(shape, o) {
            this.shape = shape;
            this.pos = this.reset();
            this.ordinal = o;
        }

        var Shapes = {
            Donut: [[1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [1, 1], [0, 1], [1, 0]],
            Salsichao: [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [0, 0], [1, 0], [1, 0]],
            Chocolate: [[-1, 0], [0, 0], [-1, -1], [0, -1], [1, -1], [1, -1], [1, -1], [1, -1]],
            Podrao: [[0, 0], [1, 0], [0, 1], [1, 1],[0, 0], [1, 0], [0, 1], [1, 1]],
            Cockies: [[-1, 1], [1, -1], [1, 1],[-1, -1], [-1, 1], [1, -1], [1, 1],[-1, -1]],
            Snake: [[1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [-1, 1], [-1, 1],[-1, 1]]
        };

        function getRandomShape() {
            var keys = Object.keys(Shapes);
            var ord = Math.floor(Math.random() * keys.length);
            var shape = Shapes[keys[ord]];
            return new Shape(shape, ord);
        }

        Shape.prototype.reset = function () {
            this.pos = new Array(quantBloco);
            for (var i = 0; i < this.pos.length; i++) {
                this.pos[i] = this.shape[i].slice();
            }
            return this.pos;
        }

        function selectShape() {
            fallingShapeRow = 1;
            fallingShapeCol = 5;
            fallingShape = nextShape;
            nextShape = getRandomShape();
            if (fallingShape != null) {
                fallingShape.reset();
            }
        }

        function Scoreboard() {
            this.MAXLEVEL = 9;

            var gameOver = true;

            var level = 0;
            var lines = 0;
            var score = 0;
            var topscore = 0;

            this.reset = function () {
                this.setTopscore();
                level = lines = score = 0;
                gameOver = false;
            }

            this.setGameOver = function () {
                gameOver = true;
            }

            this.isGameOver = function () {
                return gameOver;
            }

            this.setTopscore = function () {
                if (score > topscore) {
                    topscore = score;
                }
            }

            this.getTopscore = function () {
                return topscore;
            }

            this.getSpeed = function () {

                switch (level) {
                    case 0: return 700;
                    case 1: return 600;
                    case 2: return 500;
                    case 3: return 400;
                    case 4: return 350;
                    case 5: return 300;
                    case 6: return 250;
                    case 7: return 200;
                    case 8: return 150;
                    case 9: return 100;
                    default: return 100;
                }
            }

            this.addScore = function (sc) {
                score += sc;
            }

            this.addLines = function (line) {

                switch (line) {
                    case 1:
                        this.addScore(10);
                        break;
                    case 2:
                        this.addScore(20);
                        break;
                    case 3:
                        this.addScore(30);
                        break;
                    case 4:
                        this.addScore(40);
                        break;
                    default:
                        return;
                }

                lines += line;
                if (lines > 10) {
                    this.addLevel();
                }
            }

            this.addLevel = function () {
                lines %= 10;
                if (level < this.MAXLEVEL) {
                    level++;
                }
            }

            this.getLevel = function () {
                return level;
            }

            this.getLines = function () {
                return lines;
            }

            this.getScore = function () {
                return score;
            }
        }

        function draw() {
            g.clearRect(0, 0, canvas.width, canvas.height);

            drawUI();

            if (scoreboard.isGameOver()) {
                drawGameOver();
            } else {
                drawFallingShape();
            }
        }

        function drawGameOver() {
            g.drawImage(img, 0, 0);
            fillRect(clickRect, clickGameOver);
            
            g.font = mainFont;
            g.fillStyle = textColor;     
            g.fillText('Click para reiniciar', clickX -25, clickY);
            
            g.font = smallFont;
            g.fillStyle = "black";
            g.fillText('Criado por: Gustavo Sachetto, Erick, Kaue, Gustavo Lima.', criadoX, criadoY);              
        }

        function drawStartScreen() {
            g.drawImage(img, 0, 0);
            fillRect(clickRect, clickIniciar);
            
            g.font = mainFont;
            g.fillStyle = "white";
            g.fillText('Click para iniciar', clickX, clickY);
            
            g.font = smallFont;
            g.fillStyle = "black";
            g.fillText('Criado por: Gustavo Sachetto, Erick, Kaue, Gustavo Lima.', criadoX, criadoY);
        }

        function fillRect(r, color) {
            g.fillStyle = color;
            g.fillRect(r.x, r.y, r.w, r.h);
        }

        function drawRect(r, color) {
            g.strokeStyle = color;
            g.strokeRect(r.x, r.y, r.w, r.h);
        }

        function drawSquare(colorIndex, r, c) {
            var bs = blockSize;
            g.fillStyle = colors[colorIndex];
            g.fillRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);

            g.lineWidth = smallStroke;
            g.strokeStyle = squareBorder;
            g.strokeRect(leftMargin + c * bs, topMargin + r * bs, bs, bs);
        }

        function drawUI() {

            fillRect(outerRect, bgColor);
            fillRect(gridRect, gridColor);

            for (var r = 0; r < nRows; r++) {
                for (var c = 0; c < nCols; c++) {
                    var idx = grid[r][c];
                    if (idx > EMPTY)
                        drawSquare(idx, r, c);
                }
            }

            g.lineWidth = largeStroke;
            drawRect(gridRect, gridBorderColor);
            drawRect(previewRect, gridBorderColor);
            drawRect(outerRect, gridBorderColor);

            g.fillStyle = textColor;
            g.font = smallFont;
            g.fillText('Nivel:         ' + scoreboard.getLevel(), scoreX, scoreY + 65);
            g.fillText('Pontuação:     ' + scoreboard.getScore(), scoreX, scoreY + 90);
            g.fillText('Linhas apagadas:      ' + scoreboard.getLines(), scoreX + 250, scoreY + 65);
            g.fillText('Pontuação máxima:     ' + scoreboard.getTopscore(), scoreX + 250, scoreY + 90);

            var minX = 5, minY = 5, maxX = 0, maxY = 0;
            nextShape.pos.forEach(function (p) {
                minX = Math.min(minX, p[0]);
                minY = Math.min(minY, p[1]);
                maxX = Math.max(maxX, p[0]);
                maxY = Math.max(maxY, p[1]);
            });
            var cx = previewCenterX - ((minX + maxX + 1) / 2.0 * blockSize);
            var cy = previewCenterY - ((minY + maxY + 1) / 2.0 * blockSize);

            g.translate(cx, cy);
            nextShape.shape.forEach(function (p) {
                drawSquare(nextShape.ordinal, p[1], p[0]);
            });
            g.translate(-cx, -cy);
        }

        function drawFallingShape() {
            var idx = fallingShape.ordinal;
            fallingShape.pos.forEach(function (p) {
                drawSquare(idx, fallingShapeRow + p[1], fallingShapeCol + p[0]);
            });
        }

       function animate(lastFrameTime) {
            var requestId = requestAnimationFrame(function () {
                animate(lastFrameTime);
            });
                        
            var time = new Date().getTime();
            var delay = scoreboard.getSpeed();

            if (lastFrameTime + delay < time) {

                if (!scoreboard.isGameOver()) {

                    if (canMove(fallingShape, down)) {
                        move(down);
                    } else {
                        shapeHasLanded();
                    }
                    draw();
                    lastFrameTime = time;

                } else {
                    cancelAnimationFrame(requestId);
                }
            }
        }

        function startNewGame() {
            initGrid();
            selectShape();
            scoreboard.reset();
            animate(-1);
        }

        function initGrid() {
            function fill(arr, value) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = value;
                }
            }
            for (var r = 0; r < nRows; r++) {
                grid[r] = new Array(nCols);
                fill(grid[r], EMPTY);
                for (var c = 0; c < nCols; c++) {
                    if (c === 0 || c === nCols - 1 || r === nRows - 1)
                        grid[r][c] = BORDER;
                }
            }
        }

        function init() {
        initGrid();
        selectShape();
            setTimeout(() => {
                drawStartScreen();
            }, 200);
        }

        init();