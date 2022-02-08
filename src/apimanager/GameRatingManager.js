import { FetchOptions } from "../utilities/FetchOptions"
import { Settings } from "../utilities/Settings"

export const GameRatingsManager = {
    async all() {
        const res = await fetch(`${Settings.remoteUrl}/gameratings`, FetchOptions())
        return await res.json()
    },
    async get(id) {
        const res = await fetch(`${Settings.remoteUrl}/gameratings/${id}`, FetchOptions())
        return await res.json()
    },
    async getRatingsByGame(gameId) {
        const res = await fetch(`${Settings.remoteUrl}/gameratings?game=${gameId}`, FetchOptions())
        return await res.json()
    },
    async add(newRating) {
        const res = await fetch(`${Settings.remoteUrl}/gameratings`, FetchOptions("POST", newRating))
        return res
    },
    async update(updatedRating) {
        const res = await fetch(`${Settings.remoteUrl}/gameratings/${updatedRating?.id}`, FetchOptions("PUT", updatedRating))
        return res
    },
    async delete(id) {
        const res = await fetch(`${Settings.remoteUrl}/gameratings/${id}`, FetchOptions("DELETE"))
        return res
    },
}