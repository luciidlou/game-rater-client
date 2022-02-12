import { FetchOptions } from "../utilities/FetchOptions"
import { Settings } from "../utilities/Settings"

export const GameManager = {
    async getAll() {
        const res = await fetch(`${Settings.remoteUrl}/games`, FetchOptions())
        return await res.json()
    },
    async get(id) {
        const res = await fetch(`${Settings.remoteUrl}/games/${id}`, FetchOptions())
        return await res.json()
    },
    async filter(param, toggle) {
        const res = await fetch(`${Settings.remoteUrl}/games?orderby=${param}/${toggle}`, FetchOptions())
        return await res.json()
    },
    async search(criteria) {
        const res = await fetch(`${Settings.remoteUrl}/games?q=${criteria}`, FetchOptions())
        return await res.json()
    },
    async filterAndSearch(param, toggle, criteria) {
        const res = await fetch(`${Settings.remoteUrl}/games?orderby=${param}/${toggle}&q=${criteria}`, FetchOptions())
        return await res.json()
    },
    async add(newGame) {
        const res = await fetch(`${Settings.remoteUrl}/games`, FetchOptions("POST", newGame))
        return res
    },
    async update(id, editedGame) {
        const res = await fetch(`${Settings.remoteUrl}/games/${id}`, FetchOptions("PUT", editedGame))
        return res
    },
    async delete(id) {
        const res = await fetch(`${Settings.remoteUrl}/games/${id}`, FetchOptions("DELETE"))
        return res
    }
}