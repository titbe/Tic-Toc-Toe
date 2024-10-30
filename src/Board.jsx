function Square({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 text-2xl font-bold flex items-center justify-center rounded-lg transition-colors duration-200 
      ${value ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

export default Board;
