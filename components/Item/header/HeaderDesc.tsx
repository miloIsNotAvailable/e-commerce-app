import { useItemContext } from "@contexts/ItemContext";
import { FC } from "react";
import { styles } from "../build/ItemStyles";

const HeaderDesc: FC = () => {

    const { getItem, isLoading } = useItemContext()

    return (
        <div className={ styles.item_header_desc_wrap }>
            <p className={ styles.item_header_desc_title }>
                { isLoading ? "loading" : getItem?.title }
            </p>
            <p className={ styles.item_header_desc_desc }>
            { isLoading ? "loading" : getItem?.desc }
            </p>
        </div>
    )
}

export default HeaderDesc