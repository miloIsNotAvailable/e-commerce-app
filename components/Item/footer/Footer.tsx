import { useGoBack } from "@hooks/useGoBack";
import { FC } from "react";
import { styles } from "../build/ItemStyles";

const Footer: FC = () => {

    const goBack = useGoBack()

    return (
        <div className={ styles.footer_wrap }>
            <button className={ styles.footer_buy }>
                buy now
            </button>
            <button
                className={ styles.footer_button } 
                onClick={ goBack }
            >
                go back
            </button>
            <button className={ styles.footer_button }>
                add to cart
            </button>
        </div>
    )
}

export default Footer