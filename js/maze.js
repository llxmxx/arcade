const canvas  = document.querySelector("#game-board");
const ctx = canvas.getContext("2d");

const maze = [
    "1011111111",
    "1000000001",
    "1011111101",
    "1010000101",
    "1010110100",
    "1000100101",
    "1110100101",
    "1000100001",
    "1000000001",
    "1111111111"
];
const tileSize = canvas.width/maze[0].length;

let player = {row: 0, col: 1};
const goal = {row: 4, col: 9};
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

drawMaze();