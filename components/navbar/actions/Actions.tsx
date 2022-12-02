import { FC } from "react";
import { styles } from "../build/NavbarStyles";
import Cart from "./Cart";
import Categories from "./Categories";

const Actions: FC = () => {

    return (
        <div className={ styles.actions_wrap }>
            <Categories/>
            <Cart/>
        </div>
    )
}

export default Actions