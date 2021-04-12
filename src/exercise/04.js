// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';
import { useLocalStorageState } from '../utils';

const initialHistory = [Array(9).fill(null)];

function Game() {
  const [history, setHistory] = useLocalStorageState(
    'tictactoe__history',
    initialHistory,
  );

  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tictactoe__step',
    0,
  );

  const currentBoard = history[currentStep];

  const next = calculateNextValue(currentBoard); // Next player
  const winner = calculateWinner(currentBoard);
  const status = calculateStatus(winner, currentBoard, next);

  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // All of this can be placed outside a function because we want it to execute every rerender

  function selectSquare(square) {
    if (winner || currentBoard[square]) {
      return;
    }

    const newHistory = history.slice(0, currentStep + 1); // Ignore all moves after the selected step
    const currentBoardCopy = [...currentBoard];
    currentBoardCopy[square] = next; // Set the X or O for a square

    setHistory([...newHistory, currentBoardCopy]); // Set the new history as an array of the old history plus the new move
    setCurrentStep(newHistory.length); // On square selection, the history length will be the latest step
  }

  function restart() {
    setHistory(initialHistory);
    setCurrentStep(0);
  }

  const moves = history.map((squares, step) => {
    const desc = step === 0 ? 'Go to game start' : `Go to move #${step}`;
    const isCurrentStep = step === currentStep;

    return (
      <li key={step}>
        <button
          type="button"
          disabled={isCurrentStep}
          onClick={() => setCurrentStep(step)}
        >
          {desc} {isCurrentStep && '(current)'}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onTileClick={selectSquare} squares={currentBoard} />
        <button className="restart" onClick={restart}>
          restart
        </button>

        <div className="game-info">
          {status}
          {moves}
        </div>
      </div>
    </div>
  );
}

function Board({ squares, status, onTileClick }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onTileClick(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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

function App() {
  return <Game />;
}

export default App;
