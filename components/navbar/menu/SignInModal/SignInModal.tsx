import { FC, MouseEvent, useEffect, useState } from "react";
import { useModalContext } from "@contexts/ModalContext";
import Button from "../../../custom/Button";
import { styles } from "../../build/NavbarStyles";
import Email from "./Forms/Email";
import Password from "./Forms/Password";
import Close from "./layout/Close";
import { useUserLogin } from "@hooks/auth/useLoginUser";
import Error from "./layout/Error";

const SignInModal: FC = () => {

    const [ { open, signUp }, setOpen ] = useModalContext()

    const [ handleLoginUser, { data, isLoading, error } ] = useUserLogin<HTMLButtonElement>()

    const handleSignUp: ( e: MouseEvent<HTMLButtonElement> ) => void 
    = e => {
        e.preventDefault()
        setOpen( {
            open, 
            signUp: !signUp
        } )
    }

    useEffect( () => {
        console.log( data || error?.message )
    }, [ data, error ] )

    return (
        <form className={ styles.modal_wrap }>
            <Close/>
            <Error error={ error?.message }/>
            <Email/>
            <Password/>
            <div className={ styles.modal_buttons }>
                <button 
                    className={ styles.modal_button_redirect }
                    onClick={ handleSignUp }
                >
                    don't have an account?
                </button>
                <Button
                    style={ {
                        width: "calc( 100% - 1.5rem )"
                    } }
                    onClick={ handleLoginUser }
                >
                        sign in
                </Button>
            </div>
        </form>
    )
}

export default SignInModal