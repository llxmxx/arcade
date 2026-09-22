const board = document.querySelector(".ttt-board");
const boardState = Array(9).fill("");
const turn = document.querySelector(".turn");
let currentPlayer = "X";

for (let i = 0; i < 9; i++){
    const cell = document.createElement("button");
    cell.classList.add("ttt-cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        if(boardState[index] !== ""){
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
    })
    board.appendChild(cell);
}
