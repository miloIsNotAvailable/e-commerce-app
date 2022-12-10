import { FC, MouseEvent, useEffect, useState } from "react";
import { useModalContext } from "../../../../contexts/ModalContext";
import { useRedux } from "../../../../hooks/useRedux";
import { userDataState } from "../../../../interfaces/reduxInterfaces";
import Button from "../../../custom/Button";
import { styles } from "../../build/NavbarStyles";
import Email from "./Forms/Email";
import Form from "./Forms/Form";
import Password from "./Forms/Password";

const SignInModal: FC = () => {

    const [ { open, signUp }, setOpen ] = useModalContext()
    const [ { userData } ] = useRedux<userDataState>()
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

    useEffect( () => {
        console.log( userData )
    }, [ userData ] ) 

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
            <div className={ styles.modal_buttons }>
                <Button>sign in</Button>
                <Button
                    onClick={ handleSignUp }
                >
                    signUp
                </Button>
            </div>
        </form>
    )
}

export default SignInModal