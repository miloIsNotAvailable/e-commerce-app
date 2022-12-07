import { FC, MouseEvent, useState } from "react";
import { useModalContext } from "../../../../contexts/ModalContext";
import Button from "../../../custom/Button";
import { styles } from "../../build/NavbarStyles";
import Form from "./Form";

const SignInModal: FC = () => {

    const [ open, setOpen ] = useModalContext()
    const [ signUp, setSignUp ] = useState<boolean>( false )

    const handleCloseModal: () => void = () => {
        setOpen( !open )
    }

    const handleSignUp: ( e: MouseEvent<HTMLButtonElement> ) => void 
    = e => {
        e.preventDefault()
        setSignUp( !signUp )
    }

    return (
        <form className={ styles.modal_wrap }>
            <div 
                className={ styles.modal_close }
                onClick={ handleCloseModal }
            >
                +
            </div>
            <Form 
                placeholder={ "email" } 
                type={ "email" }
            />
            <Form 
                placeholder={ "password" } 
                type={ "password" }
            />
            {
                signUp && 
                <Form 
                    placeholder={ "username" } 
                    type={ "username" }
                />
            }
            <div className={ styles.modal_buttons }>
                <Button>sign in</Button>
                <Button
                    onClick={ handleSignUp }
                >
                    {signUp ? "back" : "sign up"}
                </Button>
            </div>
        </form>
    )
}

export default SignInModal