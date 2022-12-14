import { CreateItem } from "@graphql-types";
import { FC, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import Fallback from "../LazyLoad/Fallback";
import { styles } from "./BlockStyles";
const Image = lazy( () => import( "./Image" ) )

interface BlockProps {
    title?: string
    desc?: string
    img?: string
}

const Block: FC<Partial<CreateItem & { disabled: boolean }>> = ( { 
    desc, 
    img, 
    title,
    id, 
    category,
    disabled=false 
} ) => {

    return (
        <div className={ styles.block_wrap }>
            <Suspense
                fallback={ 
                    <Fallback 
                        display={ "flex" }
                        alignSelf={ "flex-end" }
                        width={ "100%" }
                        height={ "calc( 100% - 1rem )" }
                        margin={ "0" }
                        borderTop={ "var(--border)" }
                    />
                }
            >
                <Image src={ img || "" }/>
            </Suspense>
            <p className={ styles.title }>
                { title }
            </p>
            <p className={ styles.desc }>
                { desc }
            </p>
            <nav className={ styles.button_wrap }>
                <Button
                    disabled={ disabled }
                    style={ {
                        padding: ".5rem 3rem",
                        border: "2px solid var(--bg)"
                    } }
                >
                    <Link to={ "cart" }>
                        add to cart
                    </Link>
                </Button>
                <Button 
                    disabled={ disabled }
                    style={ {
                        padding: ".5rem 3rem",
                        border: "2px solid var(--bg)"
                    } }
                >
                    <Link to={ `/${ category?.toLowerCase() }/${ id }` }>
                        buy now
                    </Link>                
                </Button>
            </nav>
        </div>
    )
}

export default Block