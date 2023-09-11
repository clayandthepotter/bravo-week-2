
let height = 6; // num of guesses
let width = 5; // length of word

let row = 0; // current guess (attempt number)
let column = 0; // current letter for that attempt

let gameOver = false;
let word = 'ARRAY';

//create a word aray and randomizer

window.onload = function() {
    initialize();
}

function initialize() {


    // create game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">p</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            tile.innerText = '';
            document.getElementById('gameBoard').appendChild(tile);
        }
    }
    // listen for key press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        // alert(e.code);
        if ('KeyA' <= e.code && e.code <= "KeyZ") {
            if (column < 5) {
                let currTile = document.getElementById(row.toString() + '-' + column.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    column++;
                }
            }
        } else if (e.code == "Backspace") {
            if (0 < column && column <= width) {
                column--;
            }
            let currTile = document.getElementById(row.toString() + '-' + column.toString());
            currTile.innerText = '';
        } else if (e.code == "Enter") {
            update();
            row++;
            column = 0;
        }   if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById('answer').innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    let letterCount = {};
    for (let i = 0; i < word.length; i++) {
        if (letterCount[letter]) {
            letterCount[letter]++;
        } else {
            letterCount[letter] = 1;
        }
    }
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // is letter in the correct position?
        if (word[c] == letter) {
            currTile.classList.add('correct');
            correct++;
        } else if (word.includes(letter)) {
                currTile.classList.add('present');
        } else {
            currTile.classList.add('absent');
        }
        if ('correct' == width) {
            gameOver = true
            
        }
    }
}
