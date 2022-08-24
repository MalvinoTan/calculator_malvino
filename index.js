let display = "0";
let total = 0;
let checkDot = false;

const displayElement = document.querySelector(".value");
displayElement.innerHTML = display;

const buttons = document.querySelectorAll(".button");

const handleDisplay = (value) => {

    const lastChar = display[display.length - 1];

    if (value === "AC") {
        display = "0";
        total = 0;
        checkDot = false;
    }
    else if (value === "CE") {
        if (lastChar === '.') {
            checkDot = false;
        }
        if (display.length > 1) {
            display = display.slice(0, -1);
        } 
        else {
            if (lastChar !== '0') {
                display = "0";
            }
        }
    }
    else if (value === '.') {
        if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*') {
            display = display.slice(0, -1);
            checkDot = false;
        }
        if (!checkDot) {
            display += value;
        }
        checkDot = true;
    }
    else if (value === '=') {
        if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*' || lastChar === '.') {  
            display = display.slice(0, -1);
        }
        try {
            total = eval(display);
            display = total;
            checkDot = false;
            document.querySelector(".error").setAttribute("style", "display: none;");
        }
        catch {
            document.querySelector(".error").setAttribute("style", "display: flex;");
        }
    }
    else if (value === '+' || value === '-' || value === '/' || value === '*') {
        if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*' || lastChar === '.') {  
            display = display.slice(0, -1);
        }
        if (lastChar !== '.') {
            checkDot = false;
        }
        display += value;
    }
    else {
        if (display === "0") {
            display = value;
        }
        else {
            display += value;
        }
    }

    displayElement.innerHTML = display;
};

buttons.forEach((button) => {
    button.addEventListener("click", () => handleDisplay(button.textContent));
});