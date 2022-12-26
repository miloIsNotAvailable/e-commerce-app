import { RGB, useAvgBgColor } from "@hooks/useAvgBgColor";
import { FC, useEffect, useRef, useState } from "react";
import { styles } from "./BlockStyles";

interface ImageProps {
    src: string
}

const Image: FC<ImageProps> = ( { src } ) => {

    const imgRef = useRef<HTMLImageElement| null>( null )
    const getCol = useAvgBgColor( )
    const [ color, setColor ] = useState<RGB>( { r: 255, g: 144, b: 173 } )

    useEffect( () => {
        if( !imgRef.current ) return
        
        var canvas = document.createElement("canvas");
    
        canvas.width = imgRef.current.width;
        canvas.height = imgRef.current.height;
        
        var ctx = canvas.getContext("2d");
        
        if( !ctx ) return
        ctx.drawImage(imgRef.current, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");

        const img_ = document.createElement( "img" )
        
        img_.crossOrigin = "anonymous"
        img_.src = dataURL
        img_.width = imgRef.current.width 
        img_.height = imgRef.current.height 

        setColor(getCol( img_ ) )
    }, [ imgRef.current ] )

    return <img 
        className={ styles.img }
        crossOrigin={ "anonymous" }
        ref={ imgRef }
        src={ src }
        style={ {
            backgroundColor: `rgb(${ Object.values( color ).join( "," ) })`
        } }
    />
}

export default Image