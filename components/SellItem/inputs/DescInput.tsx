import { FC } from "react";
import { styles } from "../build/SellItemStyles";

const DescInput: FC = () => {

    return <textarea 
        className={ styles.desc_input }
        placeholder={ "item description" }
    />
}

export default DescInput