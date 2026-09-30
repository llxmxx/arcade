document.addEventListener("keydown", (e) => {
    if(e.key === "Tab") e.preventDefault();
});

document.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
}, true);

document.addEventListener("mouseup", (e) => {
    e.preventDefault();
    e.stopPropagation();
}, true);

document.addEventListener("click", (e) => {
    if(e.detail !== 0){
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

const focusable = document.querySelectorAll('a[href], button:not([disabled])');
let current = 0;
function focusElement(index){
    current = index;
    focusable[current]?.focus();
}

function moveFocus(direction){
    const currentElement = focusable[current];
    if(!currentElement) return;

    const currentRect = currentElement.getBoundingClientRect();

    const currentX = currentRect.left + currentRect.width/2;
    const currentY = currentRect.top + currentRect.height/2;

    let bestIndex = -1;
    let bestScore = Infinity;

    focusable.forEach((element, index) => {
        if(index === current) return;
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width/2;
        const y = rect.top + rect.height/2;
        const dx = x-currentX;
        const dy = y-currentY;

        let valid = false;

        if(direction === "right") valid = dx>0;
        if(direction === "left") valid = dx<0;
        if(direction === "down") valid = dy>0;
        if(direction === "up") valid = dy<0;

        if(!valid) return;

        const distance = Math.sqrt(dx*dx+dy*dy);

        if(distance < bestScore){
            bestScore = distance;
            bestIndex = index;
        }
    });

    if(bestIndex!==-1) focusElement(bestIndex);
}

focusElement(0);

document.addEventListener("keydown", e => {
    if(e.key === "ArrowRight"){
        e.preventDefault();
        moveFocus("right");
    }
    if(e.key === "ArrowLeft"){
        e.preventDefault();
        moveFocus("left");
    }
    if(e.key === "ArrowDown"){
        e.preventDefault();
        moveFocus("down");
    }
    if(e.key === "ArrowUp"){
        e.preventDefault();
        moveFocus("up");
    }
});