import { IWinner } from "../../types/game.types"
import Square from "../square/Square"
// import TicTacToeSvg from '../../assets/tic-tac-toe/tic-tac-toe-win.svg'
import './WinnerModal.css'

type IWinnerProps = {
  winner: IWinner,
  resetGame: () => void
}

const WinnerModal = ({winner, resetGame}:IWinnerProps): JSX.Element | null => {
  if (winner === null) return null

  const winnerText = winner === false ? 'Tied game' : 'Winning Player'

  return (
    <section className="modal-container">
      <div className="modal">
        <h1 className="modal__title">
          {winnerText}
        </h1>

          <header className="win">
          { winner && <Square> {winner} </Square> }
         </header>

        <footer>
          <button onClick={resetGame} className="modal__btn">
            Start again &rarr;
          </button>
        </footer>
      </div>

    </section>
  )
}

export default WinnerModal