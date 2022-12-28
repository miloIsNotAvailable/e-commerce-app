import { FC } from "react";
import { styles } from "../build/ItemStyles";

const ReviewsInput: FC = () => {

    return (
        <form className={ styles.reviews_input_wrap }>
            <textarea 
                className={ styles.input }
                placeholder={ "leave a review" }
            />
            <button>send review</button>
        </form>
    )
}

export default ReviewsInput