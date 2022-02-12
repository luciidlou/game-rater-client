import { useHistory } from "react-router-dom"
import { GameManager } from "../../apimanager/GameManager"
import './GameList.css'
import FilterListIcon from '@mui/icons-material/FilterList';

export const GameList = ({ games, syncGames, filterValue, setFilterValue, filterOrder, toggleFilterOrder, setSearchCriteria }) => {
    const history = useHistory()

    const handleDeleteGame = (id) => {
        GameManager.delete(id)
            .then(syncGames)
    }

    const filterControl = (event) => {
        setFilterValue(event.target.value)
    }

    const toggleOrder = () => {
        filterOrder === "asc"
            ? toggleFilterOrder("desc") : toggleFilterOrder("asc")
    }

    const executeSearch = (event) => {
        setSearchCriteria(event.target.value)
    }


    const filters = [
        {
            id: 1,
            label: "Year released",
            param: "year_released"
        },
        {
            id: 2,
            label: "Estimated time to play",
            param: "estimated_play_time"
        },
        {
            id: 3,
            label: "Designer",
            param: "designer"
        }
    ]

    return (
        <article className="games-container">
            <div className="games-header">
                <h2>List of games</h2>
                <button id="primaryBtn" onClick={() => history.push('/games/add')}>Register new game</button>
                <div className="list-filter">
                    <div>Filter by:</div>
                    <select
                        className="filter-select"
                        onChange={filterControl}>
                        <option value="">N/A</option>
                        {
                            filters.map(filter => {
                                return (
                                    <option key={filter.id} value={filter.param}>{filter.label}</option>
                                )

                            })
                        }
                    </select>
                    <FilterListIcon className="flip-filter" onClick={toggleOrder} />
                    <span>{filterOrder === "asc" ? "asc" : "desc"}</span>
                    <div className="search-bar">
                        <label htmlFor="search-criteria">Search: </label>
                        {
                            // filterValue === ""
                            //     ?
                                <input type="text" onChange={executeSearch} />
                            //     :
                            //     <input type="text" disabled onChange={executeSearch} />
                        }
                    </div>
                </div>
            </div>
            {
                games.map(game => {
                    return (
                        <section key={game.id} className="games">
                            <div className="game-title" onClick={() => history.push(`/games/${game.id}`)}>{game.title} ({game.categories[0].label})</div>
                            <div>Year: {game.year_released} | {game.designer} | Play time: {game.estimated_play_time} hour(s)</div>
                            {
                                game.uploaded
                                    ?
                                    <div className="btn-container">
                                        <button id="editBtn" onClick={() => history.push(`/games/${game.id}/edit`)}>Edit</button>
                                        <button id="secondaryBtn" onClick={() => handleDeleteGame(game.id)}>Delete</button>
                                    </div>
                                    :
                                    ""
                            }
                        </section>
                    )
                })
            }
        </article>
    )
}
