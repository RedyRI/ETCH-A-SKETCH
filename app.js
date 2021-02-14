let mainContainer = document.querySelector('.main-container');

let restarButton = document.querySelector('.restart-button');
// create table


function hoverEvent(paintmode) {
    let gridELements = document.querySelectorAll('.grid-element');
    gridELements.forEach((element) => {
        paintmode(element);
    })
}

function createTable(number, paintmode) {
    
    let containerWidth = window.innerWidth;
    if(containerWidth < 480) {
        containerWidth *= 0.8;
    } else if(containerWidth < 768) {
        containerWidth *= 0.6;
    } else {
        containerWidth *= 0.35;
    }
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.style.width = `${containerWidth}px`;
    
    for (let i = 0; i < number ** 2; i++) {
        let gridELement = document.createElement('div');
        gridELement.classList.add('grid-element');
        gridELement.style.width = `${containerWidth/number}px`;
        gridELement.style.height = `${containerWidth/number}px`;
        gridContainer.appendChild(gridELement);
    }
    
    mainContainer.appendChild(gridContainer);
    hoverEvent(paintmode);
    
}

function validateNumber() {
    let wrongNumber = true;
    let numberRowAndCols = document.querySelector('input[name=rows-and-col-number]').value;
    
    if (numberRowAndCols < 1 || numberRowAndCols > 100) {
        document.querySelector('.restart-section > p').style.display = "block";
        return 0;
    } else {
        document.querySelector('.restart-section > p').style.display = "none";
         return numberRowAndCols;
    }

}   

restarButton.addEventListener('click', (e) => {
    let gridContainer = document.querySelector('.grid-container');
    gridContainer.parentNode.removeChild(gridContainer);
    let number = validateNumber();
    createTable(number,hslPaint);
})

let paintBW = document.querySelector('.paint-bw');
let paintHSL = document.querySelector('.paint-hsl');
let eraser = document.querySelector('.eraser');
var colorPicker = document.querySelector('input[type=color]');

colorPicker.addEventListener('change', (e) => {
    hoverEvent(pickFunc)
})

paintBW.addEventListener('click', (e) => {
    hoverEvent(blackPaint)
})

paintHSL.addEventListener('click', (e) => {
    hoverEvent(hslPaint)
})

eraser.addEventListener('click', (e) => {
    hoverEvent(eraserFunc)
})

var hslPaint = function (element) {
    document.querySelector('.button-container > p').style.display = 'block';
    let light = 50;
        let hue = Math.floor(Math.random() * 361);
        element.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor =`hsl(${hue},100%,${light}%)`;
            light -= 5;

        })
}

var blackPaint = function(element) {
    document.querySelector('.button-container > p').style.display = 'none';

    element.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'black';
    })
}

var pickFunc = function (element) {
    document.querySelector('.button-container > p').style.display = 'none';
    element.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = colorPicker.value;
    })
}

var eraserFunc = function (element) {
    document.querySelector('.button-container > p').style.display = 'none';
    element.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'white';
    })
}
createTable(16,hslPaint);