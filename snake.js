"use strict";

let scoreBlock;
let score = 0;

let config = {
    count: 0,
    maxCount: 6,
    sizeCell: 16,
    sizeBerry: 16 / 2
}

let snake = {
    x: 0,
    y: 0,
    dx: config.sizeCell,
    dy: 0,
    tail: [],
    maxTail: 4
}

let berry = {
    x: 20,
    y: 20
}

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();

function gameLoop () {

    requestAnimationFrame( gameLoop );
    if (++config.count < config.maxCount) {
        return;
    }
    
    config.count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBerry();
    drawSnake();

}

requestAnimationFrame( gameLoop );
randomPositionBerry();

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

            console.log(el);

            context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

            if (el.x == berry.x && el.y == berry.y) {
                snake.maxTail++;
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
    context.fillStyle = "#ff0000";
    context.fillRect(berry.x, berry.y, config.sizeBerry, config.sizeBerry);
}

function drawScore () {
    scoreBlock.innerHTML = score;
}

function randomPositionBerry() {
    const cellAmountX = canvas.width / config.sizeCell;
    const cellAmountY = canvas.height / config.sizeCell;
    berry.x = config.sizeCell * Math.floor(Math.random() * cellAmountX);
    berry.y = config.sizeCell * Math.floor(Math.random() * cellAmountY);
    console.log(berry);
}

function collisionBorder () {
    if (snake.x > canvas.width) {
        snake.x = 0;
    } else if (snake.x < 0) {
        snake.x = canvas.width;
    } else if (snake.y > canvas.height) {
        snake.y = 0;
    } else if (snake.y < 0) {
        snake.y = canvas.height;
    }
}

function incScore () {
    score++;
    drawScore();
}

function refreshGame () {
    config = {
        count: 0,
        maxCount: 6,
        sizeCell: 16,
        sizeBerry: 16 / 2
    }
    
    snake = {
        x: 0,
        y: 0,
        dx: config.sizeCell,
        dy: 0,
        tail: [],
        maxTail: 4
    }
    
    berry = {
        x: 0,
        y: 0
    }

    score = 0;
    drawScore();
    randomPositionBerry();
}

document.addEventListener("keydown",
 function(e) {
    switch (e.code) {
        case "KeyW":
            snake.dx = 0;
            snake.dy = -config.sizeCell;
            break;
        case "KeyS":
            snake.dx = 0;
            snake.dy = config.sizeCell;
            break;
        case "KeyA":
            snake.dx = -config.sizeCell;
            snake.dy = 0;
            break;
        case "KeyD":
            snake.dx = config.sizeCell;
            snake.dy = 0;
            break;
    }
 })