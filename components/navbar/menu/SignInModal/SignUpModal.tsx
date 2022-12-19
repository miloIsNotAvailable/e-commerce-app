import { useUserRegister } from "@hooks/auth/useRegisterUser";
import { FC, MouseEvent, useState } from "react";
import { useModalContext } from "../../../../contexts/ModalContext";
import Button from "../../../custom/Button";
import { styles } from "../../build/NavbarStyles";
import Email from "./Forms/Email";
import Password from "./Forms/Password";
import Username from "./Forms/Username";
import Close from "./layout/Close";
import Error from "./layout/Error";

const SignUpModal: FC = () => {

    const [ { open, signUp }, setOpen ] = useModalContext()
    const [ handleRegisterUser, { error } ] = useUserRegister<HTMLButtonElement>()

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
                <Error error={ error?.extentions?.code }/>
                <button 
                    className={ styles.modal_button_redirect }
                    onClick={ handleSignUp }
                >
                    already have an account? Sign in
                </button>
                <Button
                    onClick={ handleRegisterUser }
                    style={ {
                        width: "calc( 100% - 1.5rem )"
                    } }
                >
                    sign up
                </Button>
            </div>
        </form>
    )
}

export default SignUpModal