import { FC, MouseEvent, useState } from "react";
import { useModalContext } from "../../../../contexts/ModalContext";
import Button from "../../../custom/Button";
import { styles } from "../../build/NavbarStyles";
import Email from "./Forms/Email";
import Form from "./Forms/Form";
import Password from "./Forms/Password";
import Username from "./Forms/Username";
import Close from "./layout/Close";

const SignUpModal: FC = () => {

    const [ { open, signUp }, setOpen ] = useModalContext()

    const handleSignUp: ( e: MouseEvent<HTMLButtonElement> ) => void 
    = e => {
        e.preventDefault()
        setOpen( {
            open, 
            signUp: !signUp
        } )
    }

    return (
        <form className={ styles.modal_wrap }>
            <Close/>
            <Email/>
            <Password/>
            <Username/>
            <div className={ styles.modal_buttons }>
                <button 
                    className={ styles.modal_button_redirect }
                    onClick={ handleSignUp }
                >
                    go back
                </button>
                <Button
                    style={ {
                        width: "calc( 100% - 1.5rem )"
                    } }
                >
                    sign in
                </Button>
            </div>
        </form>
    )
}

export default SignUpModal