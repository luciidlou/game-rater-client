import { FetchOptions } from "../utilities/FetchOptions"
import { Settings } from "../utilities/Settings"

export const ImageManager = {
    async all() {
        const res = await fetch(`${Settings.remoteUrl}/gameimages`, FetchOptions())
        return await res.json()
    }
}