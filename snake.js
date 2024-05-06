"use strict";

let scoreBlock;
let score = 0;

let config = {
    count: 0,
    maxCount: 6,
    sizeCell: 16,
    sizeBerry: 16 / 4
}

let snake = {
    x: 200,
    y: 200,
    dx: config.sizeCell,
    dy: 0,
    tail: [],
    maxTail: 4
}

let berry = {
    x: 0,
    y: 0
}

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-text");

function gameLoop () {

    requestAnimationFrame( gameLoop );
    if (++config.count < config.maxCount) {
        return;
    }
    config.count = 0;

    drawSnake();
    drawBerry();

}

requestAnimationFrame( gameLoop );

function drawSnake () {
    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    snake.tail.unshift( { x: snake.x, y: snake.y } );

    if (snake.tail.length > snake.maxTail) {
        snake.tail.pop();
    }

    snake.tail.forEach(
        function (el, index) {
            if (index == 0) {
                context.fillStyle = "#FA0556";
            }
            else {
                context.fillStyle = "#A00034";
            }

            context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

            if (el.x == berry.x && el.y == berry.y) {
                ++snake.maxTail;
                incScore();
                randomPositionBerry();
            }

            for ( let i = index + 1; i < snake.tail.length; i++ ) {
                if (el.x == snake.tail[i].x && el.y == snake.tail[i].y) {
                    refreshGame();
                }
            }

        }
    );
    
}

function drawBerry() {
    // some code
}

function drawScore () {
    scoreBlock.innerHTML = score;
}

function randomPositionBerry() {
    //
}

function collisionBorder () {
    //
}

function incScore () {
    score++;
    drawScore();
}