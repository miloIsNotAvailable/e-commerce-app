import { gql } from "graphql-request";
import { FC, MouseEvent, useEffect, useState } from "react";
import { useModalContext } from "@contexts/ModalContext";
import { useRedux } from '@hooks/useRedux'
import { userDataState } from "../../../../interfaces/reduxInterfaces";
import { useGetHelloQuery, useGetUserQuery } from "../../../../redux/api/fetchApi";
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
  
  const USER_QUERY = gql`query User {
    user {
      email
      password
      username
    }
  }`


const SignInModal: FC = () => {

    const [ { open, signUp }, setOpen ] = useModalContext()
    const [ { userData } ] = useRedux<userDataState>()

    const { data, isLoading, error } = useGetUserQuery( {
        body: USER_QUERY,
        headers: {
            "authorization": "Bearer UYqwouvfq384t249gbieprbgo3ibf391"
        }
    } )

    const handleSignUp: ( e: MouseEvent<HTMLButtonElement> ) => void 
    = e => {
        e.preventDefault()
        setOpen( {
            open, 
            signUp: !signUp
        } )
    }

    useEffect( () => {
        ( async() => {
            try {
                data && console.log( data.user )
            } catch( e ) {
                console.log( error )
            }
        } )()
    }, [ data, isLoading, error ] )

    useEffect( () => {
        console.log( userData )
    }, [ userData ] ) 

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
                >
                        sign in
                </Button>
            </div>
        </form>
    )
}

export default SignInModal