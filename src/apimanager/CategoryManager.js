import { FetchOptions } from "../utilities/FetchOptions"
import { Settings } from "../utilities/Settings"

export const CategoryManager = {
    async all() {
        const res = await fetch(`${Settings.remoteUrl}/categories`, FetchOptions())
        return res.json()
    }
}