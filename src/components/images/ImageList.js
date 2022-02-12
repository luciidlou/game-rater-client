import { useEffect, useState } from "react"
import { ImageManager } from "../../apimanager/ImageManager"

export const ImageList = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        ImageManager.all().then(setImages)
    }, [])

    return (
        <div className="images">
            {
                images.map(img => {
                    return (
                        <div key={img.id} className="image">
                            <img src={img.action_pic}></img>
                        </div>
                    )
                })
            }
        </div>
    )
}