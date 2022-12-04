import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { styles } from "../../build/NavbarStyles";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Form: FC<InputProps> = ( args ) => {

    return (
    <div className={ styles.input_wrap }>
        <input className={ styles.input } { ...args }/>
        <label className={ styles.modal_label }>
            { args.placeholder }
        </label>
    </div>
    )
}

export default Form