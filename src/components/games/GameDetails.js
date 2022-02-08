import { Box, Rating } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GameManager } from "../../apimanager/GameManager"
import './GameDetails.css'
import { GameRatingsManager } from "../../apimanager/GameRatingManager";
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
    const [existingRating, setExistingRating] = useState(null)
    const [hover, setHover] = useState(-1);

    const syncRating = () => {
        GameRatingsManager.getRatingsByGame(gameId)
            .then(ratings => {
                const foundRating = ratings.find(r => r.is_rater === true && r.game?.id === parseInt(gameId))
                if (foundRating) {
                    setExistingRating(foundRating) && setHover(foundRating.rating)
                }
            })
    }

    useEffect(() => {
        syncRating()
        GameManager.get(gameId).then(setGame)
    }, [])

    const labels = {
        0: 'Rate this game!',
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    }


    const handleGameRating = (event, newValue) => {
        const newRating = {
            game: parseInt(gameId),
            rating: newValue
        }

        if (existingRating === null) {
            GameRatingsManager.add(newRating).then(syncRating)
        }
        else {
            existingRating.rating = newValue
            if (existingRating.rating === null) {
                GameRatingsManager.delete(existingRating.id)
                    .then(() => setExistingRating(null))
                    .then(syncRating)
            }
            else {
                GameRatingsManager.update(existingRating).then(syncRating)
            }
        }
    }

    return (
        game.categories
            ?
            <section className="game-details">
                <h3 className="detail-title">{game.title} ({game.categories[0].label})</h3>
                <div className="detail game-description">{game.description}</div>
                <div className="detail game-designer">Designer: {game.designer}</div>
                <div className="detail game-year">Released: {game.year_released}</div>
                <div className="detail game-players">Number of players: {game.num_of_players}</div>
                <div className="detail game-time">Estimated play time: {game.estimated_play_time} hours</div>
                <div className="detail game-age">Recommended age: {game.age_recommendation} years old</div>
                <Box
                    sx={{
                        width: 300,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Rating
                        name="rating"
                        value={existingRating ? existingRating.rating : 0}
                        precision={0.5}
                        onChange={handleGameRating}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {
                        existingRating !== null
                            ?
                            <Box sx={{ ml: 2 }}>{labels[hover === -1 ? existingRating.rating : hover]}</Box>
                            :
                            <Box sx={{ ml: 2 }}>{labels[hover === -1 ? 0 : hover]}</Box>

                    }
                </Box>
            </section>
            :
            ""
    )
}