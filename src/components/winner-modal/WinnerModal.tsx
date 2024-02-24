import { IWinner } from "../../types/game.types"
import Square from "../square/Square"
// import TicTacToeSvg from '../../assets/tic-tac-toe/tic-tac-toe-win.svg'

type IWinnerProps = {
  winner: IWinner,
  resetGame: () => void
}

const WinnerModal = ({winner, resetGame}:IWinnerProps): JSX.Element | null => {
  if (winner === null) return null

  const winnerText = winner === false ? 'Tied game' : 'Winning Player'

  return (
    <section className="winner">
      <div className="text">
        <h2>
          {winnerText}
        </h2>

        <header className="win">
          {winner && <Square> {winner} </Square> }
        </header>

        <footer>
          <button onClick={resetGame}>
            Start again
          </button>
        </footer>
      </div>
    </section>
  )
}

export default WinnerModal