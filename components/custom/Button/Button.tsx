import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { styles } from "./ButtonStyles";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FC<ButtonProps> = ( args ) => {

    return (
        <button 
            className={ styles.button_wrap }
            { ...args }
        >
            { args.children }
        </button>
    )
}

export default Button