import { ChangeEvent, createRef, FC, useRef } from "react";
import { useRedux } from "../../../../../hooks/useRedux";
import { userDataState } from "../../../../../interfaces/reduxInterfaces";
import { getUserUsername } from "../../../../../redux/auth/authSlice";
import Form from "./Form";

const Username: FC = () => {

    const [ , dispatch ] = useRedux<userDataState>()

    const handleOnChange: ( e: ChangeEvent<HTMLInputElement> ) => void 
    = e => {
        
        dispatch( getUserUsername( {
            username: e.currentTarget.value
        } ) )
    }

    return (
        <Form
            // ref={ formRef }
            placeholder={ "username" } 
            type={ "username" }
            onChange={ handleOnChange }
        />
    )
}

export default Username