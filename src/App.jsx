import { Children} from 'react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import './index.css'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Square } from './components/Square.jsx'
const TURNS = {
  X: '×',
  O: '○',
}


const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {

const [board, setBoard ] = useState(() => {
  const boardFromStorage = window.localStorage.getItem('board')
  return boardFromStorage 
  ? JSON.parse(boardFromStorage)
  :
  Array(9).fill(null)
}
)
const [turn, setTurn ] = useState(() => {
  
  const turnFromStorage = window.localStorage.getItem('turn')
  return turnFromStorage ?? TURNS.X})

const [winner, setWinner ] = useState(null)
const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

const checkeEndGame = (newBoard) => {
  return newBoard.every((square) => square != null)
} 

const updateboard = (index) => {
  if (board[index] || winner) return
   const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)
  const Newturn= turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(Newturn)
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', Newturn)
  const newWinner = checkWinner(newBoard)
  if (newWinner) {  
    confetti() 
    setWinner(newWinner)
  } else if (checkeEndGame(newBoard)) {
    setWinner(false)
  }
  
}
  return (
  <main className='board'>
    
    <h1>tic tac toe</h1>
    <button onClick={resetGame}>Resetear el juego</button>
    <section className='game'>

      {
        board.map((_, index) => {
          return (
            <Square 
            key={index} 
            index={index}
            updateboard={updateboard}
            >
              {board[index]}
            </Square>
          )
        })
      }

    </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}> {TURNS.X} </Square>
        <Square isSelected={turn == TURNS.O}> {TURNS.O} </Square>
      </section>

  <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
  )  
}
export default App
