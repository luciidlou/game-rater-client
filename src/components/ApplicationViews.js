import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { CategoryManager } from "../apimanager/CategoryManager"
import { GameManager } from "../apimanager/GameManager"
import { EditedGameForm } from "./games/EditGameForm"
import { GameDetails } from "./games/GameDetails"
import { GameList } from "./games/GameList"
import { NewGameForm } from "./games/NewGameForm"
import { ImageList } from "./images/ImageList"


export const ApplicationViews = () => {
    const [games, setGames] = useState([])
    const [categories, setCategories] = useState([])
    const [filterValue, setFilterValue] = useState("")
    const [filterOrder, toggleFilterOrder] = useState("asc")
    const [searchCriteria, setSearchCriteria] = useState("")

    const syncGames = () => {
        if (filterValue && searchCriteria) {
            GameManager.filterAndSearch(filterValue, filterOrder, searchCriteria)
                .then(setGames)
        }
        else if (filterValue) {
            GameManager.filter(filterValue, filterOrder)
                .then(setGames)
        }
        else if (searchCriteria) {
            GameManager.search(searchCriteria)
                .then(setGames)
        }
        else {
            GameManager.getAll()
                .then(setGames)
        }
    }

    const syncCategories = () => {
        CategoryManager.all().then(setCategories)
    }

    useEffect(() => {
        syncGames()
    }, [filterValue, filterOrder, searchCriteria])

    useEffect(() => {
        syncCategories()
    }, [])

    return (
        <>
            <main style={{ margin: "5rem 2rem" }}
            >
                <Route exact path={["/", "/games"]}>
                    <GameList
                        games={games}
                        syncGames={syncGames}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        filterOrder={filterOrder}
                        toggleFilterOrder={toggleFilterOrder}
                        setSearchCriteria={setSearchCriteria}
                    />
                </Route>
                <Route exact path="/games/:gameId(\d+)">
                    <GameDetails />
                </Route>
                <Route exact path="/games/add">
                    <NewGameForm
                        syncGames={syncGames}
                        categories={categories}
                    />
                </Route>
                <Route exact path="/games/:gameId(\d+)/edit">
                    <EditedGameForm
                        syncGames={syncGames}
                        categories={categories}
                    />
                </Route>
                <Route exact path="/images">
                    <ImageList />
                </Route>
            </main>
        </>
    )
}
