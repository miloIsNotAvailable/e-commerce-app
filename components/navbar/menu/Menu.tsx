import { FC } from "react";
import Icon from "../../custom/icons/Icon";
import { default as MenuIcon } from '../../../public/icons/menu.svg'
import { styles } from "../build/NavbarStyles";

const Menu: FC = () => {

    return (
        <div className={ styles.icon }>
            <Icon iconPath={ MenuIcon }/>
        </div>
    )
}

export default Menu