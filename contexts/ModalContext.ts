import { createContext, useContext } from "react";

type ModalContextProps = { 
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateModalContext = createContext<ModalContextProps>( { 
    open: false,
    setOpen: () => {} 
} )

export const ModalContext = CreateModalContext.Provider

export const useModalContext: () => [
    ModalContextProps ["open"], 
    ModalContextProps['setOpen'] 
] = () => {

    const { open, setOpen } = useContext( CreateModalContext )
    return [ open, setOpen ]
}