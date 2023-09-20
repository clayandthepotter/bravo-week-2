// num of guesses
let totalRows = 6; 

// length of word
let totalColumns = 5; 

// start row at index 0
let row = 0; 

// start column at index 0
let column = 0; 

// create a boolean variable set to false. when boolean = true, terminate the game
let gameOver = false;

// create word list from which we will generate a random word
let wordList = ["apple", "beach", "cloud", "drift", "earth", "frost", "grape", "happy", "image", "jolly", "kiosk", "lemon", "music", "night", "ocean", "peace", "queen", "river", "sunny", "table", "vivid", "winds", "xerox", "array", "style",
];

// generate random word from wordList array
// Math.random() selects a number between 0 and 1 and we multiply that by the word list length to supply the relative index location and we use Math.floor[] to remove the decimals giving us a whole number for an exact random index
let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(word);

// create an onload initialization function
window.onload = () => initialize();
// define initialize function
function initialize() {

    // create game board
    for (let r = 0; r < totalRows; r++) {
        for (let c = 0; c < totalColumns; c++) {
            // <span id="0-0" class="tile"></span>
            // create and store the html span tag in a variable called tile
            let tile = document.createElement("span");
            // create an id for the span. the id value will be the row and column concatenated with the r and c values converted toString and including a '-' between the r and c values -> '0-0'
            tile.id = r.toString() + '-' + c.toString();
            // create a class for our <span> tag and define the class as 'tile'
            tile.classList.add('tile');
            // set our tile.innerText to ''
            tile.innerText = '';
            // when a new tile is created, we want to add it to our gameBoard
            document.getElementById('gameBoard').appendChild(tile);
        }
    }
    // listen for key strokes for when the user is typing. use keyup vs key down to prevent multiple letters being entered as tiles
    document.addEventListener("keyup", (key) => {
        if (gameOver) return;

        // listen for key codes that are within the alphabetical range
        if ('KeyA' <= key.code && key.code <= "KeyZ") {
            // if the column index is less than 5,
            if (column < 5) {
                // create tile
                let currTile = document.getElementById(row.toString() + '-' + column.toString());
                // if the currTile.innerText is empty,
                if (currTile.innerText == "") {
                    // return value of key code - index 3
                    currTile.innerText = key.code[3];
                    // increase column position
                    column++;
                }
            }
        // if key code is Backspace,
        } else if (key.code == "Backspace") {
            // and if the column index is greater than 0, and the column index is less than the width of the gameBoard,
            if (0 < column && column <= totalColumns) {
                // decrement the column value
                column--;
            }
            // set value of currTile.innerText to ''
            let currTile = document.getElementById(row.toString() + '-' + column.toString());
            currTile.innerText = '';
        // if key code is Enter
        } else if (key.code == "Enter") {
            
            if (column == 0) {
                answer.textContent = 'Finish your guess!'
                setTimeout(() => {answer.textContent = ''}, 1500);
            }
            else if (0 < column && column < totalColumns) {
                answer.textContent = 'Finish your guess!'
                setTimeout(() => {answer.textContent = ''}, 1500);
            } else {
                update();
                // increment row number by 1
                row++;
                // reset column index to 0
                column = 0;
            }
            
        // if user has not guessed correctly, and the row index equals the height of rows, then gameOver
        } if (!gameOver && row == totalRows) {
            gameOver = true;
            // show word
            document.getElementById('answer').innerText = word;
        }
    })
}

function update() {

    // Start processing game

    // create a variable that starts correctLetters at 0
    let correctLetters = 0;
    // create an object to keep track of the # of times a letter appears in a word
    let letterCount = {}; // i.e. 'kenny' -> {k:1, e:1, n:2, y:1}
    // iterate through letters and fill letterCount with the letters
    for (let l = 0; l < word.length; l++) {
        letter = word[l]
        // if letter is in the letterCount object, incriment letterCount
        if (letterCount[letter]) {
            letterCount[letter]++;
        }
        else { // letterCount = 1
            letterCount[letter] = 1;
        }
    }

    // iterate through guess word. first iteration checks for correct letters in correct position. update object 

    for (let c = 0; c < totalColumns; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // is letter in the correct position?
        // if letter of word column == letter of letter
        if (word[c] == letter) {
            // update tile background color
            currTile.classList.add('correct');
            // update number of correct letters
            correctLetters++;
            // update our letterCount
            letterCount[letter]--;
        }
        if (correctLetters == totalColumns) {
            gameOver = true
            document.getElementById("answer").innerText = 'CORRECT!';
            
        }
    }

    // iterate again and check which letters are present, but in wrong position
    for (let c = 0; c < totalColumns; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // check currTile style class
        if (!currTile.classList.contains('correct')) {
            // is letter in the word?
            if (word.includes(letter) && letterCount[letter] > 0) {
                    currTile.classList.add('present');
                    letterCount[letter]--;
            } else { // not in the word
                currTile.classList.add('absent');
            }
        }
    }
}

