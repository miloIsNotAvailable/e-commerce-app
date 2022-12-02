import { FC } from "react";
import Actions from "../actions/Actions";
import Menu from "../menu/Menu";
import SignIn from "../menu/signin";
import SwitchMode from "../switch-mode/switchMode";
import { styles } from "./NavbarStyles";

const Navbar: FC = () => {

    return (
        <div className={ styles.navbar_wrap }>
            <Actions/>
            <SwitchMode/>
            <SignIn/>
            <Menu/>
        </div>
    )
}

export default Navbar