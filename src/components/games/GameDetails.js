import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GameManager } from "../../apimanager/GameManager"
import './GameDetails.css'
/*
DISPLAY: 
Title
Designer
Description
Year released
Number of players
Estimated time to play
Age recommendation
Categories
*/
export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState({})

    useEffect(() => {
        GameManager.get(gameId).then(setGame)
    }, [gameId])

    return (
        <section className="game-details">
            <h3 className="detail-title">{game.title}</h3>
            <div className="detail game-description">{game.description}</div>
            <div className="detail game-designer">Designer: {game.designer}</div>
            <div className="detail game-year">Released: {game.year_released}</div>
            <div className="detail game-players">Number of players: {game.num_of_players}</div>
            <div className="detail game-time">Estimated play time: {game.estimated_play_time} hours</div>
            <div className="detail game-age">Recommended age: {game.age_recommendation} years old</div>
        </section>
    )
}