const canvas = document.querySelector("#snake-board");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileSize = canvas.width/gridSize;

let snake = [{x: 10, y: 10}];
let direction = {x: 1, y: 0};

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let x = 0; x < gridSize; x++){
        for(let y = 0; y < gridSize; y++){
            ctx.strokeRect(x*tileSize, y*tileSize, tileSize, tileSize);
        }
    }

    for(const s of snake){
        ctx.fillRect(s.x*tileSize, s.y*tileSize, tileSize, tileSize);
    }
}

function moveSnake(){
    const head = snake[0];
    const newHead = {
        x: head.x + direction.x, y: head.y+direction.y
    };
    if(newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize){
        clearInterval(gameLoop);
        return;
    }
    snake.unshift(newHead);
    snake.pop();
}

const gameLoop = setInterval(() => {
    moveSnake();
    draw();
}, 150);