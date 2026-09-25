const canvas = document.querySelector("#snake-board");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileSize = canvas.width/gridSize;

let snake = [{x: 10, y: 10}];
let direction = {x: 1, y: 0};

function spawnFood(){
    let pos;

    do {
        pos = {x: Math.floor(Math.random()*gridSize), y: Math.floor(Math.random()*gridSize)};
    } while(snake.some(s => s.x===pos.x && s.y===pos.y));

    return pos;
}

let food = spawnFood();

function draw(){
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(const s of snake){
        ctx.fillRect(s.x*tileSize, s.y*tileSize, tileSize, tileSize);
    }

    ctx.fillStyle="red";
    ctx.fillRect(food.x*tileSize, food.y*tileSize, tileSize, tileSize);
}

function moveSnake(){
    const head = snake[0];

    const newHead = {
        x: head.x + direction.x, y: head.y+direction.y
    };
    const hitSelf = snake.some(s => s.x === newHead.x && s.y === newHead.y);
    if(newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize || hitSelf){
        clearInterval(gameLoop);
        return;
    }

    const eating = (newHead.x === food.x && newHead.y === food.y);

    snake.unshift(newHead);

    if(eating) food = spawnFood();
    else snake.pop();
}

document.addEventListener("keydown", (e) => {
    if((e.key === "ArrowUp" || e.key.toLowerCase() === "w") && direction.y !== 1){
        direction = {x: 0, y: -1};
    }
    if((e.key === "ArrowDown" || e.key.toLowerCase() ==="s") && direction.y !== -1){
        direction = {x: 0, y: 1};
    }
    if((e.key === "ArrowLeft" || e.key.toLowerCase() === "a") && direction.x !== 1){
        direction = {x: -1, y: 0};
    }
    if((e.key === "ArrowRight" || e.key.toLowerCase() === "d") && direction.x !== -1){
        direction = {x: 1, y: 0};
    }
});

function resetGame(){
    snake=[{x: 10, y: 10}];
    direction = {x: 1, y: 0};
    food = spawnFood();
    draw();
}

let gameLoop = null;
const start = document.querySelector("#start");

start.addEventListener("click", () => {
    if(gameLoop !== null) {
        clearInterval(gameLoop);
    }
    resetGame();
    gameLoop = setInterval(() => {
        moveSnake();
        draw();
    }, 150);
})
