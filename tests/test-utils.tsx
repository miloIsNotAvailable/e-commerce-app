import React, { FC } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { preloadStore } from '../redux/store'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

interface WrapperProps {
    children: JSX.Element | JSX.Element[] | string
}

export function renderWithProviders(
  ui: any,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = preloadStore(preloadedState),
    ...renderOptions
  } = {}
) {

  setupListeners(store.dispatch);

  const Wrapper: FC<WrapperProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}


