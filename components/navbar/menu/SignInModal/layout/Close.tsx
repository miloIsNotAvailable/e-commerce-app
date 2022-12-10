import { ButtonHTMLAttributes, DetailedHTMLProps, FC, MouseEvent } from "react";
import { useModalContext } from "../../../../../contexts/ModalContext";
import { styles } from "../../../build/NavbarStyles";

type ButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Close: FC<ButtonType> = ( props ) => {

    const [ { open, signUp }, setOpen ] = useModalContext()

    const handleCloseModal: ( e: MouseEvent<HTMLDivElement> ) => void 
    = ( e ) => {
        
        e.preventDefault()

        setOpen( {
            open: !open,
            signUp
        } )
    }

    return (
      <div className={styles.modal_close_wrap}>
        <div 
            className={styles.modal_close} 
            onClick={ handleCloseModal }
            { ...props }
        >
          {"✖"}
        </div>
      </div>
    );
}

export default Close