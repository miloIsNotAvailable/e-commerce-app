import { FC } from "react";
import { styles } from "../build/SellItemStyles";

const TitleInput: FC = () => {

    return <input 
        className={ styles.title_input }
        placeholder={ "item title" }
    />
}

export default TitleInput