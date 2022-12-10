import { FC, MouseEvent, useState } from "react";
import { useModalContext } from "../../../../contexts/ModalContext";
import Button from "../../../custom/Button";
import { styles } from "../../build/NavbarStyles";
import Email from "./Forms/Email";
import Form from "./Forms/Form";
import Password from "./Forms/Password";
import Username from "./Forms/Username";

const SignUpModal: FC = () => {

    const [ { open, signUp }, setOpen ] = useModalContext()
    // const [ signUp, setSignUp ] = useState<boolean>( false )

    const handleCloseModal: () => void = () => {
        setOpen( {
            open: !open,
            signUp
        } )
    }

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
            <div 
                className={ styles.modal_close }
                onClick={ handleCloseModal }
            >
                +
            </div>
            <Email/>
            <Password/>
            <Username/>
            <div className={ styles.modal_buttons }>
                <Button>sign in</Button>
                <Button
                    onClick={ handleSignUp }
                >
                    back
                </Button>
            </div>
        </form>
    )
}

export default SignUpModal