import { gql } from "graphql-request";
import { FC, MouseEvent, useEffect, useState } from "react";
import { useModalContext } from "@contexts/ModalContext";
import { useRedux } from '@hooks/useRedux'
import { userDataState } from "../../../../interfaces/reduxInterfaces";
import { useGetHelloQuery, useGetUserQuery, useLazyGetUserQuery } from "../../../../redux/api/fetchApi";
import Button from "../../../custom/Button";
import { styles } from "../../build/NavbarStyles";
import Email from "./Forms/Email";
import Password from "./Forms/Password";
import Close from "./layout/Close";
import { Book } from '@graphql-types'

const BOOK_QUERY = gql`query Books {
    books {
      author
      title
    }
  }`
  
  const USER_QUERY = gql`query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      password
      username
    }
  }`

const SignInModal: FC = () => {

    const [ { open, signUp }, setOpen ] = useModalContext()
    const [ { userData: { 
        email, 
        username, 
        password,
        error: loginDataError
    } } ] = useRedux<userDataState>()

    const [loginUser, { data, isLoading, error }] = useLazyGetUserQuery()

    const handleSignUp: ( e: MouseEvent<HTMLButtonElement> ) => void 
    = e => {
        e.preventDefault()
        setOpen( {
            open, 
            signUp: !signUp
        } )
    }

    const handleLoginUser: ( e: MouseEvent<HTMLButtonElement> ) => void 
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
                username: username!
            }
        } )
    }

    useEffect( () => {
        console.log( data || error?.message )
    }, [ data, error ] )

    return (
        <form className={ styles.modal_wrap }>
            <Close/>
            <Email/>
            <Password/>
            <div className={ styles.modal_buttons }>
                <button 
                    className={ styles.modal_button_redirect }
                    onClick={ handleSignUp }
                >
                    don't have an account?
                </button>
                <Button
                    style={ {
                        width: "calc( 100% - 1.5rem )"
                    } }
                    onClick={ handleLoginUser }
                >
                        sign in
                </Button>
            </div>
        </form>
    )
}

export default SignInModal