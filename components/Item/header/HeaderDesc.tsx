import { FC } from "react";
import { styles } from "../build/ItemStyles";

const HeaderDesc: FC = () => {

    return (
        <div className={ styles.item_header_desc_wrap }>
            <p className={ styles.item_header_desc_title }>
                lorem ipsum
            </p>
            <p className={ styles.item_header_desc_desc }>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
            </p>
        </div>
    )
}

export default HeaderDesc