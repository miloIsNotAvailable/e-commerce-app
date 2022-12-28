import { FC } from "react";
import { styles } from "../build/ItemStyles";

const RateItem: FC = () => {

    const stars = new Array( 5 ).fill( "☆" )

    return (
        <div className={ styles.rate_product_wrap }>
            <p>rate this product</p>
            <div className={ styles.rate_product_stars }>
                { stars.map( star => (
                    <div>{ star }</div>
                ) ) }
            </div>
        </div>
    )
}

export default RateItem