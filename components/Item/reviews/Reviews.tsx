import { FC } from "react";
import { styles } from "../build/ItemStyles";
import ReviewsInput from "./ReviewsInput";

const Reviews: FC = () => {

    return (
        <div className={ styles.reviews_wrap }>
            <div className={ styles.reviews_header }>
                reviews
            </div>
            <div>

            </div>
            <ReviewsInput/>
        </div>
    )
}

export default Reviews