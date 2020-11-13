/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    // Creating empty arrays (6x7) within an empty array (board)
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH })); // create array from an object with a length property
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.getElementById("board");
    // TODO: add comment for this code
    const top = document.createElement("tr"); // creates top table row
    top.setAttribute("id", "column-top"); // sets ID to "column-top"
    top.addEventListener("click", handleClick); // adds "click" event listener w/ function handleClick()

    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement("td"); // creates individual cells on top table row
        headCell.setAttribute("id", x); // sets ID to each individual cell
        top.append(headCell); // adds headCell elements to parent element
    }
    htmlBoard.append(top); // add the top table row element to the htmlBoard

    // TODO: add comment for this code
    // iterates through HEIGHT value (6)
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr"); // creates table row element
        // iterates through WIDTH value (7)
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td"); // creates table data cell element
            cell.setAttribute("id", `${y}-${x}`); // sets data cell ID to the value of "`${y}-${x}`"
            // ex: starting in upper left corner going right (0-0), (0,1), (0,2)
            row.append(cell); // adds data cell element as a child element to table row element
        }
        htmlBoard.append(row); // adds table row element as a child element to htmlBoard element
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    for (let y = HEIGHT - 1; y >= 0; y--) { // y = 5, and as long as y >= 0, then increment down by 1
        if (!board[y][x]) { // if not within the board array
            console.log(y);
            return y; // returns the row
        }
    }
    return null; // if column is already filled, return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const piece = document.createElement("div");

    piece.classList.add("piece");
    piece.classList.add(`p${currPlayer}`);

    const correctCell = document.getElementById(`${y}-${x}`);
    correctCell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
    // TODO: pop up alert message
    alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return; // is returning true
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x); // calling function and passing in y, x coordinates
    board[y][x] = currPlayer; // spot in the empty array is where the currPlayer is added

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if (board.every(row =>
        row.every(cell => cell))) {
        return endGame("Tie!");
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    return currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.

    for (let y = 0; y < HEIGHT; y++) { // iterates through HEIGHT length (6)
        for (let x = 0; x < WIDTH; x++) { // iterates through WIDTH length (7)
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // sets variable to four corresponding horizontal coordinates
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // sets variable to four corresponding vertical coordinates
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // sets variable to four corresponding diagonal-right coordinates
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // sets variable to four corresponding diagonal-left coordinates

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();