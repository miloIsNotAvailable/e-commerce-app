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

/**
 * @jest-environment jsdom
 */

// when receiving a get request to the `/api/graphiql` endpoint
export const handlers = [
    graphql.query("Login", (req, res, ctx) => {
        return res( 
            ctx.data( { email: "j@gmail.com", password: "password" } ), 
            ctx.errors( [{ message: "invalid mail or password" }] )
        )
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

// Clean up after the tests are finished.
afterAll(() => server.close());

test('throw error on invalid email or password', async() => {
    if( typeof window === undefined ) return
    
    await act( async() => {
        renderWithProviders(
            <Provider store={ store }>
                <BrowserRouter>
                    <SignInModal/>
                </BrowserRouter> 
            </Provider>
        ) 
    } )

    // expect(screen.getByText('no data')).toBeInTheDocument()
    // await act( async() => screen.getByTestId( "login-button" ).click() )
    await act( async() => fireEvent.change( await screen.findByTestId( "email" ), 
        ({ 
            currentTarget: { value: "j@gmail.com" } 
        }) as any 
    ))

    await act( async() => fireEvent.change( await screen.findByTestId( "password" ), 
        ({ 
            currentTarget: { value: "hello" } 
        }) as any 
    ))

    await act( async() => (await screen.findByTestId( "sign-in-button" )).click() )
    
    await waitFor( () => expect(screen.getByText(
        'something went wrong, try again'
        )).toBeInTheDocument() 
    )
});

