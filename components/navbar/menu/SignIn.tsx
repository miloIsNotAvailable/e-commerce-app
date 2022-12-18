import { FC, useState } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { ModalContextDataType } from "../../../interfaces/contexts/ModalContextTypes";
import { styles } from "../build/NavbarStyles";
import SignInModal from "./SignInModal/SignInModal";
import SignUpModal from "./SignInModal/SignUpModal";

const SignIn: FC = () => {

    const [ { open, signUp }, setOpen ] = useState<ModalContextDataType>( {
        open: false,
        signUp: false
    } )

    const handleOpenModal: () => void = () => {
        setOpen( {
            open: !open,
            signUp
        } )
    }

    return (
        <ModalContext value={ { 
            data: { open, signUp }, 
            setOpen 
        } }>
            <div 
                id={ "login-button" }
                className={ styles.signin }
                onClick={ handleOpenModal }
            >
                sign in
            </div>
            { open && (signUp ? <SignUpModal/> : <SignInModal/>) }
        </ModalContext>
    )
}

export default SignIn