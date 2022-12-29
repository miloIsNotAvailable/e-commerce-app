import { useGoBack } from "@hooks/useGoBack";
import { useRedux } from "@hooks/useRedux";
import { FC } from "react";
import { reviewInputState } from "../../../interfaces/reduxInterfaces";
import { openInput } from "../../../redux/inputs/openReviewInput";
import { styles } from "../build/ItemStyles";

const Footer: FC = () => {

    const goBack = useGoBack()
    const [ { reviewInput: { open } }, dispatch ] = useRedux<reviewInputState>()

    const showInput: () => void = () => {
        dispatch( openInput( {  open: !open } ) )
    }

    return (
        <div className={ styles.footer_wrap }>
            <button className={ styles.footer_buy }>
                buy now
            </button>
            <button className={ styles.footer_button }>
                add to cart
            </button>
            <button 
                onClick={ showInput }
                className={ styles.footer_button }
            >
                { open ? "hide" : "write a review" }
            </button>
            <button
                className={ styles.footer_button } 
                onClick={ goBack }
            >
                go back
            </button>
        </div>
    )
}

export default Footer