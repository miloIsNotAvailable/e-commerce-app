import { FC } from "react";
import { styles } from "./BlockStyles";

interface ImageProps {
    src: string
}

const Image: FC<ImageProps> = ( { src } ) => {

    return <img 
        className={ styles.img }
        src={ src }
    />
}

export default Image