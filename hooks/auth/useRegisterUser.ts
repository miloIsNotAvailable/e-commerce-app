import { QueryRegisterArgs } from "@graphql-types"
import { gql } from "graphql-request"
import { MouseEvent } from "react"
import { userDataState } from "../../interfaces/reduxInterfaces"
import { useCreateUserMutation } from "../../redux/api/fetchApi"
import { useRedux } from "../useRedux"

const USER_QUERY = gql`
query Register($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      email
      id
      password
      username
    }
  }`

type useUserLoginType = <T = any>() => [
    (e: MouseEvent<T, globalThis.MouseEvent>) => void,
    {
    data: QueryRegisterArgs | undefined;
    isLoading: boolean;
    error: any;
    }
]
/**
 * @type T Provides properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating elements 
 * @description handles register logic
 * 
 * @returns 
 * **register** - a function that handles login logic 
 * 
 * **data** - data returned from query
 * 
 * **isLoading** - query status
 * 
 * **error** - errors returned from query
 * 
 * @example ```tsx
 * const [ handleLoginUser, { data, isLoading, error } ] = useUserRegister<HTMLButtonElement>()
 * ...
 * <button onClick={ handleLoginUser }></button>
 * ```
 */
export const useUserRegister: useUserLoginType = <T=any>() => {

    const [ { userData: { 
        email, 
        password,
        username,
        error: loginDataError
    } } ] = useRedux<userDataState>()

    const [ registerUser, { data, isLoading, error } ] = useCreateUserMutation()

    const handleRegister: ( e: MouseEvent<T> ) => void 
    = e => {
        e.preventDefault()
        if( loginDataError?.email || loginDataError?.password || loginDataError?.username ) return

        registerUser( {
            body: USER_QUERY,
            variables: { 
                email: email!, 
                password: password!, 
                username: username! 
            }
        } )
    }

    return [ handleRegister, { data, isLoading, error } ]
}