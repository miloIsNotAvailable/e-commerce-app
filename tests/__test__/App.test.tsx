import { act, render, screen } from '@testing-library/react'
import Home from '../../pages/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

/**
 * @jest-environment jsdom
 */

test('Renders main page correctly', async() => {
    if( typeof window === undefined ) return
    await act( async() => {
        render( 
            <Provider store={ store }>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter> 
            </Provider>
        )
    } )
});