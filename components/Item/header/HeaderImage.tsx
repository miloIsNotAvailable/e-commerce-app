import { useItemContext } from "@contexts/ItemContext";
import { RGB, useAvgBgColor } from "@hooks/useAvgBgColor";
import { FC, useEffect, useRef, useState } from "react";
import { styles } from "../build/ItemStyles";

const HeaderImage: FC = () => {

    const { isLoading, getItem } = useItemContext()
    const imgRef = useRef<HTMLImageElement| null>( null )
    const getCol = useAvgBgColor()
    const [ color, setColor ] = useState<RGB>( { r: 255, g: 144, b: 173 } )
    
    useEffect( () => {
        if( !imgRef.current || isLoading ) return

        var canvas = document.createElement("canvas");
    
        canvas.width = imgRef.current.width;
        canvas.height = imgRef.current.height;
        
        var ctx = canvas.getContext("2d");
        
        if( !ctx ) return
        ctx.drawImage(imgRef.current, 0, 0);
        ctx.fillStyle = "rgb( 255, 144, 173 )"

        var dataURL = canvas.toDataURL("image/png");

        const img_ = document.createElement( "img" )
        
        img_.crossOrigin = "anonymous"
        img_.src = dataURL
        img_.width = imgRef.current.width 
        img_.height = imgRef.current.height 

        setColor(getCol( img_ ) )
    }, [ imgRef, isLoading ] )    
    
    return (
        <img
            className={ styles.item_header_img } 
            src={ isLoading ? "" : getItem?.img }
            crossOrigin={ "anonymous" }
            ref={ imgRef }
            style={ {
                backgroundColor: `rgb(${ Object.values( color ).join( "," ) })`
            } }
        />
    )
}

export default HeaderImage