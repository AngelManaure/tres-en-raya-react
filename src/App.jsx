import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { TURNS } from './components/constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

import './App.css'

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null es que no hay ganador, y false es un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  const updateBoard = (index) => {
    //No actualizamos una posición si ya tiene algo
    //o si hay un ganador
    if (board[index] || winner) return
    //actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //Revisamos si hay un ganador
    const newWinner = checkWinner(newBoard)
    //si es que hay, lo establecemos
    if (newWinner) {
        confetti()
        setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)//Empate
    }
  }

  return (
  <main className="board">
    <h1>Tic tac toe</h1>
    <button onClick={resetGame}>Empezar de nuevo</button>
    <section className="game">
      {
        board.map((_, index) => {
          return (
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
    </section>

    <section className="turn">
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
        </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
        </Square>
    </section>

    <WinnerModal resetGame={resetGame} winner={winner} />
  </main>
  )
}

export default App
