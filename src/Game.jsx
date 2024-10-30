import { useState, useEffect } from 'react';
import Board from './Board';
import { easyMove, mediumMove, hardMove, calculateWinner } from './AI';

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setResult(winner === 'X' ? 'You Win!' : 'BOT Wins!');
      return;
    } else if (isBoardFull(squares)) {
      setResult('Draw!');
      return;
    }

    if (!isXNext && mode && !result) {
      let aiMove;
      if (mode === 'Easy') aiMove = easyMove(squares);
      else if (mode === 'Medium') aiMove = mediumMove(squares);
      else if (mode === 'Hard') aiMove = hardMove(squares);

      if (aiMove !== null) {
        const newSquares = squares.slice();
        newSquares[aiMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }
    }
  }, [isXNext, mode, result, squares]);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i] || !isXNext || !mode || result) return;
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setIsXNext(false);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setMode(null);
    setResult(null);
  };

  const status = result
    ? result
    : mode
    ? `Next player: ${isXNext ? 'X' : 'O'}`
    : 'Select a mode to start playing';

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-xs mx-auto">
      <div className="mb-4 space-x-2">
        {!mode && (
          <>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => setMode('Easy')}>Easy</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => setMode('Medium')}>Medium</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => setMode('Hard')}>Hard</button>
          </>
        )}
      </div>
      <Board squares={squares} onClick={handleClick} />
      <div className="mt-4 text-lg font-semibold text-gray-700">{status}</div>
      {result && (
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={resetGame}>Play Again</button>
      )}
    </div>
  );
}

function isBoardFull(squares) {
  return squares.every(square => square !== null);
}

export default Game;
