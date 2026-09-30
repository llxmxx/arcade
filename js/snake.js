const canvas = document.querySelector("#game-board");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileSize = canvas.width/gridSize;

let snake = [{x: 10, y: 10}];
let direction = {x: 1, y: 0};
let nextDirection = {x: 1, y: 0};

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

    for(let i = 0; i < snake.length; i++){
        const s = snake[i];
        const x = s.x*tileSize+2;
        const y = s.y*tileSize+2;
        const size = tileSize-4;

        ctx.fillStyle = (i===0 ? "gold" : "black");
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, 5);
        ctx.fill();
    }

    const size = tileSize-5;
    ctx.fillStyle="red";
    ctx.beginPath();
    ctx.roundRect(food.x*tileSize, food.y*tileSize, size, size, 6);
    ctx.fill();
}

function moveSnake(){
    direction = nextDirection;
    const head = snake[0];

    const newHead = {
        x: head.x + direction.x, y: head.y+direction.y
    };
    const hitSelf = snake.some(s => s.x === newHead.x && s.y === newHead.y);
    if(newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize || hitSelf){
        clearInterval(gameLoop);
        ctx.fillStyle="red";
        ctx.font = "24px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width/2, 50);
        gameLoop = null;
        return;
    }

    const eating = (newHead.x === food.x && newHead.y === food.y);

    snake.unshift(newHead);

    if(eating) food = spawnFood();
    else snake.pop();
    return true;
}

document.addEventListener("keydown", (e) => {
    if((e.key.toLowerCase() === "w") && direction.y !== 1){
        nextDirection = {x: 0, y: -1};
    }
    if((e.key.toLowerCase() ==="s") && direction.y !== -1){
        nextDirection = {x: 0, y: 1};
    }
    if((e.key.toLowerCase() === "a") && direction.x !== 1){
        nextDirection = {x: -1, y: 0};
    }
    if((e.key.toLowerCase() === "d") && direction.x !== -1){
        nextDirection = {x: 1, y: 0};
    }
});

function resetGame(){
    snake=[{x: 10, y: 10}];
    direction = {x: 1, y: 0};
    nextDirection = {x: 1, y: 0};
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
        const playing = moveSnake();
        if(playing){
            draw();
        }
    }, 150);
})
