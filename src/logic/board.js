import { WINNER_COMBOS } from "../components/constants"

export const checkWinner = (boardToCheck) => {
    //Revisamos todas las combinaciones ganadoras para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //Si no hay ganador
    return null
  }

  export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate si no hay más espacios vacios
    //en el tablero
    return newBoard.every((square) => square !== null)
  }