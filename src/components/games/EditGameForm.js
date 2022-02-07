import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { GameManager } from "../../apimanager/GameManager"
import './NewGameForm.css'

/*
INPUT: 
Title
Designer
Description
Year released
Number of players
Estimated time to play
Age recommendation
Categories
*/

export const EditedGameForm = ({ syncGames, categories }) => {
    const history = useHistory()
    const { gameId } = useParams()
    const [gameBuilder, updateExistingGame] = useState({
        title: "",
        designer: "",
        description: "",
        yearReleased: 2022,
        numOfPlayers: 1,
        estimatedPlayTime: 1,
        ageRecommendation: 1,
        categoryId: 0
    })

    useEffect(() => {
        GameManager.get(gameId).then(res => {
            const copy = { ...gameBuilder }
            copy.title = res.title
            copy.designer = res.designer
            copy.description = res.description
            copy.yearReleased = res.year_released
            copy.numOfPlayers = res.num_of_players
            copy.estimatedPlayTime = res.estimated_play_time
            copy.ageRecommendation = res.age_recommendation
            copy.categoryId = res.categories[0].id
            updateExistingGame(copy)
        })
    }, [gameId])

    const handleOnChange = (event) => {
        const copy = { ...gameBuilder }
        const key = event.target.name
        const value = event.target.value
        copy[key] = value
        updateExistingGame(copy)
    }

    const handleSubmitGame = (event) => {
        event.preventDefault()

        const editedGame = {
            title: gameBuilder.title,
            designer: gameBuilder.designer,
            description: gameBuilder.description,
            year_released: parseInt(gameBuilder.yearReleased),
            num_of_players: parseInt(gameBuilder.numOfPlayers),
            estimated_play_time: parseInt(gameBuilder.estimatedPlayTime),
            age_recommendation: parseInt(gameBuilder.ageRecommendation),
            category: parseInt(gameBuilder.categoryId)
        }

        GameManager.update(gameId, editedGame)
            .then(syncGames)
            .then(() => history.push(`/games/${gameId}`))
    }

    return (
        <form className="form">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        className="form-control"
                        required autoFocus
                        placeholder="Enter game title..."
                        name="title"
                        type="text"
                        value={gameBuilder.title}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer:</label>
                    <input
                        className="form-control"
                        required
                        placeholder="Enter game designer..."
                        name="designer"
                        type='text'
                        value={gameBuilder.designer}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        className="form-control"
                        required
                        placeholder="Enter game description..."
                        name="description"
                        value={gameBuilder.description}
                        onChange={handleOnChange}></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year released:</label>
                    <input
                        className="form-control"
                        required
                        name="yearReleased"
                        type='number'
                        max={2022}
                        min={1299}
                        value={gameBuilder.yearReleased}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numOfPlayers">Number of players:</label>
                    <input
                        className="form-control"
                        required
                        name="numOfPlayers"
                        type='number'
                        max={100}
                        min={1}
                        value={gameBuilder.numOfPlayers}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimatedPlayTime">Estimated play time (hours):</label>
                    <input
                        className="form-control"
                        required
                        name="estimatedPlayTime"
                        type='number'
                        min={1}
                        max={100}
                        value={gameBuilder.estimatedPlayTime}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRecommendation">Age recommendation:</label>
                    <input
                        className="form-control"
                        required
                        name="ageRecommendation"
                        type='number'
                        min={1}
                        max={100}
                        value={gameBuilder.ageRecommendation}
                        onChange={handleOnChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categoryId">Category</label>
                    <select
                        className="form-control"
                        required
                        name="categoryId"
                        type='number'
                        value={gameBuilder.categoryId}
                        onChange={handleOnChange}>
                        <option hidden value={0}>Please choose a category...</option>
                        {
                            categories.map(c => {
                                return (
                                    <option key={c.id} value={c.id}>{c.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <div className="btn-container">
                <button id="primaryBtn" typeof="submit" onClick={handleSubmitGame}>Confirm edit</button>
                <button id="primaryBtn" typeof="reset" onClick={() => history.push('/games')}>Cancel</button>
            </div>
        </form>
    )
}