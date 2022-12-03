import { FC, lazy } from "react";
import Fallback from "../../custom/LazyLoad/Fallback";
import LazyLoad from "../../custom/LazyLoad/Load/LazyLoad";
import Actions from "../actions/Actions";
// import Menu from "../menu/Menu";
// import SignIn from "../menu/SignIn";
// import SwitchMode from "../switch-mode/switchMode";
const SwitchMode = lazy( () => import( "../switch-mode/switchMode" ))
const Menu = lazy( () => import( "../menu/Menu" ))
const SignIn = lazy( () => import( "../menu/SignIn" ))
import { styles } from "./NavbarStyles";

const Navbar: FC = () => {

    return (
        <nav className={ styles.navbar_wrap }>
            <Actions/>
            <LazyLoad props={ {
                width: "calc( 3rem + var(--icon-size) )",
                height: '3rem'
            } }>
                <SwitchMode/>
            </LazyLoad>
            <LazyLoad props={ {
                width: "calc( 7ch + 10rem )",
                height: "3rem"
            } }>
                <SignIn/>
            </LazyLoad>
            <LazyLoad props={ {
                width: "calc( 3rem + var(--icon-size) )",
                height: '3rem'
            } }>
                <Menu/>
            </LazyLoad>
        </nav>
    )
}

export default Navbar