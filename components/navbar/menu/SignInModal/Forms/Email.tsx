import { ChangeEvent, createRef, FC, useRef } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { userDataState } from "../../../../../interfaces/reduxInterfaces";
import { getUserEmail } from "../../../../../redux/auth/authSlice";
import { styles } from "../../../build/NavbarStyles";
import Form from "./Form";

const Email: FC = () => {

    const [ { userData: { error } }, dispatch ] = useRedux<userDataState>()

    const handleOnChange: ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        
        dispatch( getUserEmail( {
            email: e.currentTarget.value
        } ) )
    }

    return (
        <div className={ styles.wrap_form }>
            <Form
                id={ "email" }
                // ref={ formRef }
                placeholder={ "email" } 
                type={ "email" }
                onChange={ handleOnChange }
            />
            {
                error?.email && 
                <div className={ styles.wrap_form_error }>
                    { error.email }
                </div>
            }
        </div>
    )
}

export default Email