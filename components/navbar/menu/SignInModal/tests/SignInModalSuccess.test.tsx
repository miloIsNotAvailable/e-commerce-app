import '@testing-library/jest-dom/extend-expect'
import { act, configure, fireEvent, queryByAttribute, render, screen, waitFor } from '@testing-library/react'
import Home from '../../../../../pages/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../../redux/store';
import { fetchApi } from '../../../../../redux/api/fetchApi';
// import { server } from '../mocks/api/server';
import { graphql, rest } from 'msw'
import { FC } from 'react';
import { renderWithProviders } from '../../../../../tests/test-utils';
import { setupServer } from 'msw/node';
import { GraphQLError } from 'graphql-request/dist/types'
import SignInModal from '../SignInModal';

configure( {
    testIdAttribute: "id"
} )

// when receiving a get request to the `/api/graphiql` endpoint
export const handlers = [
    graphql.query("Login", (req, res, ctx) => {
        return res(ctx.data( { email: "hello@gmail.com", password: "password", username: "hello" } ))
    })
]

const server = setupServer( ...handlers )

// Establish API mocking before all tests.
beforeAll(() => {
    server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    server.resetHandlers();
    // This is the solution to clear RTK Query cache after each test
    store.dispatch(fetchApi.util.resetApiState());
});

test('pass on valid email and password', async() => {
    if( typeof window === undefined ) return
    
    // await act( async() => {
    //     renderWithProviders(
    //         <Provider store={ store }>
    //             <BrowserRouter>
    //                 <SignInModal/>
    //             </BrowserRouter> 
    //         </Provider>
    //     ) 
    // } )

    const { asFragment, getByTestId } = renderWithProviders(
        <Provider store={ store }>
            <BrowserRouter>
                <SignInModal/>
            </BrowserRouter> 
        </Provider>
    ) 

    await act( async() => {
        fireEvent.change( await screen.findByTestId( "email" ), 
            ({ 
                currentTarget: { value: "hello@gmail.com" } 
            }) as any ) 
        } 
    )

    await act( async() => {
        fireEvent.change( await screen.findByTestId( "password" ), 
            ({ 
                currentTarget: { value: "password" } 
            }) as any )
        }
    )

    await act( async() => (await screen.findByTestId( "sign-in-button" )).click() )

    expect(screen.queryByText(
        'something went wrong, try again'
    )).not.toBeInTheDocument()
});