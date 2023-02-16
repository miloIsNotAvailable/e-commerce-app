import { FC, useEffect, useRef, useState } from "react";
// import { Application } from '@splinetool/runtime';
import { styles } from "../build/HomeStyles";

const Bg: FC = () => {

    const [ { height, width }, setSize ] = useState<{ width: number, height: number }>( { width: window.innerWidth, height: window.innerHeight } )
    const ref = useRef<HTMLCanvasElement | null>( null )

    useEffect( () => {
        setSize( { 
            width: window.innerWidth, 
            height: .78 * window.innerHeight - 4 * 18 
            // height: window.innerHeight
        } )
    }, [] )

    useEffect( () => {
        
        window.onresize = () => {
            setSize( { 
                width: window.innerWidth, 
                height: .78 * window.innerHeight - 4 * 18 
                // height: window.innerHeight
            } )    
        }    
    } )

    useEffect( () => {
        if( !ref.current ) return
        
        window.requestIdleCallback( async() => {

            if( !ref.current ) return

            const { Application } = await import( "@splinetool/runtime" )

            const app = new Application( ref.current );
            app.load('https://prod.spline.design/75QCvQpuF7jUvShM/scene.splinecode');
        } )

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