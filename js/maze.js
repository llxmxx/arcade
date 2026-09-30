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
}

drawMaze();