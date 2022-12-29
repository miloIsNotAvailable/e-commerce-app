import { useRedux } from "@hooks/useRedux";
import { FC } from "react";
import { reviewInputState } from "../../../interfaces/reduxInterfaces";
import { styles } from "../build/ItemStyles";

const ReviewsInput: FC = () => {

    const [ { reviewInput: { open } } ] = useRedux<reviewInputState>()

    if( !open ) return (
        <></>
    )

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