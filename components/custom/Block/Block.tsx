import { FC, lazy, Suspense } from "react";
import Button from "../Button";
import Fallback from "../LazyLoad/Fallback";
import { styles } from "./BlockStyles";
const Image = lazy( () => import( "./Image" ) )

const Block: FC = () => {

    return (
        <div className={ styles.block_wrap }>
            <Suspense
                fallback={ <Fallback/> }
            >
                <Image src={ "" }/>
            </Suspense>
            <p className={ styles.title }>
                
            </p>
            <p className={ styles.desc }>
                
            </p>
            <nav className={ styles.button_wrap }>
                <Button
                    disabled 
                    style={ {
                        padding: ".5rem 3rem",
                        border: "2px solid var(--bg)"
                    } }
                >
                    add to cart
                </Button>
                <Button 
                    disabled
                    style={ {
                        padding: ".5rem 3rem",
                        border: "2px solid var(--bg)"
                    } }
                >
                    buy now
                </Button>
            </nav>
        </div>
    )
}

export default Block