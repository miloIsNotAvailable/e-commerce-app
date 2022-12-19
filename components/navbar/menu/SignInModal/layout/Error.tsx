import { FC } from "react";
import { styles } from "../../../build/NavbarStyles";

interface ErrorProps {
    error: string | undefined | null
}

const Error: FC<ErrorProps> = ( { error } ) => {

    return (
      <div className={styles.modal_button_error}>
        { error && "something went wrong, try again" }
      </div>
    );
}

export default Error