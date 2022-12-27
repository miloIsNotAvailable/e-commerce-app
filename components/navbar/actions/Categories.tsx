import { FC } from "react";
import { Link } from "react-router-dom";
import { items } from "../../../constants/items";
import { styles } from "../build/NavbarStyles";

const Categories: FC = () => {

    return (
        <div className={ styles.categories } tabIndex={ 0 }>
            categories
            <ul className={ styles.categories_menu }>
                { items.map( items => (
                    <li key={ items }>
                        <Link to={ "/" + items.toLowerCase() }>{ items }</Link>
                    </li>
                ) ) }
            </ul>
        </div>
    )
}

export default Categories