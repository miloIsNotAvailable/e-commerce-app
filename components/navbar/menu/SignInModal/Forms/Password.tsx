import { ChangeEvent, FC } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { userDataState } from "../../../../../interfaces/reduxInterfaces";
import { getUserPassword } from "../../../../../redux/auth/authSlice";
import { styles } from "../../../build/NavbarStyles";
import Form from "./Form";

const Password: FC = () => {

    const [ { userData: { error } }, dispatch ] = useRedux<userDataState>()

    const handleOnChange: ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        
        dispatch( getUserPassword( {
            password: e.currentTarget.value
        } ) )
    }

    return (
        <div className={ styles.wrap_form }>
            <Form
                // ref={ formRef }
                placeholder={ "password" } 
                type={ "password" }
                onChange={ handleOnChange }
            />
            {
                error?.password && 
                <div className={ styles.wrap_form_error }>
                    { error.password }
                </div>
            }
        </div>
    )
}

export default Password