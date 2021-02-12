let nameRegExp = /^[a-z]{4,8}$/i;
let userName = document.querySelector('input[name=username]');
userName.addEventListener('keyup',(e) => {
    validate(e.target, nameRegExp);
    console.log(e.target.value);
})



let gameOptions = document.querySelector('.game-options');
let mainContainer = document.querySelector('.main-container');

let startGame = document.querySelector('.start-game');
startGame.addEventListener('click', (e) => {

    if(userName.classList.contains('valid')) {
        e.target.parentNode.style.display = "none";
        gameOptions.classList.add('option-animation');   
        mainContainer.classList.add('main-container-animation');
        document.getElementById('player-name').textContent = `PLAYER: ${userName.value.toUpperCase()}`
    } else {
        alert("enter a valid username")
    }
})

let restartButton = document.createElement('button');
restartButton.classList.add('restart-button');
restartButton.textContent = "RESTART GAME";
console.log(mainContainer.previousElementSibling);
mainContainer.previousElementSibling.appendChild(restartButton);
let numberRowAndColumns = 16;  // initial rows and columns 

// function to create the table
function createTable(numberRowAndColumns) {
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    mainContainer.appendChild(gridContainer);
    width = gridContainer.offsetWidth;
    console.log(typeof(width));
    for (let i=0; i < (numberRowAndColumns ** 2); i++) {
        // create a div element append it to the grid container
        let div = document.createElement('div');
        div.classList.add('grid-element');
        div.style.width = `${(width / numberRowAndColumns)}px`
        div.style.height = `${(width / numberRowAndColumns)}px`
        gridContainer.appendChild(div);
        div.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = paintRandom();
        }, {
            once: true
        })
    }
}

// restart game
restartButton.addEventListener('click', (e) => {
    let gridContainer = document.querySelector('.grid-container');
    mainContainer.removeChild(gridContainer);
    numberRowAndColumns = prompt('How many rows and cols? ');
    createTable(numberRowAndColumns);
});

createTable(numberRowAndColumns);

// random color

function paintRandom() {
    return `rgb(${Math.floor(Math.random()*201)},${Math.floor(Math.random()*201)},${Math.floor(Math.random()*201)})`
}


// reg exp validation


function validate(node, nameRegExp) {
    if(nameRegExp.test(node.value)) {
        node.classList.add('valid');
        if(node.classList.contains('invalid')) {
            node.classList.remove('invalid');
        }
        node.nextElementSibling.style.height = "0";
        node.nextElementSibling.style.visibility = "hidden";

    } else {
        if(node.classList.contains('valid')) {
            node.classList.remove('valid');
        }
        node.classList.add('invalid');
        node.nextElementSibling.style.height = "auto";
        node.nextElementSibling.style.visibility = "visible";
        
    }
}