import { ButtonHTMLAttributes, DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { styles } from "./ButtonStyles";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type StyleProps = HTMLAttributes<HTMLButtonElement>["style"]


const Button: FC<ButtonProps> = ( args ) => {

    return (
        <button 
            style={ args.style }
            className={ styles.button_wrap }
            { ...args }
        >
            { args.children }
        </button>
    )
}

export default Button