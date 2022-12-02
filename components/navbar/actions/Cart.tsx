import { FC } from "react";
import { styles } from "../build/NavbarStyles";

const Cart: FC = () => {

    return (
        <div className={ styles.action }>
            cart
            <sup>0</sup>
        </div>
    )
}

export default Cart