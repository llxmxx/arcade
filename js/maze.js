const canvas  = document.querySelector("#game-board");
const ctx = canvas.getContext("2d");
const newBtn = document.querySelector("#new");

const mazeSize = 21;
let maze = Array.from({length: mazeSize}, ()=> Array(mazeSize).fill("1"));

function generateMaze(row, col){
    maze[row][col] = "0";
    const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];
    directions.sort(() => Math.random() - 0.5);

    for(const [rowChange, colChange] of directions){
        const newRow = row + rowChange;
        const newCol = col + colChange;

        if(newRow > 0 && newRow < mazeSize-1 && newCol > 0 && newCol < mazeSize-1 && maze[newRow][newCol] === "1"){
            maze[row+rowChange/2][col+colChange/2] = "0";
            generateMaze(newRow, newCol);
        }
    }
}

generateMaze(1, 1);

maze[0][1] = "0";
maze[mazeSize-1][mazeSize-2] = "0";
const tileSize = canvas.width/mazeSize;

let player = {row: 0, col: 1};
const goal = {row: mazeSize-1, col: mazeSize-2};
let won=false;

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < maze.length; i++){
        for(let j = 0; j < maze[i].length; j++){
            if(maze[i][j]==="1"){
                ctx.fillStyle = "black";
                ctx.fillRect(j*tileSize, i*tileSize, tileSize, tileSize);
            }
        }
    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(goal.col*tileSize + tileSize/2, goal.row*tileSize+tileSize/2, tileSize*0.3, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(player.col*tileSize + tileSize/2, player.row*tileSize+tileSize/2, tileSize*0.3, 0, Math.PI*2);
    ctx.fill();

    if(won){
        ctx.fillStyle = "red";
        ctx.font = "24px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.fillText("YOU WIN!", canvas.width/2, canvas.height/2);
    }
}

function movePlayer(rowChange, colChange){
    if(won) return;

    const newRow = player.row+rowChange;
    const newCol = player.col+colChange;
    
    if(maze[newRow][newCol] === "1") return;

    player.row = newRow;
    player.col = newCol;

    if(player.row === goal.row && player.col===goal.col){
        won = true;
    }

    drawMaze();
}

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if(key === "w") movePlayer(-1, 0);
    if(key === "s") movePlayer(1, 0);
    if(key === "a") movePlayer(0, -1);
    if(key === "d") movePlayer(0, 1);
})

newBtn.addEventListener("click", () => {
    maze = Array.from({length: mazeSize}, ()=> Array(mazeSize).fill("1"));
    generateMaze(1, 1);

    maze[0][1] = "0";
    maze[mazeSize-1][mazeSize-2] = "0";

    player = {row: 0, col: 1};
    won=false;

    drawMaze();
})

drawMaze();