// Tic Tac Toe: useReducer
import React, { useReducer } from 'react'

function Board({ squares, onClick }) {
  const renderSquare = i => (
    <button className="square" onClick={() => onClick(i)}>
      {squares[i]}
    </button>
  )

  return (
    <div>
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
  )
}


function historyReducer(state, action) {
  switch (action.type) {
    case 'ADD_ENTRY': {
      const newHistory = state.history.slice(0, state.entryNumber + 1)
      state.history = [...newHistory, action.newEntry]
      console.log(state.history)
      return { history: state.history, entryNumber: state.history.length - 1 }
    }
    case 'GO_TO_ENTRY': {
      return { ...state, entryNumber: action.entryNumber }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }

}

// 💯 That history functionality is pretty cool! Why don't you try to make a
//    reusable version of that hook? You could call it `useHistory` or something
//    and it could expose the following data/functions: history, entryNumber,
//    current, goToEntry, and addEntry. Then you can use that instead. You'll
//    need to move some of the logic around to make it generic enough to be
//    useful, but it's pretty neat.

function useHistory(intialHistory = [], initialEntryNumber = 0) {
  // Function returns {history, entryNumber, current, goToEntry, addEntry}
  const [state, dispatch] = useReducer(historyReducer, { history: intialHistory, entryNumber: initialEntryNumber })

  const { history, entryNumber } = state

  const current = history[entryNumber]

  const goToEntry = (newEntryNumber) => {
    return dispatch({ type: "GO_TO_ENTRY", entryNumber: newEntryNumber })
  }

  const addEntry = (newEntry) => {
    return dispatch({ type: "ADD_ENTRY", newEntry })
  }

  return { history, entryNumber, current, goToEntry, addEntry }
}

// 💯 Once you've got `useHistory`, you might consider making a `useGame` custom
//    hook that handles all the logic for our component. Just for fun. It would
//    use the `useHistory` hook and it could expose the following
//    data/functions: history, squares, selectSquare, goToStep, status
//    When you're done, your component will simply use `useGame` and return some
//    JSX elements. Cool right!?
function useGame(){
  const { history, entryNumber, current, goToEntry, addEntry } = useHistory([{ squares: Array(9).fill(null) }])

  const xIsNext = entryNumber % 2 === 0
  const { squares } = current

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return
    }
    const newSquares = [...squares]
    newSquares[square] = xIsNext ? 'X' : 'O'
    addEntry({ squares: newSquares })
  }

  const winner = calculateWinner(current.squares)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (current.squares.every(Boolean)) {
    status = `Scratch: Cat's game`
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  return {history, squares, selectSquare, goToStep: goToEntry, status}
}
function Game() {

  const {history, squares, selectSquare, goToStep, status} = useGame()
  const moves = history.map((step, stepNumber) => {
    const desc = stepNumber ? `Go to move #${stepNumber}` : 'Go to game start'
    return (
      <li key={stepNumber}>
        <button onClick={() => goToStep(stepNumber)}>{desc}</button>
      </li>
    )
  })

  // If you've made it this far and the tests are still passing and the app
  // still works then you're done! 🎉 Don't forget the 💯 below!

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={squares} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}




////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Usage() {
  return <Game />
}
Usage.title = 'Tic Tac Toe: useReducer'

export default Usage
