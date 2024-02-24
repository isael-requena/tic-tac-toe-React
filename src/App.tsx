import { useState } from "react"
import confetti from "canvas-confetti"
import Square from "./components/square/Square"
import WinnerModal from "./components/winner-modal/WinnerModal"
import { TURNS } from "./providers/constants"
import { WINNER_COMBOS } from "./providers/constants"
import { IBoard, IWinner } from "./types/game.types"
import TicTacToePositiveSvg from "./assets/svg/tic-tac-toe/tic-tac-toe-logo-positive.svg"
import { deleteAllLocalStorage, deleteItemLocalStorage, getLocalStorage, setLocalStorage } from "./services/local-storage.service"

function App() {
  const [board,setBoard] = useState<IBoard>(() => {
    const boardLocalStorage = getLocalStorage<IBoard>('board')
    console.log('board', boardLocalStorage)
    return boardLocalStorage ?? Array(9).fill(null)
  });
  const [turn,setTurn] = useState<TURNS>(() => {
    const turnLocalStorage = getLocalStorage<TURNS>('turn')
    return turnLocalStorage ?? TURNS.X
  });
  const [winner,setWinner] = useState<IWinner>(null)

  const checkWinner = (boardToCheck: IBoard): TURNS | null => {
    for (let combo of WINNER_COMBOS) {
      const [a,b,c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null
  }

  const checkEndGame = (newBoard:IBoard):boolean => {
    return newBoard.every(square => square !== null)
  }

  const updateBoard = (index:number) => {
    //If already exist, don't update it
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) //Change Turn
    //Save game
    setLocalStorage('board', newBoard)
    setLocalStorage('turn', newTurn)
    //Check a winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    else if (checkEndGame(newBoard)) setWinner(false)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null);
    deleteItemLocalStorage('board')
    deleteItemLocalStorage('turn')
  }

  return (
    <main className="board">
      <div className="logo-container">
        <img className="logo" src={TicTacToePositiveSvg} alt="Tic Tac Toe Logo" />
        <h1 className="title">Tic Tac <br/> Toe</h1>
      </div>
      <button onClick={resetGame} className="reset-btn">Reset Game</button>
      <section className="game">
        {board.map((square, index:number) => {
          return (
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}>
                {square}
            </Square>
          )
        })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
