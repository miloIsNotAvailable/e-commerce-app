import { FC } from "react";
import { useModalContext } from "../../../../contexts/ModalContext";
import { styles } from "../../build/NavbarStyles";
import Form from "./Form";

const SignInModal: FC = () => {

    const [ open, setOpen ] = useModalContext()

    const handleCloseModal: () => void = () => {
        setOpen( !open )
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
        </form>
    )
}

export default SignInModal