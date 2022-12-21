import { FC } from "react";
import { styles } from "../build/NavbarStyles";

const Categories: FC = () => {

    return (
        <div className={ styles.categories } tabIndex={ 0 }>
            categories
            <ul className={ styles.categories_menu }>
                <li>hey</li>
                <li>hey</li>
                <li>hey</li>
                <li>hey</li>
            </ul>
        </div>
    )
}

export default Categories