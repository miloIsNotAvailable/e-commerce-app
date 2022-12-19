import { LoginQuery } from "@graphql-types"
import { gql } from "graphql-request"
import { MouseEvent } from "react"
import { userDataState } from "../../interfaces/reduxInterfaces"
import { useLazyGetUserQuery } from "../../redux/api/fetchApi"
import { useRedux } from "../useRedux"

const USER_QUERY = gql`query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      password
      username
    }
  }`

type useUserLoginType = <T = any>() => [
    (e: MouseEvent<T, globalThis.MouseEvent>) => void,
    {
    data: LoginQuery | undefined;
    isLoading: boolean;
    error: any;
    }
]
/**
 * @type T Provides properties and methods (beyond the regular HTMLElement interface it also has available to it by inheritance) for manipulating elements 
 * @description handles login logic
 * 
 * @returns 
 * **loginFunction** - a function that handles login logic 
 * 
 * **data** - data returned from query
 * 
 * **isLoading** - query status
 * 
 * **error** - errors returned from query
 * 
 * @example ```tsx
 * const [ handleLoginUser, { data, isLoading, error } ] = useUserLogin<HTMLButtonElement>()
 * ...
 * <button onClick={ handleLoginUser }></button>
 * ```
 */
export const useUserLogin: useUserLoginType = <T=any>() => {

    const [ { userData: { 
        email, 
        password,
        error: loginDataError
    } } ] = useRedux<userDataState>()

    const [loginUser, { data, isLoading, error }] = useLazyGetUserQuery()

    const handleLoginUser: ( e: MouseEvent<T> ) => void 
    = e => {
        e.preventDefault()
        if( loginDataError?.email || loginDataError?.password || loginDataError?.username ) return

        loginUser( {
            body: USER_QUERY,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'x-forwarded-proto': "https"
            },
            variables: {
                email: email!,
                password: password!,
            }
        } )
    }

    return [ handleLoginUser, { data, isLoading, error } ]
}