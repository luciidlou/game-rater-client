import { useHistory } from "react-router-dom"
import { GameManager } from "../../apimanager/GameManager"
import './GameList.css'
export const GameList = ({ games, syncGames }) => {
    const history = useHistory()

    const handleDeleteGame = (id) => {
        GameManager.delete(id)
            .then(syncGames)
    }

    return (
        <article className="games-container">
            <div className="games-header">
                <h2>List of games</h2>
                <button id="primaryBtn" onClick={() => history.push('/games/add')}>Register new game</button>
            </div>
            {
                games.map(game => {
                    
                    return (
                        <section key={game.id} className="games">
                            <div className="game">
                                <div className="game-title" onClick={() => history.push(`/games/${game.id}`)}>{game.title}</div>
                            </div>
                            <div className="btn-container">
                                <button id="editBtn" onClick={() => history.push(`/games/${game.id}/edit`)}>Edit</button>
                                <button id="secondaryBtn" onClick={() => handleDeleteGame(game.id)}>Delete</button>
                            </div>
                        </section>
                    )
                })
            }
        </article>
    )
}