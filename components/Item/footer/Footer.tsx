import { useItemContext } from "@contexts/ItemContext";
import { useGoBack } from "@hooks/useGoBack";
import { useRedux } from "@hooks/useRedux";
import { FC, useEffect } from "react";
import { cartItemsState, reviewInputState } from "../../../interfaces/reduxInterfaces";
import { addToCart } from "../../../redux/cart/cartSlice";
import { openInput } from "../../../redux/inputs/openReviewInput";
import { styles } from "../build/ItemStyles";

const Footer: FC = () => {

    const goBack = useGoBack()

    const [ { reviewInput: { open } }, dispatch ] = useRedux<reviewInputState>()
    const [ { cartItems }, dispatchToCart ] = useRedux<cartItemsState>()

    const { getItem, isLoading } = useItemContext()

    const handleAddToCart: () => void = () => {
        
        if( isLoading || !getItem ) return
        console.log( "ye" )

        dispatchToCart( addToCart( {
            items: [ {
                desc: getItem!.desc!,
                id: getItem!.id!,
                img: getItem!.img,
                title: getItem!.title
            } ]
        } ) )
    }

    const showInput: () => void = () => {
        dispatch( openInput( {  open: !open } ) )
    }

    return (
        <div className={ styles.footer_wrap }>
            <button className={ styles.footer_buy }>
                buy now
            </button>
            <button 
                className={ styles.footer_button }
                onClick={ handleAddToCart }
            >
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