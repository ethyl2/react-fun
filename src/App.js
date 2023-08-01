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

function Board({ xIsNext, squares, onPlay, onResetGame }) {

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
    onPlay(nextSquares)
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

  return (
    <div>
      <div className="text-lg font-bold text-red-500 status">{status}</div>
      <div className="container mx-auto italic text-red-500 shadow-lg">
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

      <button onClick={onResetGame} className="px-2.5 py-1.5 mt-8 font-bold text-center text-white bg-red-500 rounded-full ml-4text-sm md:ml-12 md:px-4 md:py-2 md:text-lg hover:bg-red-600">Reset Game</button>
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

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill('❓')])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function resetGame() {
    setHistory([Array(9).fill('❓')])
    setCurrentMove(0)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move} className="w-full px-2 py-1 border border-gray-400 rounded shadow hover:bg-gray-100 md:text-sm lg:text-base md:px-1 lg:px-2">
        <button onClick={() => jumpTo(move)} >{description}</button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center md:items-start md:justify-between game md:flex-row xl:justify-center xl:space-x-6">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onResetGame={resetGame}/>
      </div>
      <div className="w-full px-4 pt-4 sm:w-1/3 game-info">
        <p className="pb-4 text-lg font-bold text-red-500">Game History</p>
        <ol className="flex flex-col w-full space-y-2 list-decimal list-inside">{moves}</ol>
      </div>
    </div>
  )
}
