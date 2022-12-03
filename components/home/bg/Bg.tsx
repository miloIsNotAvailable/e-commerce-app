import { FC, useEffect, useRef } from "react";
import { Application } from '@splinetool/runtime';
import { styles } from "../build/HomeStyles";

const Bg: FC = () => {
    
    const ref = useRef<HTMLCanvasElement | null>( null )

    useEffect( () => {
        if( !ref.current ) return

        const app = new Application( ref.current );
        app.load('https://prod.spline.design/CC2m5QPKtUULORZk/scene.splinecode');
    }, [ ref.current ] )

    return (
        <div className={ styles.wrap_canvas }>
            <canvas
                ref={ ref }
                // width={ typeof window == "undefined" ? 1920 : window.innerWidth }
                // height={ typeof window == "undefined" ? 1080 : .78 * window.innerHeight - 5 * 18 }
            />
        </div>
    )
}

export default Bg