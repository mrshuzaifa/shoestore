"use client"
import { Image } from "@/types";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css'


interface GalleryProps {
    images: Image[];
    thumbnailPosition: "left" | "bottom" | "top" | "right" ;
}

const Gallery:React.FC<GalleryProps> = ({
    images,
    thumbnailPosition
}) => {
    const galleryImages = images.map((image)=>{ return { original:image.url, thumbnail: image.url} } )
    return (
        <div>
        <ImageGallery 
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={false}
            thumbnailPosition={thumbnailPosition} />
        </div>
     );
}
 
export default Gallery;