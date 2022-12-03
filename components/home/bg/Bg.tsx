import { FC, useEffect, useRef, useState } from "react";
import { Application } from '@splinetool/runtime';
import { styles } from "../build/HomeStyles";

const Bg: FC = () => {

    const [ { height, width }, setSize ] = useState<{ width: number, height: number }>( { width: window.innerWidth, height: window.innerHeight } )
    const ref = useRef<HTMLCanvasElement | null>( null )


    useEffect( () => {
        
        window.onresize = () => {
            setSize( { 
                width: window.innerWidth, 
                height: .78 * window.innerHeight - 4 * 18 
            } )    
        }
    } )

    useEffect( () => {
        if( !ref.current ) return

        const app = new Application( ref.current );
        app.load('https://prod.spline.design/CC2m5QPKtUULORZk/scene.splinecode');
    }, [ ref.current ] )

    return (
        <div className={ styles.wrap_canvas }>
            <canvas
                ref={ ref }
                width={ width }
                height={ height }
            />
        </div>
    )
}

export default Bg