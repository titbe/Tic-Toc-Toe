export function easyMove(squares) {
  const availableMoves = squares
    .map((val, index) => (val === null ? index : null))
    .filter((val) => val !== null);

  return availableMoves.length > 0
    ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
    : null;
}

export function mediumMove(squares) {
  return minimax(squares, true, false).index;
}

export function hardMove(squares) {
  return minimax(squares, true, true).index;
}

function minimax(squares, isMaximizing, useDepth, depth = 0) {
  const winner = calculateWinner(squares);
  if (winner === 'X') return { score: -10 + depth };
  if (winner === 'O') return { score: 10 - depth };
  if (isBoardFull(squares)) return { score: 0 };

  const scores = [];
  const moves = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = isMaximizing ? 'O' : 'X';
      const result = minimax(squares, !isMaximizing, useDepth, depth + 1);
      scores.push(result.score);
      moves.push(i);
      squares[i] = null;
    }
  }

  if (isMaximizing) {
    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    return { score: scores[maxScoreIndex], index: moves[maxScoreIndex] };
  } else {
    const minScoreIndex = scores.indexOf(Math.min(...scores));
    return { score: scores[minScoreIndex], index: moves[minScoreIndex] };
  }
}

function isBoardFull(squares) {
  return squares.every(square => square !== null);
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
