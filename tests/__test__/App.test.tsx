import '@testing-library/jest-dom/extend-expect'
import { act, configure, fireEvent, queryByAttribute, render, screen, waitFor } from '@testing-library/react'
import Home from '../../pages/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { fetchApi } from '../../redux/api/fetchApi';
// import { server } from '../mocks/api/server';
import { graphql, rest } from 'msw'
import { FC } from 'react';
import { renderWithProviders } from '../test-utils';
import { setupServer } from 'msw/node';

configure( {
    testIdAttribute: "id"
} )

/**
 * @jest-environment jsdom
 */

// when receiving a get request to the `/api/graphiql` endpoint
export const handlers = [
    graphql.query("Login", (req, res, ctx) => {
        return res(ctx.data({ hello: "hi" }))
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

test('check if login works', async() => {
    if( typeof window === undefined ) return
    const dom = await act( async() => {
        renderWithProviders(
            <Provider store={ store }>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter> 
            </Provider>
        ) 
    } )

    // expect(screen.getByText('no data')).toBeInTheDocument()
    // screen.getByTestId( "login-button" ).click()
    // fireEvent( screen.getByTestId( "email" ), 
    //     ({ 
    //         currentTarget: { value: "hello" } 
    //     }) as any 
    // )

    // fireEvent( screen.getByTestId( "password" ), 
    //     ({ 
    //         currentTarget: { value: "hello" } 
    //     }) as any 
    // )

    // await waitFor(() =>
    //     expect( screen.getByText('hi') ).toBeInTheDocument()
    // )
});