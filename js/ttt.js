const board = document.querySelector(".ttt-board");
const boardState = Array(9).fill("");
const turn = document.querySelector(".turn");
let currentPlayer = "X";
let roundOver = false;
const scoreX = document.querySelector("#score-x");
const scoreO = document.querySelector("#score-o");
const scoreTie = document.querySelector("#score-tie");
const newRound = document.querySelector("#new");
const resetScores = document.querySelector("#reset");


let scores = {
    X: 0,
    O: 0,
    tie: 0
};

const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for(const line of winningLines){
        const [a, b, c] = line;
        if(boardState[a] !== "" && boardState[a]==boardState[b] && boardState[a]==boardState[c]){
            line.forEach(index => {
                document.querySelector(`[data-index="${index}"]`).classList.add("winner");
            });
            return boardState[a];
        }
    }
    for(const i of boardState){
        if(i === ""){
            return null;
        }
    }
    return "tie";
}

function newGame(){
    boardState.fill("");
    const cells = document.querySelectorAll(".ttt-cell");
    for(const cell of cells){
        cell.textContent = "";
        cell.classList.remove("winner");
    }
    roundOver = false;
    if(currentPlayer === "X"){
        currentPlayer = "O";
        turn.textContent = "o's turn";
    }
    else{
        currentPlayer = "X";
        turn.textContent = "x's turn";
    }
}

newRound.addEventListener("click", newGame);

resetScores.addEventListener("click", () => {
    newGame();
    scores = {
        X: 0,
        O: 0,
        tie: 0
    };
    scoreO.textContent = scores.O;
    scoreX.textContent = scores.X;
    scoreTie.textContent = scores.tie;
});

for (let i = 0; i < 9; i++){
    const cell = document.createElement("button");
    cell.classList.add("ttt-cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if(boardState[index] !== "" || roundOver){
            return;
        }
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if(currentPlayer === "X"){
            currentPlayer = "O";
            turn.textContent = "o's turn";
        }
        else{
            currentPlayer = "X";
            turn.textContent = "x's turn";
        }
        
        const winner = checkWinner();
        
        if(winner !== null){
            roundOver = true;
            scores[winner]++;
            if(winner === "tie"){
                turn.textContent = "TIED";
            }
            else turn.textContent = `${winner} WINS!`

            scoreO.textContent = scores.O;
            scoreX.textContent = scores.X;
            scoreTie.textContent = scores.tie;
        }
    });
    
    board.appendChild(cell);
}

