import { FC } from "react";
import { styles } from "../build/SellItemStyles";

const Submit: FC = () => {

    return (
        <div className={ styles.submit_wrap }>
            <button className={ styles.submit_button }>
                submit
            </button>
            <button className={ styles.cancel_button }>
                cancel
            </button>
        </div>
    )
}

export default Submit