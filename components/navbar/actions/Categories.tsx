import { FC } from "react";
import { items } from "../../../constants/items";
import { styles } from "../build/NavbarStyles";

const Categories: FC = () => {

    return (
        <div className={ styles.categories } tabIndex={ 0 }>
            categories
            <ul className={ styles.categories_menu }>
                { items.map( items => (
                    <li key={ items }>
                        { items }
                    </li>
                ) ) }
            </ul>
        </div>
    )
}

export default Categories