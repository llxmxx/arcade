const board = document.querySelector(".ttt-board");

for (let i = 0; i < 9; i++){
    const cell = document.createElement("button");
    cell.classList.add("ttt-cell");
    board.appendChild(cell);
}