import { FC } from "react";
import Icon from "../../custom/icons/Icon";
import { default as Mode } from '../../../public/icons/mode.svg'
import { styles } from "../build/NavbarStyles";

const SwitchMode: FC = () => {

    return (
        <div className={ styles.icon }>
            <Icon iconPath={ Mode }/>            
        </div>
    )
}

export default SwitchMode