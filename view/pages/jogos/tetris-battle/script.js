let btnIniciar = document.querySelector('.btnIniciar');
let audio = document.querySelector('audio');
let img = document.querySelector('.som');
let on_off = Number(1);
let mary = Number(1)
let downKeyPressed1 = false; // Para o primeiro jogador
let downKeyPressed2 = false; // Para o segundo jogador
let controles = document.getElementById('controles');
let trcarfundo = document.getElementById('trocarfundo');
let txtAplicar = document.querySelector('.baixoAside')
let intervalID;
let libera = false;

img.style.display = 'none';



const backgrounds = [
    'fundos/neon.gif',
    'fundos/horadeaventura.gif',
    'fundos/ceu.gif',
    'fundos/montanhas.gif',
    'fundos/gato.gif',
    'fundos/hollowknight.gif',
    'fundos/minecraft.gif',



];

document.addEventListener("DOMContentLoaded", function () {
    // Verifique se há uma escolha de fundo anteriormente salva
    const selectedBackground = localStorage.getItem("selectedBackground");

    // Se uma escolha de fundo estiver salva, aplique-a
    if (selectedBackground) {
        const body = document.body;
        body.style.backgroundImage = `url('${selectedBackground}')`;

        // Atualize a seleção no elemento de seleção
        const selector = document.getElementById("background-selector");
        selector.value = selectedBackground;
    }
});

function changeAll() {

// MUSICA 

    // Selecione o elemento de seleção
    const musicSelector = document.getElementById("music-selector");

    // Selecione o elemento de áudio
    const audio = document.querySelector('audio');

    // Obtenha o valor selecionado no elemento de seleção
    const selectedMusic = musicSelector.value;

    // Aplique a música selecionada ao elemento de áudio
    audio.src = selectedMusic;

    // Salve a escolha da música no localStorage
    localStorage.setItem("selectedMusic", selectedMusic);

// BACK GROUND
    
    // Selecione o elemento de seleção
    const selector = document.getElementById("background-selector");

    // Selecione um elemento que representa o corpo da página
    const body = document.body;

    // Obtenha o valor selecionado no elemento de seleção
    const selectedBackground = selector.value;

    // Aplique o fundo selecionado ao elemento de corpo
    body.style.backgroundImage = `url('${selectedBackground}')`;

    // Salve a escolha do fundo no localStorage
    localStorage.setItem("selectedBackground", selectedBackground);

// MENSAGEM APLICADO COM SUCESSO

    txtAplicar.style.display = 'block'
    // para a mensagem nao ficar sumindo sem respeitar o tempo, voce precisa limpar a variavel!
    if (intervalID) {
        clearInterval(intervalID);
    }

    intervalID = setInterval(function () {
        txtAplicar.style.display = 'none';
    }, 2045);

    txtAplicar.style.display = 'block'


    if (intervalID) {
        clearInterval(intervalID);
    }

    intervalID = setInterval(function () {
        txtAplicar.style.display = 'none';
    }, 2045);


}

document.addEventListener("DOMContentLoaded", function () {
    // Verifique se há uma escolha de música anteriormente salva
    const selectedMusic = localStorage.getItem("selectedMusic");

    // Se uma escolha de música estiver salva, aplique-a
    if (selectedMusic) {
        const audio = document.querySelector('audio');
        audio.src = selectedMusic;

        // Atualize a seleção no elemento de seleção
        const musicSelector = document.getElementById("music-selector");
        musicSelector.value = selectedMusic;
    }
});


function iniciarJogo() {
     libera = true;
    const musicSelector = document.getElementById("music-selector");

    // Obtenha o valor selecionado no elemento de seleção de música
    const selectedMusic = musicSelector.value;

    // Selecione o elemento de áudio
    const audio = document.querySelector('audio');

    // Aplique a música selecionada ao elemento de áudio
    audio.src = selectedMusic;

    audio.play();

    img.style.display = "block";
    if(selectedMusic == "nenhuma"){
        img.style.display='none'
    }



    img.addEventListener('click', function () {
        toggleSound();
    })
    document.addEventListener('keydown', event => {
        if (event.keyCode === 77) {
            toggleSound();
        }
    });

    function toggleSound() {
        if (on_off === 1) {
            img.setAttribute('src', './img/sem_som.png');
            on_off = 0;
            audio.pause();
        } else {
            img.setAttribute('src', './img/com_som.png');
            on_off = 1;
            audio.play();
        }
    }
    document.addEventListener('keydown', event => {
        if (event.keyCode === 82) {
            location.reload();
        }
    });




    const canvas_p1 = document.getElementById('tetris_p1');
    const canvas_p2 = document.getElementById('tetris_p2');

    const context_p1 = canvas_p1.getContext('2d');
    const context_p2 = canvas_p2.getContext('2d');

    context_p1.scale(20, 20);
    context_p2.scale(20, 20);

    class Player {
        constructor(id) {
            this.id = id;
            this.dropCounter = 0;
            this.dropInterval = 1000;
            this.lastTime = 0;
            this.pos = { x: 0, y: 0 };
            this.score = 0;
            this.matrix = null;
            this.arena = createMatrix(10, 20);
            this.combo = true;
            this.scored = false;
        }
    }

    let player1 = new Player('1');
    let player2 = new Player('2');

    /**
     *  Tetris Player Controller
    **/

    function playerRotate(dir, player) {
        const pos = player.pos.x;
        let offset = 1;
        rotate(player.matrix, dir);

        while (collide(player.arena, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > player.matrix[0].length) {
                rotate(player.matrix, -dir);
                player.pos.x = pos;
                return;
            }
        }
    }



    function playerDrop(player) {
        player.pos.y++;
        if (collide(player.arena, player)) {
            player.pos.y--;
            merge(player.arena, player);
            playerReset(player);
            sweep(player);
            //arenaSweep(player);
            updateScore();
        }
        player.dropCounter = 0;
    }

    function playerMove(dir, player) {
        player.pos.x += dir;
        if (collide(player.arena, player)) {
            player.pos.x -= dir;
        }
    }

    function playerReset(player) {
        const pieces = 'ILJOTSZ';
        player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        player.pos.y = 0;
        player.pos.x = (player.arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);

        if (collide(player.arena, player)) {
            player.arena.forEach(row => row.fill(0));
            player.score = 0;
            updateScore();
            alert("Parabéns!!! Você ganhou!!!")
            window.location.reload();
        }
    }


    /**
     *  Tetris Game Controller
    **/
    function createPiece(type) {
        if (type === 'T') {
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        } else if (type === 'O') {
            return [
                [2, 2],
                [2, 2],
            ];
        } else if (type === 'L') {
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        } else if (type === 'J') {
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        } else if (type === 'I') {
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0]
            ];
        } else if (type === 'S') {
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        } else if (type === 'Z') {
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0],
            ];
        }
    }

    const colors = [
        null,
        '#FF0D72',
        '#0DC2FF',
        '#0DFF72',
        '#F538FF',
        '#FF8E0D',
        '#FFE138',
        '#3877FF',
    ];

    function rotate(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x],] = [matrix[y][x], matrix[x][y],];
            }
        }

        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    function collide(arena, player) {
        const [m, o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) != - 0) {
                    return true;
                }
            }
        }
        return false;
    }

    function merge(arena, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }

    function drawMatrix(matrix, offset, context) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    // Preencha o bloco com a cor
                    context.fillStyle = colors[value];
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);

                    // Desenhe linhas pretas ao redor do bloco
                    context.strokeStyle = '#000'; // Cor da borda
                    context.lineWidth = 0.05; // Espessura da borda
                    context.strokeRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }


    function createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0))
        }
        return matrix;
    }

    function sweep(player) {
        let rowCount = 0;
        for (let y = player.arena.length - 1; y > 0; y--) {
            for (let x = 0; x < player.arena[y].length; x++) {
                //Copy Array
                let tempArray = player.arena[y].slice(0);
                //Check Row for valid score
                if (checkRow(tempArray)) {
                    const row = player.arena.splice(y, 1)[0].fill(0);
                    player.arena.unshift(row);
                    rowCount++;
                }
            }
        }
        console.log('rowCount: ' + rowCount);
        scorePlayer(player, rowCount);
    }

    function checkRow(array) {
        //Check if array contains a 0
        if (array.includes(0)) {
            return false;
        }
        //Return true if 0 is not found in row
        return true;
    }

    function scorePlayer(player, rows) {
        if (rows > 0) {
            player.score += rows * 10;
            if (player.id === '1') {
                addRow(player2, rows);
            } else {
                addRow(player1, rows);
            }
        }
    }

    function addRow(player, rows) {
        for (; rows > 0; rows--) {
            const row = player.arena.splice(0, 1)[0];
            for (x = 0; x < row.length; x++) {
                var random = Math.floor(Math.random() * 2);
                row[x] = random;
            }
            player.arena.push(row);
        }
    }

    /**
     *  Canvas Update
    **/
    function draw() {
        context_p1.fillStyle = '#000';
        context_p1.fillRect(0, 0, canvas_p1.width, canvas_p1.height);
        drawMatrix(player1.arena, { x: 0, y: 0 }, context_p1)
        drawMatrix(player1.matrix, player1.pos, context_p1);

        context_p2.fillStyle = '#000';
        context_p2.fillRect(0, 0, canvas_p2.width, canvas_p2.height);
        drawMatrix(player2.arena, { x: 0, y: 0 }, context_p2)
        drawMatrix(player2.matrix, player2.pos, context_p2);
    }

    function update(time = 0) {
        const deltaTime = time - player1.lastTime;
        player1.lastTime = time;

        if (downKeyPressed1) {
            player1.dropInterval = 100; // Defina um valor menor para fazer a peça cair mais rapidamente
        } else {
            player1.dropInterval = 1000; // Valor padrão quando a tecla não está pressionada
        }

        if (downKeyPressed2) {
            player2.dropInterval = 100; // Defina um valor menor para fazer a peça cair mais rapidamente
        } else {
            player2.dropInterval = 1000; // Valor padrão quando a tecla não está pressionada
        }
        player1.dropCounter += deltaTime;
        if (player1.dropCounter > player1.dropInterval) {
            playerDrop(player1);
        }

        const deltaTime2 = time - player2.lastTime;
        player2.lastTime = time;

        player2.dropCounter += deltaTime2;
        if (player2.dropCounter > player2.dropInterval) {
            playerDrop(player2);
        }

        draw();
        requestAnimationFrame(update);
    }

    function updateScore() {
        document.getElementById('score_p1').innerText = player1.score;
        document.getElementById('score_p2').innerText = player2.score;
    }

    /**
     *  Event Listener for key events.
    **/
    // Crie um objeto para rastrear as teclas pressionadas
    /*
            document.addEventListener('keydown', event => {
                if(event.keyCode === 37){
                    playerMove(-1, player1);
                } 
            });
    
            document.addEventListener('keydown', event => {
                if(event.keyCode === 40){
                    playerDrop(player1);
                }
            });
    
            document.addEventListener('keydown', event => {
                if(event.keyCode === 38){
                    playerRotate(1, player1);
                } 
            });
    
    
            document.addEventListener('keydown', event => {
                if(event.keyCode === 65){
                    playerMove(-1, player2);
                } 
            });
    
    
            document.addEventListener('keydown', event => {
                if(event.keyCode === 68){
                    playerMove(1, player2);
                } 
            });
    
    
            document.addEventListener('keydown', event => {
                if(event.keyCode === 83){
                    playerDrop(player2);
                } 
            });
    
    
            document.addEventListener('keydown', event => {
                if(event.keyCode === 87){
                    playerRotate(1, player2);
                }
            });
    
    
            document.addEventListener('keydown', event => {
                if (event.keyCode === 32) {
                    alert("PAUSA TÉCNICA SOLICITADA!")
                }
            });
    
    */
    const keys = {};

    document.addEventListener('keydown', event => {
        // Verifique se a tecla já está pressionada antes de processar
        if (!keys[event.keyCode]) {
            keys[event.keyCode] = true;

            // Verifique as teclas pressionadas e execute as ações correspondentes
            if (keys[37]) {
                // Tecla esquerda pressionada
                playerMove(-1, player1);

            }
            if (keys[39]) {
                // Tecla direita pressionada
                playerMove(1, player1);

            }
            if (keys[40]) {
                // Tecla para baixo pressionada
                downKeyPressed1 = true;
                playerDrop(player1);

            }
            if (keys[38]) {
                // Tecla para cima pressionada
                playerRotate(1, player1);
                delete keys[38];
            }
            if (keys[65]) {
                // Tecla 'A' pressionada
                playerMove(-1, player2);

            }
            if (keys[68]) {
                // Tecla 'D' pressionada
                playerMove(1, player2);

            }
            if (keys[83]) {
                // Tecla 'S' pressionada
                downKeyPressed2 = true;
                playerDrop(player2);


            }
            if (keys[87]) {
                // Tecla 'W' pressionada
                playerRotate(1, player2);
                delete keys[87];

            }
            if (keys[32]) {
                // Tecla de espaço pressionada
                alert("PAUSA TÉCNICA SOLICITADA!");
                delete keys[32];
            }
        }
    });

    document.addEventListener('keyup', event => {
        // Remova a tecla do objeto quando ela for liberada
        if (event.keyCode === 40) {
            downKeyPressed1 = false;

        }
        if (event.keyCode === 83) {
            downKeyPressed2 = false;

        }
        delete keys[event.keyCode];
    });

    playerReset(player1);
    playerReset(player2);
    updateScore();
    update();

    btnIniciar.style.display = "none";
    controles.style.display = "none";
    trocarfundo.style.display = "none";

}




document.addEventListener('keydown', event => {
    if (event.keyCode === 13 && !libera) {
        iniciarJogo();
        libera = true;
    }
});





btnIniciar.addEventListener('click', iniciarJogo)