"use strict";
const gameBoard = document.getElementById("gameCanvas");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("score-text");
// set game consants
const gameUnit = 25;
const canvasWidth = gameBoard.width;
const canvasHeight = gameBoard.height;
const snakeColor = "black";
const canvasColor = "black";
const snakeTribals = "crimson";
const foodColor = "yellow";
// Initialize game state
let gameState = false;
let foodX;
let foodY;
let xAxis = gameUnit;
let yAxis = 0;
let gSpeed = 200;
let score = 0;
let snake = [
    { x: gameUnit * 4, y: 0 },
    { x: gameUnit * 3, y: 0 },
    { x: gameUnit * 2, y: 0 },
    { x: gameUnit, y: 0 },
    { x: 0, y: 0 }
];
window.addEventListener("keydown", handleKey);
function startGame() {
    gameState = true;
    scoreText.textContent = `SCORE: ${score}`;
    createFood();
    drawFood();
    nextTick();
}
;
function nextTick() {
    if (gameState) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkState();
            nextTick();
        }, gSpeed);
    }
    else {
        gameOver();
    }
}
;
function clearBoard() {
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
;
function createFood() {
    function randomFood(min, max) {
        const randomNumber = Math.round((Math.random() * (max - min) + min) / gameUnit) * gameUnit;
        return randomNumber;
    }
    foodX = randomFood(0, canvasWidth - gameUnit);
    foodY = randomFood(0, canvasHeight - gameUnit);
}
;
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, gameUnit, gameUnit);
}
;
function moveSnake() {
    const head = { x: snake[0].x + xAxis,
        y: snake[0].y + yAxis };
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        gSpeed -= 10;
        scoreText.textContent = `SCORE: ${score}`;
        createFood();
    }
    else {
        snake.pop();
    }
}
;
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeTribals;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, gameUnit, gameUnit);
        ctx.strokeRect(snakePart.x, snakePart.y, gameUnit, gameUnit);
    });
}
;
function handleKey(event) {
    const keyDown = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const SPACE = 32;
    const upD = (yAxis == -gameUnit);
    const rightD = (xAxis == gameUnit);
    const downD = (yAxis == gameUnit);
    const leftD = (xAxis == -gameUnit);
    switch (true) {
        case (keyDown == SPACE):
            resetGame();
            break;
        case (keyDown == LEFT && !rightD):
            xAxis = -gameUnit;
            yAxis = 0;
            break;
        case (keyDown == UP && !downD):
            xAxis = 0;
            yAxis = -gameUnit;
            break;
        case (keyDown == RIGHT && !leftD):
            xAxis = gameUnit;
            yAxis = 0;
            break;
        case (keyDown == DOWN && !upD):
            xAxis = 0;
            yAxis = gameUnit;
            break;
    }
}
;
function checkState() {
    switch (true) {
        case (snake[0].x < 0):
            gameState = false;
            break;
        case (snake[0].y < 0):
            gameState = false;
            break;
        case (snake[0].x >= canvasWidth):
            gameState = false;
            break;
        case (snake[0].y >= canvasHeight):
            gameState = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            gameState = false;
        }
    }
}
;
function gameOver() {
    ctx.font = "100px VT323";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", canvasWidth / 2, canvasHeight / 2);
}
;
function resetGame() {
    gameState = false;
    xAxis = gameUnit;
    yAxis = 0;
    snake = [
        { x: gameUnit * 4, y: 0 },
        { x: gameUnit * 3, y: 0 },
        { x: gameUnit * 2, y: 0 },
        { x: gameUnit, y: 0 },
        { x: 0, y: 0 }
    ];
    startGame();
    console.log("Game reset recorded.");
}
;
