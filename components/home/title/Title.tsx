import { FC } from "react";
import { styles } from "../build/HomeStyles";

const Title: FC = () => {

    return (
        <h1 className={ styles.title }>
            <div className={ styles.l_1 }>Lorem Ipsum</div>
            <div className={ styles.l_2 }>Lorem Ipsum</div>
        </h1>
    )
}

export default Title