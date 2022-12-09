import { createContext, useContext } from "react";
import { ModalContextDataType } from "../interfaces/contexts/ModalContextTypes";

type ModalContextProps = { 
    data: ModalContextDataType,
    setOpen: React.Dispatch<React.SetStateAction<ModalContextDataType>>
}

const CreateModalContext = createContext<ModalContextProps>( { 
    data: {
        open: false,
        signUp: false
    },
    setOpen: () => {} 
} )

export const ModalContext = CreateModalContext.Provider

export const useModalContext: () => [
    ModalContextProps ["data"], 
    ModalContextProps['setOpen'] 
] = () => {

    const { data, setOpen } = useContext( CreateModalContext )
    return [ data, setOpen ]
}