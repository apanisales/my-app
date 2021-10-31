import cloneDeep from 'lodash/cloneDeep';

function calculateWinner(grid, currentPlayer) {
  let winningString = "";
  for (let i = 0; i < 4; i++) {
    winningString += currentPlayer + ","
  }
  winningString = winningString.slice(0, -1); // ex. winningString = Red,Red,Red,Red

  // Check horizontally
  for (let row = 0; row < grid.length; row++) {
    let rowString = grid[row].toString();
    if (rowString.includes(winningString)) { // ex. rowString = White,Red,White,White,White,White,White
      return currentPlayer;
    }
  }

  // Check vertically
  for (let col = 0; col < grid[0].length; col++) {
    let columnString = "";
    for (let row = 0; row < grid.length; row++) {
      columnString += grid[row][col] + ",";
    }
    if (columnString.includes(winningString)) { // ex. columnString = White,Red,White,White,White,White,White,
      return currentPlayer;
    }
  }

  // Check diagonally going down to the right
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      let diagonalString = "";
      for (let i = 0; i < 4; i++) {
        diagonalString += grid[row + i][col + i] + ",";
      }
      if (diagonalString.includes(winningString)) { // ex. diagonalString = White,Red,White,White,
        return currentPlayer;
      }
    }
  }

  // Check diagonally going down to the left
  for (let row = 0; row < 3; row++) {
    for (let col = 6; col > 2; col--) {
      let diagonalString = "";
      for (let i = 0; i < 4; i++) {
        diagonalString += grid[row + i][col - i] + ",";
      }
      if (diagonalString.includes(winningString)) { // ex. diagonalString = White,Red,White,White,
        return currentPlayer;
      }
    }
  }

  return null;
}

export function createInitialState() {
  return {
    currentPlayer: null,
    grid: [
      ['White', 'White', 'White', 'White', 'White', 'White', 'White'],
      ['White', 'White', 'White', 'White', 'White', 'White', 'White'],
      ['White', 'White', 'White', 'White', 'White', 'White', 'White'],
      ['White', 'White', 'White', 'White', 'White', 'White', 'White'],
      ['White', 'White', 'White', 'White', 'White', 'White', 'White'],
      ['White', 'White', 'White', 'White', 'White', 'White', 'White']
    ],
    winner: null
  }
}

export function handlePlayerMove({currentPlayer, grid}, col) {
  const nextGrid = cloneDeep(grid);

  for (let row = 5; row >= 0; row--) {
    if (nextGrid[row][col].includes('White')) {
      nextGrid[row][col] = currentPlayer;
      break;
    }
  }

  return {
    currentPlayer: currentPlayer === 'Red' ? 'Yellow' : 'Red',
    grid: nextGrid,
    winner: calculateWinner(nextGrid, currentPlayer)
  }
}

export function highlightColumn({currentPlayer, grid, winner}, col) {
  const nextGrid = cloneDeep(grid);

  for (let row = 5; row >= 0; row--) {
    if (nextGrid[row][col].includes("White") && !nextGrid[row][col].includes("Hover")) {
      nextGrid[row][col] += "Hover";
    }
  }

  return {
    currentPlayer: currentPlayer,
    grid: nextGrid,
    winner: winner
  }
}

export function unHighlightColumn({currentPlayer, grid, winner}, col) {
  const nextGrid = cloneDeep(grid);

  for (let row = 5; row >= 0; row--) {
    if (nextGrid[row][col].includes("Hover")) {
      nextGrid[row][col] = nextGrid[row][col].replace('Hover', '');
    }
  }

  return {
    currentPlayer: currentPlayer,
    grid: nextGrid,
    winner: winner
  }
}

export function checkIfColumnIsFree(grid, col) {
  for (let row = 5; row >= 0; row--) {
    if (grid[row][col].includes("White")) {
      return true;
    }
  }
  return false;
}

export function setFirstPlayer(state, firstPlayer) {
  return {
    currentPlayer: firstPlayer,
    grid: state.grid,
    winner: state.winner
  };
}