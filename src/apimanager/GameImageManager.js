import { FetchOptions } from "../utilities/FetchOptions"
import { Settings } from "../utilities/Settings"

export const GameImageManager = {
    async add(newImage) {
        const res = await fetch(`${Settings.remoteUrl}/gameimages`, FetchOptions("POST", newImage))
        return res
    }
}