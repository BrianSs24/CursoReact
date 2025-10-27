import { Square } from './Square'

    export {Square} from './Square.jsx'
    export function WinnerModal ({ winner, resetGame })
    {
        if (winner == null) return null  
         return (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner == false
                  ? 'Empate'
                  : 'Ha ganado: '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <button onClick={resetGame}>
                Empezar de nuevo
              </button>
            </div>
          </section>
        ) 
      }