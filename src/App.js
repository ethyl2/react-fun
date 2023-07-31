import React from 'react';
import { useState } from 'react';

function Square({value, onSquareClick}) {
  
  return (
    <button className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill('❓'))

  function handleClick(index) {
    if (squares[index] === '🩻' || squares[index] === '🍩' || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "🩻"
    } else {
      nextSquares[index] = "🍩"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner === 'Tie') {
    status = 'It\'s a 👔. Try again!'
  }
  else if (winner) {
    status = '🏆 Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? '🩻' : '🍩')
  }

  function resetGame() {
    setSquares(Array(9).fill('❓'))
    setXIsNext(true)
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="container mx-auto italic text-red-500">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
      </div>

      <button onClick={resetGame} className="px-2.5 py-1.5 mt-8 font-bold text-center text-white bg-red-500 rounded-full ml-4text-sm md:ml-12 md:px-4 md:py-2 md:text-lg hover:bg-red-600">Reset Game</button>
    </div>
  )
}

function calculateWinner(squares) {
    // If all the squares are filled with a value and there is no winner, it's a tie
    if (!squares.includes('❓')) {
      return 'Tie'
    }
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] !== '❓') {
        return squares[a];
      }
    }
    return null;
}
