import { GetItemQuery } from "@graphql-types";
import { createContext, useContext } from "react";

type contextType = GetItemQuery & { 
    isLoading: boolean
    error?: any 
}

const CreateItemContext = createContext<contextType>( { isLoading: false } )

export const ItemContextProvider = CreateItemContext.Provider

export const useItemContext: () => contextType = () => {

    const context = useContext( CreateItemContext )
    return context 
}