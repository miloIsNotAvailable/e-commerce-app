import { FC } from "react";
import { styles } from "../build/ItemStyles";
import RateItem from "./RateProduct";

const Rating: FC = () => {

    return (
        <div className={ styles.rating_wrap }>
            <div className={ styles.rating_stars }>
                <p>average rating</p>
                <p className={ styles.stars }>
                    5.5
                    <p>★</p>
                </p>
            </div>
            <RateItem/>
        </div>
    )
}

export default Rating