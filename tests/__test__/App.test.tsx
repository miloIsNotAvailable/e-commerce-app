import '@testing-library/jest-dom/extend-expect'
import { act, render, screen, waitFor } from '@testing-library/react'
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

/**
 * @jest-environment jsdom
 */

// when receiving a get request to the `/api/graphql` endpoint
export const handlers = [
    graphql.query("Hey", (req, res, ctx) => {
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

test('Renders main page correctly', async() => {
    if( typeof window === undefined ) return
    await act( async() => {
        renderWithProviders(
            <Provider store={ store }>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter> 
            </Provider>
        ) 
    } )

    // expect(screen.getByText('no data')).toBeInTheDocument()
    
    await waitFor(() =>
        expect( screen.getByText('hi') ).toBeInTheDocument()
    )
});