import { ChangeEvent, FC } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { userDataState } from "../../../../../interfaces/reduxInterfaces";
import { getUserUsername } from "../../../../../redux/auth/authSlice";
import { styles } from "../../../build/NavbarStyles";
import Form from "./Form";

const Username: FC = () => {

    const [ { userData: { error } }, dispatch ] = useRedux<userDataState>()

    const handleOnChange: ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        
        dispatch( getUserUsername( {
            username: e.currentTarget.value
        } ) )
    }

    return (
        <div className={ styles.wrap_form }>
            <Form
                // ref={ formRef }
                placeholder={ "username" } 
                type={ "username" }
                onChange={ handleOnChange }
            />
            {
                error?.username && 
                <div className={ styles.wrap_form_error }>
                    { error.username }
                </div>
            }
        </div>
    )
}

export default Username