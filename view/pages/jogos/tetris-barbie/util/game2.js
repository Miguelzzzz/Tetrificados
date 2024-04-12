/* JOGO 2 - PLAYER 1*/

const cvs1 = document.getElementById("tetris1");
const ctx1 = cvs1.getContext("2d");
const scoreElements1 = document.getElementsByClassName("score1");
const speedElement1 = document.getElementById("speed1");
const gameOverElement1 = document.getElementById('game-over1');


const ROW1 = 19;
const COL1 = 10;
const SQ1 = 40;
const defaultColor1 = "#111222";

let isGameOver1 = false;
let is2Players = false
let canMove1 = true;
let speed1 = 500;
let dropStart1 = Date.now();
let score1 = 0;
let board1 = [];
let piece1 = randomPiece1();

const startBtn1 = document.getElementById("startBtn2players");
const playAgainBtn1 = document.getElementById("playAgainBtn1");
const quitBtn1 = document.getElementById("quitBtn1");

startBtn1.addEventListener('click', startGame1);
playAgainBtn1.addEventListener('click', resetGame1);
quitBtn1.addEventListener('click', quitGame1);
document.addEventListener("keydown", CONTROL1);

/* JOGO 2 - PLAYER 2*/

const cvs2 = document.getElementById("tetris2");
const ctx2 = cvs2.getContext("2d");
const scoreElements2 = document.getElementsByClassName("score2");
const speedElement2 = document.getElementById("speed2");
const gameOverElement2 = document.getElementById('game-over2');

const ROW2 = 19;
const COL2 = 10;
const SQ2 = 40;
const defaultColor2 = "#111222";

let isGameOver2 = false;
let canMove2 = true;
let speed2 = 500;
let dropStart2 = Date.now();
let score2 = 0;
let board2 = [];
let piece2 = randomPiece2();

const startBtn2 = document.getElementById("startBtn2players");
const playAgainBtn2 = document.getElementById("playAgainBtn2");
const quitBtn2 = document.getElementById("quitBtn2");

startBtn2.addEventListener('click', startGame2);
playAgainBtn2.addEventListener('click', resetGame2);
quitBtn2.addEventListener('click', quitGame2);
document.addEventListener("keydown", CONTROL2);
