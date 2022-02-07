import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { CategoryManager } from "../apimanager/CategoryManager"
import { GameManager } from "../apimanager/GameManager"
import { EditedGameForm } from "./games/EditGameForm"
import { GameDetails } from "./games/GameDetails"
import { GameList } from "./games/GameList"
import { NewGameForm } from "./games/NewGameForm"

export const ApplicationViews = () => {
    const [games, setGames] = useState([])
    const [categories, setCategories] = useState([])

    const syncGames = () => {
        GameManager.getAll().then(setGames)
    }

    const syncCategories = () => {
        CategoryManager.all().then(setCategories)
    }

    useEffect(() => {
        syncGames()
        syncCategories()
    }, [])

    return (
        <>
            <main style={{ margin: "5rem 2rem"}}
            >
                <Route exact path={["/", "/games"]}>
                    <GameList
                        games={games}
                        syncGames={syncGames}
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
            </main>
        </>
    )
}
