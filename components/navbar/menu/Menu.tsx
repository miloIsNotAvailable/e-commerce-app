import { FC } from "react";
import { styles } from "../build/NavbarStyles";
import MenuItem from "./layout/menuItem";

const Menu: FC = () => {

    return (
        <div className={ styles.icon }>
            <div className={ styles.mode_icon } tabIndex={ 0 }>
                <svg width="100%" height="100%" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="menu">
                    <rect id="Rectangle 2" width="28" height="3.16667" fill="white"/>
                    <rect id="Rectangle 3" y="7.91675" width="28" height="3.16667" fill="white"/>
                    <rect id="Rectangle 4" y="15.8333" width="28" height="3.16667" fill="white"/>
                </g>
                </svg>
                <ul className={ styles.mode_icon_modal }>
                    <MenuItem link={ "my account" }/>
                    <MenuItem link={ "sell item" }/>
                    <MenuItem link={ "sign out" }/>
                </ul>
            </div>
        </div>
    )
}

export default Menu