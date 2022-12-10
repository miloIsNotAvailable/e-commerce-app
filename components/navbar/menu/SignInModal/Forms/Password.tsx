import { ChangeEvent, createRef, FC, useRef } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { userDataState } from "../../../../../interfaces/reduxInterfaces";
import { getUserPassword } from "../../../../../redux/auth/authSlice";
import Form from "./Form";

const Password: FC = () => {

    const [ , dispatch ] = useRedux<userDataState>()

    const handleOnChange: ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        
        dispatch( getUserPassword( {
            password: e.currentTarget.value
        } ) )
    }

    return (
        <Form
            // ref={ formRef }
            placeholder={ "password" } 
            type={ "password" }
            onChange={ handleOnChange }
        />
    )
}

export default Password