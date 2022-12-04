import { FC, useState } from "react";
import { ModalContext } from "../../../contexts/ModalContext";
import { styles } from "../build/NavbarStyles";
import SignInModal from "./SignInModal/SignInModal";

const SignIn: FC = () => {

    const [ open, setOpen ] = useState<boolean>( false )

    const handleOpenModal: () => void = () => {
        setOpen( !open )
    }

    return (
        <ModalContext value={ { open, setOpen } }>
            <div 
                className={ styles.signin }
                onClick={ handleOpenModal }
            >
                sign in
            </div>
            { open && <SignInModal/> }
        </ModalContext>
    )
}

export default SignIn