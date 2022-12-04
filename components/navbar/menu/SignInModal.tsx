import { FC } from "react";
import { useModalContext } from "../../../contexts/ModalContext";
import { styles } from "../build/NavbarStyles";

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
        </form>
    )
}

export default SignInModal