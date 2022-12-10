import { ChangeEvent, createRef, FC, useRef } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { userDataState } from "../../../../../interfaces/reduxInterfaces";
import { getUserEmail } from "../../../../../redux/auth/authSlice";
import Form from "./Form";

const Email: FC = () => {

    const [ , dispatch ] = useRedux<userDataState>()

    const handleOnChange: ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        
        dispatch( getUserEmail( {
            email: e.currentTarget.value
        } ) )
    }

    return (
        <Form
            // ref={ formRef }
            placeholder={ "email" } 
            type={ "email" }
            onChange={ handleOnChange }
        />
    )
}

export default Email