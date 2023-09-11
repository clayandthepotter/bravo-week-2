
let height = 6; // num of guesses
let width = 5; // length of word

let row = 0; // current guess (attempt number)
let column = 0; // current letter for that attempt

let gameOver = false;
let wordList = ["apple", "beach", "cloud", "drift", "earth", "frost", "grape", "happy", "image", "jolly", "kiosk", "lemon", "music", "night", "ocean", "peace", "queen", "river", "sunny", "table", "vivid", "winds", "xerox", "array", "style",
];

// Math.random() selects a number between 0 and 1 and we multiply that by the word list length to supply the relative index location and we use Math.floor[] to remove the decimals giving us a whole number for an exact random index
let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(word);

//create a word aray and randomizer

window.onload = function() {
    initialize();
}

function initialize() {

    // create game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile"></span>
            // create and store the html span tag in a variable called tile
            let tile = document.createElement("span");
            // create an id for the span. the id value will be the row and column concatenated with the r and c values converted toString and including a '-' between the r and c values -> '0-0'
            tile.id = r.toString() + '-' + c.toString();
            // create a class for our <span> tag and define the class as 'tile'
            tile.classList.add('tile');
            // set our tile.innerText to ''
            tile.innerText = '';
            // whan a new tile is created, we want to add it to our gameBoard
            document.getElementById('gameBoard').appendChild(tile);
        }
    }
    // listen for key strokes for when the user is typing. use keyup vs key down to prevent multiple letters being entered as tiles
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        // listen for key codes that are within the alphabetical range
        if ('KeyA' <= e.code && e.code <= "KeyZ") {
            // if the column index is less than 5,
            if (column < 5) {
                // create tile
                let currTile = document.getElementById(row.toString() + '-' + column.toString());
                // if the currTile.innerText is empty,
                if (currTile.innerText == "") {
                    // return value of key code - index 3
                    currTile.innerText = e.code[3];
                    // increase column position
                    column++;
                }
            }
        // if key code is Backspace,
        } else if (e.code == "Backspace") {
            // and if the column index is greater than 0, and the column index is less than the width of the gameBoard,
            if (0 < column && column <= width) {
                // decrement the column value
                column--;
            }
            // set value of currTile.innerText to ''
            let currTile = document.getElementById(row.toString() + '-' + column.toString());
            currTile.innerText = '';
        // if key code is Enter
        } else if (e.code == "Enter") {
            // run update() function
            update();
            // increment row number by 1 
            row++;
            // reset column index to 0
            column = 0;
        // if user has not guessed correctly, and the row index equals the height of rows, then gameOver
        } if (!gameOver && row == height) {
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
    // iterate through letter and fill our blank object with the letters
    for (let i = 0; i < word.length; i++) {
        letter = word[i]
        // if letter is in object, incriment letterCount
        if (letterCount[letter]) {
            letterCount[letter]++;
        }
        else { // letterCount = 1
            letterCount[letter] = 1;
        }
    }

    // iterate through guess word. first iteration checks for correct letters in correct position. update object 

    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // is letter in the correct position?
        // if word letter column == word letter
        if (word[c] == letter) {
            // update tile background color
            currTile.classList.add('correct');
            // update number of correct letters
            correctLetters++;
            // update our letterCount
            letterCount[letter]--;
        }
        if (correctLetters == width) {
            gameOver = true
            document.getElementById("answer").innerText = word;
            
        }
    }

    // iterate again and check which letters are present, but in wrong position
    for (let c = 0; c < width; c++) {
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

