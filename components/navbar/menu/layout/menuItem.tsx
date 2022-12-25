import { FC } from "react";
import { Link } from "react-router-dom";
import { styles } from "../../build/NavbarStyles";

interface MenuItemProps {
    link: string
}

const MenuItem: FC<MenuItemProps> = ( { link } ) => {

    return (
        <li>
            <Link 
                to={ `/${ link.replace( " ", "-" ) }` } 
                className={ styles.mode_icon_modal_link_wrap }
            >
                <p>{ "←" }</p>
                <p>{ link }</p>
            </Link>
        </li>
    )
}

export default MenuItem