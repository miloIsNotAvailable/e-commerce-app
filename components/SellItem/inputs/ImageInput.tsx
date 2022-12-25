import { useOpenImage } from "@hooks/useOpenImage";
import { FC } from "react";
import { styles } from "../build/SellItemStyles";

const ImageInput: FC = () => {

    const submitImg = useOpenImage()

    return (
        <div className={ styles.sell_item_input }>
            <input 
                type={ "file" }
                onChange={ submitImg }
                onDrop={ submitImg }
            />
        </div>
    )
}

export default ImageInput