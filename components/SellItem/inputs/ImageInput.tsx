import { FC } from "react";
import { styles } from "../build/SellItemStyles";

const ImageInput: FC = () => {

    return (
        <div className={ styles.sell_item_input }>
            <input 
                type={ "file" }
            />
        </div>
    )
}

export default ImageInput