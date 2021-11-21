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
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // create a new table row with the id of column-top to set css styling and assign to variable 'top'
  //listen for 'click' on new tr element and execute the function handleClick
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //while the number of cells in the row is less than the width of the table (7) add a new table data element to the row and apply the id - index of x 
  //add the new data cell to the top row
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  //add the top row to the table
  htmlBoard.append(top);

  // while the number of rows is less than the HEIGHT and number of cells is less than the width, add a new row and a new cell
  //append the cells to each row
  //add an id to each cell that is equal to index of 'y-x'
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    //add the rows to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // start with y equal to the lowest block, and while y is greater than or equal to 0 reduce by 1 to check if the block is empty.
  //if the block is empty (no value for y) return the index of y
  //else return null
  for (y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);

  //define the target spot using the value of y-x. Append the new piece to that spot
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  window.alert(`${msg}`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer; //updates board array with val of currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Congratulations Player ${currPlayer}!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // if (board.every(row => row.every(cell => cell))) {
  //   return endGame(`you both could have done better...`);
  // }

  if (board.flat().every(cell => cell)) {
    return endGame('you both could have done better...')
  }



  // switch players
  // TODO: switch currPlayer 1 <-> 2

  // if (currPlayer === 1) {
  //   currPlayer = 2;
  // } else {
  //   currPlayer = 1;
  // }

  currPlayer = currPlayer === 1 ? 2 : 1;

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

  //seems really tedious, but its creating every possible horizontal, vertical, diagonal up and diagonal down array (of 4) for the entire board,
  //then uses every one of those arrays as an argument for the _win() function,
  //which checks every one of those possible arrays to see if all pieces in that array of 4 are the same player color
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3]];
      
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x]];
      
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3]];
      
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


window.addEventListener("load", e => {
  document.getElementById("new-game-btn").onclick = function () {
    location.reload();
  }
});

makeBoard();
makeHtmlBoard();
